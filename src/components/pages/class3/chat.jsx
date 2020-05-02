import React, { useState } from "react";

import ChatPreview from "../../layout/collections/ChatPreview";
import ChatCard from "../../cards/ChatCard";

export default function Chat() {
	const contentCard = (
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
	);

	return (
		<div className="hub_column_layout">
			{contentCard}
			<ChatPreview />
		</div>
	);
}

function Message({ user, time, messages, self, ...props }) {
	const [pollSelected, setPollSelected] = useState(-1);

	function chatEvent({ title, date, day, time_span }) {
		return (
			<div className="hub_card bot_padding send">
				<h3>{title}</h3>
				<div className="list_div">
					<p className="list_date">{day}</p>
					<strong>{date}</strong>
					<p className="list_subtitle">{time_span}</p>
				</div>
				<a className="button no_margin w-button">Attend</a>
				<a className="button select w-button">Not Attend</a>
			</div>
		);
	}

	function chatPoll({ title, votes, choices, multiple }) {
		return (
			<div className="hub_chat_poll">
				<strong>Poll - {title}</strong>
				<p className="list_subtitle poll">
					{votes} Votes{multiple ? " ⋅ Select Multiple" : ""}
				</p>
				{choices.map((choice, index) => (
					<div
						className={
							"list_div poll" + (index == pollSelected ? " selected" : "")
						}
						onClick={() => setPollSelected(index)}
						key={index}
					>
						<strong>{`${choice.name} - ${choice.votes} Votes`}</strong>
					</div>
				))}
				<a href="#" className="button poll w-button">
					Vote
				</a>
			</div>
		);
	}

	function chatImage(images) {
		const multiple = images.length > 1;
		return (
			<div className={multiple ? "hub_chat_photos_div sent" : ""}>
				{images.map((image) => (
					<img
						src={`images/${image}`}
						sizes="100vw"
						className={multiple ? "hub_chat_image" : "hub_chat_photo"}
						key={image}
					/>
				))}
			</div>
		);
	}

	function chatPost({ author, time, title, alert, content }) {
		return (
			<div className="hub_card sent">
				<div className="hub_post_details">
					{author} ⋅ {time}
				</div>
				<h3>{title}</h3>
				<p className="main_color">{alert}</p>
				<p>{content}</p>
			</div>
		);
	}

	return (
		<div className={"hub_chat_message_div" + (self ? " self" : "")}>
			<div className="flex_hor w-clearfix">
				<strong>{user}</strong>
				<p className="list_date">{time}</p>
			</div>

			{messages &&
				messages.map((message, index) => (
					<div
						className={"hub_chat_message" + (self ? " self" : "")}
						key={index}
					>
						{message}
					</div>
				))}

			{props.event && chatEvent(props.event)}
			{props.poll && chatPoll(props.poll)}
			{props.image && chatImage(props.image)}
			{props.post && chatPost(props.post)}
		</div>
	);
}
