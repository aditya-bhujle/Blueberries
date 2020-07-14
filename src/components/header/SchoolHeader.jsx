import React, { useContext, useState, useEffect } from "react";
import Header from "./Header";
import { db } from "../../firebase/config";
import { UserContext } from "../../App";
import Skeleton from "react-loading-skeleton";
import { useToasts } from "react-toast-notifications";
import { useHistory } from "react-router-dom";
import { firestore } from "firebase";

export default function SchoolHeader({
	schoolId,
	loading,
	isLoggedIn,
	schoolRef,
	...props
}) {
	const userInfo = useContext(UserContext);
	const his = useHistory();
	const { addToast } = useToasts();
	const [joined, setJoined] = useState(false);

	useEffect(() => {
		if (userInfo && userInfo.school && userInfo.school.id === schoolId)
			setJoined(true);
	}, [schoolId, userInfo]);

	if (loading)
		return (
			<Header loading short {...props}>
				<Skeleton height={37} width={95} />
				<div style={{ marginLeft: "10px", display: "inline-block" }}>
					<Skeleton height={37} width={110} />
				</div>
			</Header>
		);

	const schoolObject = {
		id: schoolId,
		name: props.name,
		short: props.short,
	};

	async function toggleJoin() {
		if (!isLoggedIn) return his.push("/signup");

		setJoined(!joined);
		const userRef = db.collection("users").doc(userInfo.id);

		try {
			await userRef.update({
				school: joined ? {} : schoolObject,
			});

			await schoolRef.update({
				members: firestore.FieldValue.increment(joined ? -1 : 1),
			});

			addToast(`Successfully ${joined ? "Left" : "Added to"} ${props.name}!`, {
				appearance: "success",
				autoDismiss: true,
			});
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<Header shortLink={`/schools/${schoolId}`} {...props}>
			{joined ? (
				<button onClick={toggleJoin} className="button select border">
					{`Joined ${props.short}!`}
				</button>
			) : (
				<button onClick={toggleJoin} className="button">
					{`Join ${props.short}!`}
				</button>
			)}
		</Header>
	);
}
