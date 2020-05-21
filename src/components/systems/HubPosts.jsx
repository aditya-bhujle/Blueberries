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
					: (fetchPosts = await postRef
							.orderBy("date_posted", "desc")
							.limit(3)
							.get());
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
			return (
				<CardPost
					{...post.data()}
					uid={userInfo ? userInfo.id : null}
					key={post.id}
					postRef={postRef.doc(post.id)}
				/>
			);
		})
	);
}
