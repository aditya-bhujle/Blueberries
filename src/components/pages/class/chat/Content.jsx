import React, { useEffect, useState, useContext } from "react";
import ChatCard from "../../../chat/ChatCard";
import Message from "../../../chat/Message";
import { UserContext } from "../../../../App";
import { db } from "../../../../firebase/config";

export default function ClassMessageContent({ classRef, ...props }) {
	const [messages, setMessages] = useState([]);

	const userInfo = useContext(UserContext);

	useEffect(() => {
		const fetchData = async () => {
			try {
				await classRef.orderBy("date_posted").onSnapshot((querySnapshot) => {
					setMessages(querySnapshot.docs);
				});
				console.log("Messages fetched!");
			} catch (error) {
				console.error(error);
			}

			//setLoading(false);
		};

		fetchData();
	}, [classRef]);

	async function sendMessage(e, content) {
		e.preventDefault();

		try {
			await classRef.add({
				content: content,
				user: userInfo.username,
				user_id: userInfo.id,
				date_posted: db.Timestamp.now(),
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
					time={date_posted.toDate()}
					{...restOfMessage}
					self={user_id === userInfo.id}
					//Poll props below
					messageRef={classRef.doc(messages[index].id)}
					key={messages[index].id}
				/>
			);
			groupContent = [];
		}

		return components;
	}

	return (
		<div className="hub_content">
			<ChatCard sendMessage={sendMessage} {...props}>
				{groupMessages()}
			</ChatCard>
		</div>
	);
}
