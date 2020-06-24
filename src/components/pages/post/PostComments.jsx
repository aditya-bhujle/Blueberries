import React, { useState, useEffect, useContext } from "react";
import { firestore } from "firebase";
import { UserContext } from "../../../App";
import { useToasts } from "react-toast-notifications";

import SortList from "../../SortList";
import PostComment from "./Comment";
import SpinLoad from "../../SpinLoad";
import InfiniteScroll from "../../../../node_modules/react-infinite-scroll-component/dist/index";

export default function PostComments({ postProps, postRef }) {
	const userInfo = useContext(UserContext);
	const { addToast } = useToasts();

	const [sortQuery, setSortQuery] = useState({
		title: "New",
		query: "date_posted",
		desc: true,
	});

	const [commentLoading, setCommentLoading] = useState(true);

	const [comments, setComments] = useState([]);
	const [newComment, setNewComment] = useState("");
	const [previewComments, setPreviewComments] = useState([]);

	const commentColRef = postRef.collection("comments");

	const loadCommentNum = 6;
	const [queryCursor, setQueryCursor] = useState();
	const [hasMoreComments, sethasMoreComments] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			setPreviewComments([]);
			try {
				let fetchPosts = await commentColRef
					.orderBy(sortQuery.query, sortQuery.desc ? "desc" : "asc")
					.limit(loadCommentNum)
					.get();

				setQueryCursor(fetchPosts.docs[fetchPosts.docs.length - 1]);

				console.log("Comment data fetched!");
				setComments(fetchPosts.docs);
			} catch (error) {
				console.error(error);
			}

			setCommentLoading(false);
		};

		fetchData();
	}, [sortQuery]);

	async function fetchMoreComments() {
		try {
			let fetchComments = await commentColRef
				.orderBy(sortQuery.query, sortQuery.desc ? "desc" : "asc")
				.startAfter(queryCursor)
				.limit(loadCommentNum)
				.get();

			if (fetchComments.empty) {
				sethasMoreComments(false);
				console.log("Reached end of the query!");
				return;
			}

			setQueryCursor(fetchComments.docs[fetchComments.docs.length - 1]);

			console.log("Paginated comments fetched!");
			setComments(comments.concat(fetchComments.docs));
		} catch (error) {
			console.error(error);
		}
	}

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
			const tempRef = await commentColRef.add(commentInfo);
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
								commentDocRef={commentColRef.doc(comment.id)}
								postRef={postRef}
								key={comment.id}
							/>
						))}
						<InfiniteScroll
							dataLength={comments.length}
							next={fetchMoreComments}
							hasMore={hasMoreComments}
							loader={<SpinLoad big />}
							scrollableTarget="section_modal"
						>
							{comments.map((comment) => (
								<PostComment
									{...comment.data()}
									commentDocRef={commentColRef.doc(comment.id)}
									postRef={postRef}
									key={comment.id}
								/>
							))}
						</InfiniteScroll>
					</div>
				)
			) : (
				<SpinLoad />
			)}
		</>
	);
}
