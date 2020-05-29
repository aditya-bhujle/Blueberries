import React, { useEffect, useState, useContext } from "react";

import { useLocation } from "react-router-dom";
import { db } from "../../../firebase/config";
import { UserContext } from "../../../App";

import PostComments from "./PostComments";
import SinglePostSidebar from "./SinglePostSidebar";
import { CardPost, CardPostSkeleton } from "../../cards/CenterCards";

export default function SinglePostModal() {
	const userInfo = useContext(UserContext);
	const loc = useLocation();

	const [post, setPost] = useState();
	const [classInfo, setClassInfo] = useState();
	const [loading, setLoading] = useState(true);

	const postRef = db.doc(loc.pathname);

	useEffect(() => {
		const fetchData = async () => {
			try {
				let fetchPosts = await postRef.get();
				setPost(fetchPosts.data());

				let hubInfo = await postRef.parent.parent.get();
				setClassInfo(hubInfo.data());
			} catch (error) {
				console.error(error);
			}

			setLoading(false);
		};

		fetchData();
	}, []);

	useEffect(() => {
		const sectionElement = document.getElementById("main_section");
		sectionElement.classList.add("section_full");

		return () => sectionElement.classList.remove("section_full");
	});

	let postProps;

	if (post)
		postProps = {
			...post,
			uid: userInfo ? userInfo.id : null,
			postRef: postRef,
		};

	return (
		<div className="section modal">
			<div className="w-container" style={{ width: "100%" }}>
				{postProps && (
					<div className="hub_column_layout">
						<div className="hub_content">
							{loading ? (
								<CardPostSkeleton />
							) : (
								<CardPost {...postProps} modal />
							)}
							<PostComments postProps={postProps} postRef={postRef} />
						</div>
						<SinglePostSidebar info={classInfo} loading={loading} />
					</div>
				)}
			</div>
		</div>
	);
}
