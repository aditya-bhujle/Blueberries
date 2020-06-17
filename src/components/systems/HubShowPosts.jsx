import React, { useState, useContext } from "react";
import { UserContext } from "../../App";
import { CardPost } from "../cards/CenterCards";
import PostModal from "../pages/post/PostModal";

export default function HubShowPosts({posts, hideCategory, info}) {
	const userInfo = useContext(UserContext);

	const [showModal, setShowModal] = useState(false);
	const [modalRef, setModalRef] = useState();
    const [modalProps, setModalProps] = useState();

    return (
		<>
			{posts.map((post) => {
				return (
					<CardPost
						{...post.data()}
						uid={userInfo ? userInfo.id : null}
						key={post.id}
						postRef={post.ref}
						hideCategory={hideCategory}
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
						window.history.replaceState(null, "New Post", props.loc.pathname);
						setShowModal(false);
					}}
					info={info}
				/>
			)}
		</>
	);
}
