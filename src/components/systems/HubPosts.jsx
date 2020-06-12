import React, { useState, useEffect, useContext } from "react";
import { CardPost, CardPostSkeleton } from "../cards/CenterCards";
import { UserContext } from "../../App";
import PostModal from "../pages/post/PostModal";
import { useLocation } from "react-router-dom";

export default function HubPost({ postRef, info, ...props }) {
	const userInfo = useContext(UserContext);
	const loc = useLocation();

	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);

	const [showModal, setShowModal] = useState(false);
	const [modalRef, setModalRef] = useState();
	const [modalProps, setModalProps] = useState();

	useEffect(() => {
		const fetchData = async () => {
			try {
				let fetchPosts = await postRef
					.orderBy(props.sortQuery, props.sortQueryOrder)
					.limit(3)
					.get();
				console.log("Post data fetched!");
				setPosts(fetchPosts.docs);
			} catch (error) {
				console.error(error);
			}

			setLoading(false);
		};

		fetchData();
	}, [props.sortQuery, props.sortQueryOrder]);

	if (loading)
		return (
			<>
				<CardPostSkeleton />
				<CardPostSkeleton />
				<CardPostSkeleton />
				<CardPostSkeleton />
			</>
		);

	return (
		<>
			{posts.map((post) => {
				return (
					<CardPost
						{...post.data()}
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
			})}
			{showModal && (
				<PostModal
					postRef={modalRef}
					postProps={modalProps}
					close={() => {
						window.history.replaceState(null, "New Post", loc.pathname);
						setShowModal(false);
					}}
					info={info}
				/>
			)}
		</>
	);
}
