import React, { useContext, useState } from "react";
import { UserContext } from "../../App";
import { CardPostSkeleton, CardPost } from "../cards/CenterCards";
import InfiniteScroll from "react-infinite-scroll-component";
import SpinLoad from "../SpinLoad";
import PostModal from "../pages/post/PostModal";

export default function HubPostsRender({ hasMorePosts, loading, posts, fetchMorePosts, info, ...props }) {
	const userInfo = useContext(UserContext);

	const [showModal, setShowModal] = useState(false);
	const [modalRef, setModalRef] = useState();
	const [modalProps, setModalProps] = useState();

	const loadPostNum = 4;

	if (loading)
		return [...Array(loadPostNum)].map((e, i) => <CardPostSkeleton key={i} />);

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
