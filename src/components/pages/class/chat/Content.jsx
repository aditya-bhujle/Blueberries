import React, { useEffect, useState, useContext } from "react";
import firebase from "firebase/app";
import ChatCard from "../../../chat/ChatCard";
import Message from "../../../chat/Message";
import { UserContext } from "../../../../App";

export default function ClassMessageContent({ classRef }) {
	const [messages, setMessages] = useState([]);
	const [loading, setLoading] = useState(true);

	const userInfo = useContext(UserContext);

	useEffect(() => {
		const fetchData = async () => {
			try {
				await classRef.orderBy("date_posted").onSnapshot((querySnapshot) => {
					setMessages(querySnapshot.docs);
					console.log("Messages fetched!");
				});
			} catch (error) {
				console.error(error);
			}

			setLoading(false);
		};

		fetchData();
	}, []);

	async function sendMessage(e, content) {
		e.preventDefault();

		try {
			await classRef.add({
				content: content,
				user: userInfo.username,
				user_id: userInfo.id,
				date_posted: firebase.firestore.Timestamp.now(),
			});
			console.log("Message sent!");
		} catch (error) {
			console.error(error);
		}
	}

	function groupMessages() {
		if (!messages.length || !userInfo) return null;

		let components = [];
		let groupContent = [];
		for (let index = 0; index < messages.length; index++) {
			const { date_posted, user_id, content, ...restOfMessage } = messages[
				index
			].data();

			content && groupContent.push(content);

			if (
				content &&
				index !== messages.length - 1 &&
				user_id === messages[index + 1].data().user_id
			)
				continue;

			components.push(
				<Message
					content={groupContent}
					time={date_posted.toDate().toString()}
					{...restOfMessage}
					self={user_id === userInfo.id}
				/>
			);
			groupContent = [];
		}

		return components;
	}

	return (
		<div className="hub_content">
			<ChatCard classRef={classRef} sendMessage={sendMessage}>
				{groupMessages()}
				{/*<div style={{ display: "none" }}>
					<Message user="TestName1" time="11:30 AM" content={"Lorem ipsum"} />
					<Message
						user="TestName2"
						time="12:31 AM"
						event={{
							title: "Graduation Ceremony",
							date: "February 10",
							day: "Monday",
							time_span: "1:30 pm - 5:30 pm",
						}}
					/>
					<Message
						user="TestName1"
						time="12:36 AM"
						poll={{
							title: "Should UNCC close down because of Corona",
							votes: 23,
							choices: [
								{ name: "Major", votes: 13 },
								{ name: "Classes", votes: 1 },
								{ name: "Clubs", votes: 0 },
								{ name: "Chats", votes: 1 },
							],
							multiple: true,
						}}
						self
					/>
					<Message
						user="TestName1"
						time="12:36 AM"
						post={{
							author: "Anonymous",
							time: "Yesterday",
							title: "Who else has Assignment 3 pushed back?",
							alert:
								"This post was posted in the Data Structures and Algorithms hub",
							content:
								"I'm in Long's class and he pushed it back to Monday. Was wondering about other teachers.",
						}}
					/>
				</div>*/}
			</ChatCard>
		</div>
	);
}
