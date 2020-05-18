import React, { useContext } from "react";
import firebase from "firebase/app";
import { UserContext } from "../../../../App";
import { CardSearch, CardCreate } from "../../../cards/CenterCards";
import HubPost from "../../../systems/HubPosts";

export default function ClassNotesContent({ classRef }) {
	const userInfo = useContext(UserContext);

	async function uploadNotes(e, title, description) {
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
			<CardSearch placeholder="Enter Unit Name or Number" />
			<CardCreate
				title="Upload Notes"
				placeholder="Share your notes with the class!"
				createPlaceholder="Unit Name"
				handleSubmit={uploadNotes}
			/>
			<HubPost
				postRef={classRef}
				query={classRef.where("category", "==", "Notes")}
			/>
		</div>
	);
}
