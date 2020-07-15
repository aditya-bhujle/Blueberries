import React, { useState, useEffect } from "react";
import HubPostsRender from "./HubPostsRender";

export default function HubPost({ collectionRef, ...props }) {
	const [loading, setLoading] = useState(true);
	const [posts, setPosts] = useState([]);

	const loadPostNum = 4;
	const [queryCursor, setQueryCursor] = useState();
	const [hasMorePosts, setHasMorePosts] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			setHasMorePosts(true);
			setLoading(true);
			try {
				let fetchPosts = await collectionRef
					.orderBy(props.sortQuery, props.sortQueryOrder)
					.limit(loadPostNum)
					.get();

				setQueryCursor(fetchPosts.docs[fetchPosts.docs.length - 1]);

				console.log("Post data fetched!");

				if (fetchPosts.empty) setHasMorePosts(false);

				setPosts(fetchPosts.docs);
			} catch (error) {
				console.error(error);
			}

			setLoading(false);
		};
		fetchData();
	}, [collectionRef.path, props.sortQuery, props.sortQueryOrder]);

	async function fetchMorePosts() {
		try {
			let fetchPosts = await collectionRef
				.orderBy(props.sortQuery, props.sortQueryOrder)
				.startAfter(queryCursor)
				.limit(loadPostNum)
				.get();

			if (fetchPosts.empty) {
				setHasMorePosts(false);
				console.log("Reached end of the query!");
				return;
			}

			setQueryCursor(fetchPosts.docs[fetchPosts.docs.length - 1]);

			console.log("Paginated posts fetched!");
			setPosts(posts.concat(fetchPosts.docs));
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<HubPostsRender
			hasMorePosts={hasMorePosts}
			loading={loading}
			posts={posts}
			fetchMorePosts={fetchMorePosts}
			{...props}
		/>
	);
}
