import React, { useState, useEffect, useContext } from "react";
import { CardPost, CardPostSkeleton } from "../cards/CenterCards";
import { UserContext } from "../../App";
import PostModal from "../pages/post/PostModal";

export default function HubPost({ postRef, query }) {
	const userInfo = useContext(UserContext);

	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);

	const [showModal, setShowModal] = useState(false);
	const [modalRef, setModalRef] = useState();
	const [modalProps, setModalProps] = useState();

	useEffect(() => {
		const fetchData = async () => {
			try {
				let fetchPosts;
				query
					? (fetchPosts = await query.get())
					: (fetchPosts = await postRef
							.orderBy("date_posted", "desc")
							.limit(3)
							.get());
				console.log("Post data fetched!");
				setPosts(fetchPosts.docs);
			} catch (error) {
				console.error(error);
			}

			setLoading(false);
		};

		fetchData();
	}, []);

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
						postRef={postRef.doc(post.id)}
						showModal={(ref, props) => {
							setModalRef(ref);
							setModalProps(props);
							setShowModal(true);
						}}
					/>
				);
			})}
			{showModal && (
				<PostModal
					postRef={modalRef}
					postProps={modalProps}
					close={() => setShowModal(false)}
				/>
			)}
		</>
	);
}
