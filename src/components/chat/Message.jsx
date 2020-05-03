import React, { useState } from "react";

export default function Message({ user, time, messages, self, ...props }) {
    const [selected, setSelected] = useState(-1);
    
	function chatEvent({ title, date, day, time_span }) {
		return (
			<div className="hub_card bot_padding send">
				<h3>{title}</h3>
				<div className="list_div">
					<p className="list_date">{day}</p>
					<strong>{date}</strong>
					<p className="list_subtitle">{time_span}</p>
				</div>
				<a href="www.google.com" className="button no_margin w-button">Attend</a>
				<a href="www.google.com" className="button select w-button">Not Attend</a>
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
						className={"list_div poll" + (index == selected ? " selected" : "")}
						onClick={() => setSelected(index)}
						key={index}
					>
						<strong>{`${choice.name} - ${choice.votes} Votes`}</strong>
					</div>
				))}
				<a href="www.google.com" className="button poll w-button">
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
