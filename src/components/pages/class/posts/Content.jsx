import React, { useContext } from "react";
import firebase from "firebase/app";
import { UserContext } from "../../../../App";
import { CardSearch, CardCreate } from "../../../cards/CenterCards";
import HubPost from "../../../systems/HubPosts";

export default function ClassPostContent({ classRef }) {
	const userInfo = useContext(UserContext);

	async function createPost(e, title, description) {
		e.preventDefault();

		try {
			await classRef.add({
				title,
				content: description,
				likes: [],
				comments: 0,
				author: userInfo.username,
				date_posted: firebase.firestore.Timestamp.now(),
			});
			console.log(`${title} successfully created!`);
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<div className="hub_content">
			<CardSearch placeholder="Search Popular Posts" />
			<CardCreate
				title="Create Post"
				placeholder="Ask questions, share information, or start a discussion!"
				createPlaceholder="Post Title"
				handleSubmit={createPost}
			/>
			<HubPost postRef={classRef} />
		</div>
	);
}
