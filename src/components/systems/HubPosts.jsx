import React, { useState, useEffect, useContext } from "react";
import { CardPost, CardPostSkeleton } from "../cards/CenterCards";
import { UserContext } from "../../App";

export default function HubPost({ postRef, query }) {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);
	const userInfo = useContext(UserContext);

	useEffect(() => {
		const fetchData = async () => {
			try {
				let fetchPosts;
				query
					? (fetchPosts = await query.get())
					: (fetchPosts = await postRef.orderBy("date_posted").get());
				console.log("Post data fetched!");
				setPosts(fetchPosts.docs);
			} catch (error) {
				console.error(error);
			}

			setLoading(false);
		};

		fetchData();
	}, []);

	return loading ? (
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
	);
}
