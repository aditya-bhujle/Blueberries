import React, { useState, useEffect, useContext } from "react";
import { CardPost, CardPostSkeleton } from "../cards/CenterCards";
import { UserContext } from "../../App";
import PostModal from "../pages/post/PostModal";
import InfiniteScroll from "react-infinite-scroll-component";
import SpinLoad from "../SpinLoad";

export default function HubPost({ postRef, info, ...props }) {
	const userInfo = useContext(UserContext);

	const [loading, setLoading] = useState(true);
	const [posts, setPosts] = useState([]);

	const [showModal, setShowModal] = useState(false);
	const [modalRef, setModalRef] = useState();
	const [modalProps, setModalProps] = useState();

	const loadPostNum = 4;
	const [queryCursor, setQueryCursor] = useState();
	const [hasMorePosts, setHasMorePosts] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			setHasMorePosts(true);
			setLoading(true);
			try {
				let fetchPosts = await postRef
					.orderBy(props.sortQuery, props.sortQueryOrder)
					.limit(loadPostNum)
					.get();

				setQueryCursor(fetchPosts.docs[fetchPosts.docs.length - 1]);

				console.log("Post data fetched!");
				setPosts(fetchPosts.docs);
			} catch (error) {
				console.error(error);
			}

			setLoading(false);
		};
		console.log("Running Use Effect!");
		fetchData();
	}, [postRef.path, props.sortQuery, props.sortQueryOrder]);

	if (loading)
		return [...Array(loadPostNum)].map((e, i) => <CardPostSkeleton key={i} />);

	async function fetchMorePosts() {
		try {
			let fetchPosts = await postRef
				.orderBy(props.sortQuery, props.sortQueryOrder)
				.startAfter(queryCursor)
				.limit(loadPostNum)
				.get();

			if (fetchPosts.empty) {
				setHasMorePosts(false);
				console.log("Reached end of the query!");
				return;
			}

			setQueryCursor(fetchPosts.docs[fetchPosts.docs.length - 1]);

			console.log("Paginated posts fetched!");
			setPosts(posts.concat(fetchPosts.docs));
		} catch (error) {
			console.error(error);
		}
	}

	const cardPost = (post, dataIsFunction) => {
		const dataProps = dataIsFunction ? post.data() : post.data;
		return (
			<CardPost
				{...dataProps}
				uid={userInfo ? userInfo.id : null}
				key={post.id}
				postRef={post.ref}
				hideCategory={props.hideCategory}
				showSource={!info}
				showModal={(ref, props, liked, likes, disliked, dislikes) => {
					setModalRef(ref);
					setModalProps({
						...props,
						liked: liked,
						passLikes: likes,
						disliked: disliked,
						passDislikes: dislikes,
					});
					setShowModal(true);
				}}
			/>
		);
	};

	return (
		<>
			{props.created.reverse().map((post) => cardPost(post, false))}

			<InfiniteScroll
				dataLength={posts.length}
				next={fetchMorePosts}
				hasMore={hasMorePosts}
				loader={<SpinLoad big />}
				endMessage={<p style={{ textAlign: "center" }}>No more posts!</p>}
				style={{ overflow: "none" }}
			>
				{posts.map((post) => cardPost(post, true))}
			</InfiniteScroll>

			{!posts.length && <p style={{ textAlign: "center" }}>No posts yet...</p>}
			{showModal && (
				<PostModal
					postRef={modalRef}
					postProps={modalProps}
					close={() => {
						window.history.replaceState(null, "New Post", props.loc.pathname);
						setShowModal(false);
					}}
					info={info}
				/>
			)}
		</>
	);
}
