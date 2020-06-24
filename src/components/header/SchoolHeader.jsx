import React, { useContext, useState, useEffect } from "react";
import Header from "./Header";
import firebase from "firebase/app";
import { db } from "../../firebase/config";
import { UserContext } from "../../App";
import Skeleton from "react-loading-skeleton";
import { useToasts } from "react-toast-notifications";

export default function SchoolHeader({ schoolId, loading, ...props }) {
	const userInfo = useContext(UserContext);
	const { addToast } = useToasts();
	const [joined, setJoined] = useState(false);

	useEffect(() => {
		if (userInfo && userInfo.school.id === schoolId) setJoined(true);
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

	const schoolObject = {
		id: schoolId,
		name: props.name,
		short: props.short,
	};

	async function toggleJoin() {
		setJoined(!joined);
		const userRef = db.collection("users").doc(userInfo.id);

		try {
			await userRef.update({
				school: joined ? {} : schoolObject,
			});
			addToast(
				`Successfully ${joined ? "Left" : "Added to"} ${props.name}!`,
				{ appearance: "success", autoDismiss: true }
			);
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<Header
			shortLink={`/schools/${schoolId}`}
			loading={loading}
			{...props}
		>
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
