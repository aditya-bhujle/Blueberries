import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../App";
import { firestore } from "firebase/app";
import { useToasts } from "react-toast-notifications";

export default function PostComment({
	user,
	date_posted,
	content,
	likes: propLikes,
	top_answer,
	...props
}) {
	const [replies, setReplies] = useState();

	const [likes, setLikes] = useState(propLikes.length);
	const [liked, setLiked] = useState(false);

	const [showReply, setShowReply] = useState(false);
	const [replyText, setReplyText] = useState("");

	const [previewReplies, setPreviewReplies] = useState([]);

	const { addToast } = useToasts();
	const userInfo = useContext(UserContext);

	useEffect(() => {
		const fetchData = async () => {
			try {
				let fetchReplies = await props.commentDocRef
					.collection("comments")
					.get();
				setReplies(fetchReplies.docs);
			} catch (error) {
				console.error(error);
			}
		};

		if (props.replies) fetchData();
	}, []);

	useEffect(() => {
		propLikes.forEach((user) => {
			if (userInfo && user === userInfo.id) setLiked(true);
		});
	}, [userInfo]);

	async function toggleLike() {
		try {
			if (!liked) {
				setLiked(true);
				setLikes(likes + 1);

				await props.commentDocRef.update({
					likes: firestore.FieldValue.arrayUnion(userInfo.id),
				});
			} else {
				setLiked(false);
				setLikes(likes - 1);

				await props.commentDocRef.update({
					likes: firestore.FieldValue.arrayRemove(userInfo.id),
				});
			}
		} catch (error) {
			console.error(error);
		}
	}

	async function addReply(e) {
		e.preventDefault();

		const replyInfo = {
			user: userInfo.username,
			content: replyText,
			likes: [],
			date_posted: firestore.Timestamp.now(),
			replies: 0,
		};

		try {
			const tempRef = await props.commentDocRef
				.collection("comments")
				.add(replyInfo);

			await props.postRef.update({
				comments: firestore.FieldValue.increment(1),
			});

			setReplyText("");
			setPreviewReplies(
				previewReplies.concat({ ...replyInfo, id: tempRef.id })
			);
			addToast(`Comment Successfully Added!`, {
				appearance: "success",
				autoDismiss: true,
			});
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<div>
			<div
				className={
					"post_comment" +
					(top_answer ? " top" : "") +
					(user === userInfo.username ? " self" : "")
				}
			>
				<div className="post_comment_details">
					<strong>{user}</strong> ⋅ {date_posted.toDate().toString()}
				</div>

				{top_answer && (
					<strong className="action_div category">Top Answer</strong>
				)}

				<p className="post_comment_paragraph">{content}</p>

				<div className="post_comment_action_div">
					<strong
						className="action_div"
						onClick={() => setShowReply(!showReply)}
						style={showReply ? { color: "#1a73e8" } : {}}
					>
						Reply
					</strong>
					<div className="action_div comment" onClick={toggleLike}>
						<svg style={{ width: "14px", height: "14px", marginRight: "5px" }}>
							<use xlinkHref={"#" + (liked ? "heart-filled" : "heart")} />
						</svg>
						<strong>{likes}</strong>
					</div>
					<div className="action_div comment">
						<svg style={{ width: "14px", height: "14px", marginRight: "5px" }}>
							<use xlinkHref="#answer" />
						</svg>
						<strong>Best Answer ⋅ 3</strong>
					</div>
				</div>
			</div>

			{showReply && (
				<form className="hub_card reply" onSubmit={(e) => addReply(e)}>
					<textarea
						placeholder="Write your comment here!"
						maxLength="5000"
						className="search_input w-input"
						onChange={(e) => setReplyText(e.target.value)}
						value={replyText}
					/>
					<button className="button comment w-button">Comment</button>
				</form>
			)}

			{(replies || previewReplies.length > 0) && (
				<div style={{ marginLeft: "45px" }}>
					{previewReplies.map((comment) => (
						<PostComment
							{...comment}
							commentDocRef={props.commentDocRef
								.collection("comments")
								.doc(comment.id)}
							postRef={props.postRef}
							key={comment.id}
						/>
					))}
					{replies &&
						replies.map((reply) => (
							<PostComment
								{...reply.data()}
								commentDocRef={props.commentDocRef
									.collection("comments")
									.doc(reply.id)}
								postRef={props.postRef}
								key={reply.id}
							/>
						))}
				</div>
			)}
		</div>
	);
}
