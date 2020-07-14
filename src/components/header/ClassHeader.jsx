import React, { useContext, useState, useEffect } from "react";
import Header from "./Header";
import { db } from "../../firebase/config";
import { UserContext } from "../../App";
import Skeleton from "react-loading-skeleton";
import { useToasts } from "react-toast-notifications";
import { firestore } from "firebase";

export default function ClassHeader({
	school,
	schoolClass,
	classRef,
	teacherId,
	loading,
}) {
	const userInfo = useContext(UserContext);
	const { addToast } = useToasts();
	const [joined, setJoined] = useState(false);

	useEffect(() => {
		if (userInfo) {
			userInfo.classes.forEach((userClass) => {
				if (userClass.id === schoolClass.id) setJoined(true);
			});
		}
	}, [schoolClass.id, userInfo]);

	if (loading)
		return (
			<Header loading short>
				<Skeleton height={37} width={95} />
				<div style={{ marginLeft: "10px", display: "inline-block" }}>
					<Skeleton height={37} width={110} />
				</div>
			</Header>
		);

	async function toggleJoin() {
		setJoined(!joined);

		const removeClass = userInfo.classes.filter(
			(userClass) => userClass.id === schoolClass.id
		);
		const userRef = db.collection("users").doc(userInfo.id);

		try {
			if (joined) {
				for (let i = 0; i < removeClass.length; i++)
					await userRef.update({
						classes: firestore.FieldValue.arrayRemove(removeClass[i]),
					});

				await classRef.update({ members: firestore.FieldValue.increment(-1) });

				if (teacherId) {
					const updateObject = {};
					updateObject[
						`teachers.${teacherId}.members`
					] = firestore.FieldValue.increment(-1);
					await classRef.parent.parent.update(updateObject);
				}
			} else {
				await userRef.update({
					classes: firestore.FieldValue.arrayUnion(schoolClass),
				});
				await classRef.update({ members: firestore.FieldValue.increment(1) });

				if (teacherId) {
					const updateObject = {};
					updateObject[
						`teachers.${teacherId}.members`
					] = firestore.FieldValue.increment(1);
					await classRef.parent.parent.update(updateObject);
				}
			}

			addToast(
				`Successfully ${joined ? "Left" : "Added to"} ${schoolClass.name}!`,
				{ appearance: "success", autoDismiss: true }
			);
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<Header
			short={school.short}
			shortLink={`/schools/${school.id}`}
			subShort={
				schoolClass.short +
					(schoolClass.teacher
						? " - Professor " + schoolClass.teacher.name
						: " - Hub") || true
			}
			name={schoolClass.name}
		>
			{joined ? (
				<button onClick={toggleJoin} className="button select border">
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
