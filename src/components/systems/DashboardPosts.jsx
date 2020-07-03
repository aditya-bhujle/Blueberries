import React, { useState, useEffect, useContext } from "react";
import HubPostsRender from "./HubPostsRender";
import { UserContext } from "../../App";
import { db } from "../../firebase/config";

export default function DashboardPost({ postRef, ...props }) {
	const userInfo = useContext(UserContext);

	const [loading, setLoading] = useState(true);
	const [posts, setPosts] = useState([]);

	const loadPostNum = 4;
	const [queryCursors, setQueryCursors] = useState("test");
	const [hasMorePosts, setHasMorePosts] = useState(true);

	const [collectionRefs, setCollectionRefs] = useState([]);

	useEffect(() => {
		if (userInfo && userInfo.school) {
			const schoolDoc = db.collection("schools").doc(userInfo.school.id);
			const tempCollectionRefs = [];

			tempCollectionRefs.push(schoolDoc.collection("posts"));

			if (userInfo.major)
				tempCollectionRefs.push(
					schoolDoc
						.collection("majors")
						.doc(userInfo.major.id)
						.collection("posts")
				);

			userInfo.classes.forEach((userClass) =>
				tempCollectionRefs.push(
					schoolDoc.collection("classes").doc(userClass.id).collection("posts")
				)
			);

			userInfo.clubs.forEach((club) =>
				tempCollectionRefs.push(
					schoolDoc.collection("clubs").doc(club.id).collection("posts")
				)
			);

			setCollectionRefs(tempCollectionRefs);
		}
	}, [userInfo]);

	useEffect(() => {
		const fetchData = async () => {
			setHasMorePosts(true);
			setLoading(true);

			try {
				let tempCollectionDocs = [];
				let tempQueryCursors = [];

				for (let i = 0; i < collectionRefs.length; i++) {
					const collectionRef = collectionRefs[i];

					const fetchPosts = await collectionRef
						.orderBy("date_posted", "desc")
						.limit(loadPostNum)
						.get();
					const collectionDoc = fetchPosts.docs;

					tempCollectionDocs = tempCollectionDocs.concat(collectionDoc);

					if (collectionDoc[collectionDoc.length - 1]) {
						console.log(collectionDoc[collectionDoc.length - 1]);
						tempQueryCursors = tempQueryCursors.concat(
							collectionDoc[collectionDoc.length - 1]
						);
					}
				}

				console.log("Dashboard data fetched!");
				setQueryCursors(tempQueryCursors);
				setPosts(tempCollectionDocs);
			} catch (error) {
				console.error(error);
			}

			setLoading(false);
		};

		if (collectionRefs.length) fetchData();
	}, [collectionRefs]);

	async function fetchMorePosts() {
		try {
			let tempCollectionDocs = [];
			let tempQueryCursor = [];

			for (let i = 0; i < collectionRefs.length; i++) {
				if (!queryCursors[i]) continue;

				const collectionRef = collectionRefs[i];

				console.log(queryCursors);
				const fetchPosts = await collectionRef
					.orderBy("date_posted", "desc")
					.startAfter(queryCursors[i])
					.limit(loadPostNum)
					.get();
				const collectionDoc = fetchPosts.docs;
				console.log(collectionDoc);

				tempCollectionDocs = tempCollectionDocs.concat(collectionDoc);
				tempQueryCursor = tempQueryCursor.concat(
					collectionDoc[collectionDoc.length - 1]
				);

				console.log(tempCollectionDocs);
			}

			if (!tempCollectionDocs.length) {
				setHasMorePosts(false);
				console.log("Reached end of the query!");
				return;
			}

			console.log("Paginated posts fetched!");
			setPosts(posts.concat(tempCollectionDocs));
			setQueryCursors(tempQueryCursor);
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
