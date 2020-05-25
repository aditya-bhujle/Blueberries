import React, { useState, useEffect, useContext } from "react";
import { CardPost } from "../../cards/CenterCards";
import { firestore } from "firebase";
import { UserContext } from "../../../App";
import { useToasts } from "react-toast-notifications";

import SortList from "../../SortList";
import PostComment from "./Comment";

export default function PostContent({ postProps, postRef }) {
	const [loading, setLoading] = useState(true);

	const [comments, setComments] = useState([]);
	const [newComment, setNewComment] = useState("");
	const [previewComments, setPreviewComments] = useState([]);

	const userInfo = useContext(UserContext);
	const { addToast } = useToasts();

	const commentRef = postRef.collection("comments");

	useEffect(() => {
		const fetchData = async () => {
			try {
				let fetchPosts = await commentRef.get();
				console.log("Comment data fetched!");
				setComments(fetchPosts.docs);
			} catch (error) {
				console.error(error);
			}

			setLoading(false);
		};

		fetchData();
	}, []);

	async function addComment(e) {
		e.preventDefault();

		const commentInfo = {
			user: userInfo.username,
			content: newComment,
			likes: [],
			date_posted: firestore.Timestamp.now(),
			replies: 0,
		};

		try {
			const tempRef = await commentRef.add(commentInfo);
			await postRef.update({
				comments: firestore.FieldValue.increment(1),
			});

			setNewComment("");
			setPreviewComments(
				previewComments.concat({ ...commentInfo, id: tempRef.id })
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
		<div className="hub_content">
			<CardPost {...postProps} />
			<div className="hub_card_links multiple">
				<strong>{postProps.comments} Comments</strong>
				<SortList list={["Hot", "New", "Top"]} />
			</div>
			<form className="hub_card bot_padding" onSubmit={(e) => addComment(e)}>
				<textarea
					placeholder="Write your comment here!"
					maxLength="5000"
					className="search_input w-input"
					value={newComment}
					onChange={(e) => setNewComment(e.target.value)}
				/>
				<button className="button comment w-button">Comment</button>
			</form>
			{(comments.length > 0 || previewComments.length > 0) && (
				<div className="hub_card">
					{previewComments.map((comment) => (
						<PostComment
							{...comment}
							commentDocRef={commentRef.doc(comment.id)}
							postRef={postRef}
							key={comment.id}
						/>
					))}
					{comments &&
						comments.map((comment) => (
							<PostComment
								{...comment.data()}
								commentDocRef={commentRef.doc(comment.id)}
								postRef={postRef}
								key={comment.id}
							/>
						))}
				</div>
			)}
		</div>
	);
}
