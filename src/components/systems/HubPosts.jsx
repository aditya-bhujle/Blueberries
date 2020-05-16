import React, { useState, useEffect, useContext } from "react";
import firebase from "firebase/app";
import {
	CardSearch,
	CardCreate,
	CardPost,
	CardPostSkeleton,
} from "../cards/CenterCards";
import { UserContext } from "../../App";

export default function HubPost({ postRef }) {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);
	const userInfo = useContext(UserContext);

	useEffect(() => {
		const fetchData = async () => {
			try {
				let fetchPosts = await postRef.orderBy("date_posted").get();
				console.log("Post data fetched!");
				setPosts(fetchPosts.docs);
			} catch (error) {
				console.error(error);
			}

			setLoading(false);
		};

		fetchData();
	}, []);

	async function createPost(e, title, description) {
		e.preventDefault();

		try {
			await postRef.add({
				title,
				content: description,
				likes: [],
				comments: 0,
				author: userInfo.username,
				date_posted: firebase.firestore.Timestamp.now(),
			});
			console.log(`${title} successfully created!`);
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<div className="hub_content">
			<CardSearch placeholder="Search Popular Posts" />
			<CardCreate
				title="Create Post"
				placeholder="Ask questions, share information, or start a discussion!"
				createPlaceholder="Post Title"
				handleSubmit={createPost}
			/>

			{loading ? (
				<>
					<CardPostSkeleton />
					<CardPostSkeleton />
					<CardPostSkeleton />
					<CardPostSkeleton />
				</>
			) : (
				posts.map((post) => {
					let { date_posted, ...restOfPost } = post.data();
					return (
						<CardPost
							{...restOfPost}
							uid={userInfo ? userInfo.id : null}
							date_posted={date_posted.toDate().toString()}
							key={post.id}
							postRef={postRef.doc(post.id)}
						/>
					);
				})
			)}
		</div>
	);
}
