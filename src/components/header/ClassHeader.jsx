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

	const userRef = db.collection("users").doc(userInfo.id);

	useEffect(() => {
		if (userInfo) {
			userInfo.classes.forEach((userClass) => {
				if (userClass.id === schoolClass.id) setJoined(true);
			});
		}
		if (userInfo) {
			let foundMatch = false;
			userInfo.classes.forEach((userClass) => {
				if (userClass.id === schoolClass.id) {
					if (userClass.teacher && teacherId === userClass.teacher.id) {
						foundMatch = true;
					} else if (!userClass.teacher && !teacherId) {
						foundMatch = true;
					}
				}
			});
			setJoined(foundMatch);
		}
	}, [schoolClass.id, teacherId, userInfo]);

	if (loading)
		return (
			<Header loading short>
				<Skeleton height={37} width={95} />
				<div style={{ marginLeft: "10px", display: "inline-block" }}>
					<Skeleton height={37} width={110} />
				</div>
			</Header>
		);

	async function removeClassFromUser() {
		const removeClasses = userInfo.classes.filter(
			(userClass) => userClass.id === schoolClass.id
		);

		for (let i = 0; i < removeClasses.length; i++) {
			await userRef.update({
				classes: firestore.FieldValue.arrayRemove(removeClasses[i]),
			});
		}
	}

	// Removes member from other Hub (if teacher removes from hub vice versa) and
	// if its removing a teacher then will subtract member from teachers.members in hub
	async function removeClassConflict() {
		let otherTeacherId;

		const similarClasses = userInfo.classes.filter(
			(userClass) => userClass.id === schoolClass.id
		);

		for (let i = 0; i < similarClasses.length; i++) {
			const similarClass = similarClasses[i];

			if (similarClass.teacher && similarClass.teacher.id)
				otherTeacherId = similarClass.teacher.id;
		}

		// If I'm joined to a teacher somewhere else, subtract the teacher member, else subtract the hub member
		let otherRef = otherTeacherId
			? classRef.collection("teachers").doc(otherTeacherId)
			: classRef.parent.parent;
		await otherRef.update({ members: firestore.FieldValue.increment(-1) });

		if (otherTeacherId) {
			const updateObject = {};
			updateObject[
				`teachers.${otherTeacherId}.members`
			] = firestore.FieldValue.increment(-1);
			await classRef.update(updateObject);
		}
	}

	async function toggleJoin() {
		setJoined(!joined);

		try {
			if (joined) {
				removeClassFromUser();

				if (teacherId) {
					const updateObject = {};
					updateObject[
						`teachers.${teacherId}.members`
					] = firestore.FieldValue.increment(-1);
					await classRef.parent.parent.update(updateObject);
				}
			} else {
				const isInClass = //Checks if theres a conflict
					userInfo.classes.filter(
						(userClass) => userClass.id === schoolClass.id
					).length > 0;

				// User is not inside this hub
				if (isInClass) removeClassConflict();

				removeClassFromUser();

				// Add to class

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
