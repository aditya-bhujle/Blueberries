import React, { useContext, useState, useEffect } from "react";
import Header from "./Header";
import firebase from "firebase/app";
import { db } from "../../firebase/config";
import { UserContext } from "../../App";
import Skeleton from "react-loading-skeleton";

export default function ClassHeader({ classId, loading, ...props }) {
	const userInfo = useContext(UserContext);
	const [joined, setJoined] = useState(false);

	useEffect(() => {
		if (userInfo) {
			userInfo.classes.forEach((userClass) => {
				if (userClass.id === classObject.id) setJoined(true);
			});
		}
	}, [userInfo]);

	if (!userInfo)
		return (
			<Header loading short {...props}>
				<Skeleton height={37} width={95} />
				<div style={{ marginLeft: "10px", display: "inline-block" }}>
					<Skeleton height={37} width={110} />
				</div>
			</Header>
		);

	const classObject = {
		id: classId,
		name: props.name,
	};

	async function toggleJoin() {
		const firestoreCommand = joined
			? firebase.firestore.FieldValue.arrayRemove(classObject)
			: firebase.firestore.FieldValue.arrayUnion(classObject);

		setJoined(!joined);
		const userRef = db.collection("users").doc(userInfo.id);

		try {
			await userRef.update({
				classes: firestoreCommand,
			});
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<Header short={userInfo.school.short} loading={loading} {...props}>
			{joined ? (
				<button onClick={toggleJoin} className="button select">
					Joined Class
				</button>
			) : (
				<button onClick={toggleJoin} className="button">
					Join Class
				</button>
			)}
		</Header>
	);
}
