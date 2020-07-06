import React, { useEffect, useState } from "react";

import Sidebar from "./Sidebar";
import { CardPost } from "../../cards/CenterCards";
import PostComments from "./PostComments";

export default function PostModal({ postRef, postProps, close, info }) {
	const [newInfo, setNewInfo] = useState(info);
	window.history.replaceState(null, "New Post", "/" + postRef.path);

	useEffect(() => {
		const fetchInfo = async () => {
			try {
				let hubInfo = await postRef.parent.parent.get();
				console.log("Fetched HubInfo!");
				setNewInfo(hubInfo.data());
			} catch (error) {
				console.error(error);
			}
		};

		if (!info) fetchInfo();

		const rootElement = document.getElementById("main_section");
		rootElement.classList.add("section_full");

		return () => rootElement.classList.remove("section_full");
	}, []);

	if (newInfo)
		document.title = `${postProps.title} - ${newInfo.short} - ${newInfo.name} | Blueberries`;
	else document.title = postProps.title + " - | Blueberries";

	return (
		<div className="section modal" id="section_modal">
			<div className="w-container" style={{ width: "100%" }}>
				<div className="back_link" onClick={close}>
					<svg className="back_link_svg">
						<use xlinkHref="#left" />
					</svg>
					<h5>Back to Home</h5>
				</div>
				<div className="hub_column_layout">
					<div className="hub_content">
						<CardPost {...postProps} modal />
						<PostComments postProps={postProps} postRef={postRef} />
					</div>
					<Sidebar info={newInfo} close={info ? close : false} />
				</div>
			</div>
		</div>
	);
}
