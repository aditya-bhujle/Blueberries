import React from "react";
import ChatCard from "../../../chat/ChatCard";
import Message from "../../../chat/Message";

export default function ClassMessageContent() {
	return (
		<div className="hub_content">
			<ChatCard>
				<Message
					user="TestName1"
					time="11:30 AM"
					messages={["Lorem ipsum", "Lorem ipsum", "Lorem ipsum"]}
				/>
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
			</ChatCard>
		</div>
	);
}
