import React, { useEffect, useState, useContext } from "react";
import algoliasearch from "algoliasearch/lite";
import { CardPost } from "../cards/CenterCards";
import { UserContext } from "../../App";
import PostModal from "../pages/post/PostModal";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { firestore } from "firebase/app";

export default function HubResults({ searchQuery, hubRef, info, ...props }) {
	const userInfo = useContext(UserContext);

	const [algoliaLoading, setAlgoliaLoading] = useState(true);
	const [searchResults, setSearchResults] = useState([]);

	const [firebaseLoading, setFirebaseLoading] = useState(true);
	const [fbPosts, setFbPosts] = useState([]);

	const [showModal, setShowModal] = useState(false);
	const [modalRef, setModalRef] = useState();
	const [modalProps, setModalProps] = useState();

	useEffect(() => {
		const fetchData = async () => {
			setAlgoliaLoading(true);
			setFirebaseLoading(true);
			console.log("Starting algolia search!");

			const searchClient = algoliasearch(
				"N0TPLXF71A",
				"189999656c32b0f21e6c06df407b5f3c"
			);

			const index = searchClient.initIndex(
				hubRef.path.replace("schools/", "").replace(/\//g, " > ")
			);

			let fetchSearches;
			try {
				fetchSearches = await index.search(searchQuery);
				setSearchResults(fetchSearches.hits);
			} catch (error) {
				console.error(error);
			}
			console.log("Ending algolia search!");
			setAlgoliaLoading(false);

			console.log("Starting firebase search!");

			let fbResults = [];
			for (let index = 0; index < fetchSearches.hits.length; index++) {
				const post = fetchSearches.hits[index];
				const fbPost = await hubRef.doc(post.objectID).get();
				fbResults.push(fbPost);
			}
			setFbPosts(fbResults);

			setFirebaseLoading(false);
			console.log("Ending firebase search!");
		};

		fetchData();
	}, [searchQuery, hubRef.path]);

	if (algoliaLoading)
		return (
			<div style={{ textAlign: "center" }}>
				<Spin indicator={<LoadingOutlined style={{ fontSize: 36 }} spin />} />
			</div>
		);

	return (
		<>
			{searchResults.map((post, index) => {
				const seconds = post.date_posted._seconds;
				const nanoseconds = post.date_posted._nanoseconds;

				const newPost = Object.assign({}, post, {
					date_posted: new firestore.Timestamp(seconds, nanoseconds),
				});
				return (
					<CardPost
						{...newPost}
						likes={!firebaseLoading ? fbPosts[index].data().likes : []}
						comments={!firebaseLoading ? fbPosts[index].data().comments : []}
						uid={userInfo ? userInfo.id : null}
						key={post.objectID}
						postRef={!firebaseLoading ? fbPosts[index].ref : false}
						hideCategory={props.hideCategory}
						showSource={!info}
						showModal={(ref, props, liked, likes, disliked, dislikes) => {
							setModalRef(ref);
							setModalProps({
								...props,
								liked: liked,
								passLikes: likes,
								disliked: disliked,
								passDislikes: dislikes,
							});
							setShowModal(true);
						}}
					/>
				);
			})}

			{!searchResults.length && (
				<p style={{ textAlign: "center" }}>No results</p>
			)}

			{showModal && (
				<PostModal
					postRef={modalRef}
					postProps={modalProps}
					close={() => {
						window.history.replaceState(null, "New Post", props.loc.pathname);
						setShowModal(false);
					}}
					info={info}
				/>
			)}
		</>
	);
}
