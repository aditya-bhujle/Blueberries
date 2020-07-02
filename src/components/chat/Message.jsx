import React, { useState, useContext, useEffect } from "react";
import { firestore } from "firebase";
import { UserContext } from "../../App";

export default function Message({ user, time, content, self, ...props }) {
	const [pollSelected, setPollSelected] = useState(-1);
	const [pollAllowVote, setPollAllowVote] = useState(true);
	const [pollVoted, setPollVoted] = useState(-1);
	const userInfo = useContext(UserContext);

	useEffect(() => {
		if (props.poll) {
			Object.entries(props.poll.choices).forEach(([index, choice]) => {
				choice.votes.forEach((user) => {
					if (user === userInfo.id) {
						setPollAllowVote(false);
						setPollVoted(parseInt(index));
					}
				});
			});
		}
	}, [userInfo, props.poll]);

	function chatEvent({ title, date, day, time_span }) {
		return (
			<div className="hub_card bot_padding send">
				<h3>{title}</h3>
				<div className="list_div">
					<p className="list_date">{day}</p>
					<strong>{date}</strong>
					<p className="list_subtitle">{time_span}</p>
				</div>
				<a href="www.google.com" className="button no_margin w-button">
					Attend
				</a>
				<a href="www.google.com" className="button select w-button">
					Not Attend
				</a>
			</div>
		);
	}

	function chatPoll({ title, votes, choices, multiple }) {
		async function vote() {
			if (pollSelected === -1) return null;

			try {
				const voteObject = {};
				voteObject[
					`poll.choices.${pollSelected}.votes`
				] = firestore.FieldValue.arrayUnion(userInfo.id);

				if (pollVoted !== -1) {
					const pastVote = {};
					pastVote[
						`poll.choices.${pollVoted}.votes`
					] = firestore.FieldValue.arrayRemove(userInfo.id);

					await props.messageRef.update(pastVote);
				}

				await props.messageRef.update(voteObject);
			} catch (error) {
				console.error(error);
			}
		}

		return (
			<div className="hub_chat_poll">
				<strong>Poll - {title}</strong>
				<p className="list_subtitle poll">
					{votes} Votes{multiple ? " ⋅ Select Multiple" : ""}
				</p>
				{Object.values(choices).map((choice, index) => {
					if (!pollAllowVote) {
						return (
							<div
								className={
									"list_div poll_nohover" +
									(index === pollVoted ? " voted" : "")
								}
								key={index}
							>
								<strong>{`${choice.name} - ${choice.votes.length} Votes`}</strong>
							</div>
						);
					}

					return (
						<div
							className={
								"list_div poll" + (index === pollSelected ? " selected" : "")
							}
							onClick={() => setPollSelected(index)}
							key={index}
						>
							<strong>{`${choice.name} - ${choice.votes.length} Votes`}</strong>
						</div>
					);
				})}
				{pollAllowVote ? (
					<button onClick={vote} className="button poll w-button">
						Vote
					</button>
				) : (
					<button
						onClick={() => setPollAllowVote(true)}
						className="button poll w-button"
					>
						Change Vote
					</button>
				)}
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
			{!props.noTitle && (
				<div className="flex_hor w-clearfix">
					<strong>{self ? "You" : user}</strong>
					<p className="list_date">{time}</p>
				</div>
			)}

			{content &&
				content.map((message, index) => (
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
