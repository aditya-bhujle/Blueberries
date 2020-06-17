import React, { useState, useEffect, useContext } from "react";
import { firestore } from "firebase";
import { UserContext } from "../../../App";
import { useToasts } from "react-toast-notifications";

import SortList from "../../SortList";
import PostComment from "./Comment";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

export default function PostComments({ postProps, postRef }) {
	const [sortQuery, setSortQuery] = useState({
		title: "New",
		query: "date_posted",
		desc: true,
	});

	const [commentLoading, setCommentLoading] = useState(true);

	const [comments, setComments] = useState([]);
	const [newComment, setNewComment] = useState("");
	const [previewComments, setPreviewComments] = useState([]);

	const userInfo = useContext(UserContext);
	const { addToast } = useToasts();

	const commentRef = postRef.collection("comments");

	useEffect(() => {
		const fetchData = async () => {
			try {
				console.log(sortQuery.query);
				console.log(sortQuery.desc);
				let fetchPosts = await commentRef
					.orderBy(sortQuery.query, sortQuery.desc ? "desc" : "asc")
					.get();
				console.log("Comment data fetched!");
				setComments(fetchPosts.docs);
			} catch (error) {
				console.error(error);
			}

			setCommentLoading(false);
		};

		fetchData();
	}, [sortQuery]);

	async function addComment(e) {
		e.preventDefault();

		const commentInfo = {
			user: userInfo.username,
			content: newComment,
			likes: [],
			likeCount: 0,
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
		<>
			<div className="hub_card_links multiple">
				<strong>{postProps.comments} Comments</strong>
				<SortList
					list={[
						{ title: "Top", query: "likeCount", desc: true },
						{ title: "Disputed", query: "likeCount" },
						{ title: "New", query: "date_posted", desc: true },
						{ title: "Old", query: "date_posted" },
					]}
					sortQuery={sortQuery}
					setSortQuery={(query) => setSortQuery(query)}
				/>
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

			{!commentLoading ? (
				(comments.length > 0 || previewComments.length > 0) && (
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
				)
			) : (
				<div style={{ textAlign: "center" }}>
					<Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
				</div>
			)}
		</>
	);
}
