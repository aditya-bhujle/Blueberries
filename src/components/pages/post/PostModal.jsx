import React, { useEffect } from "react";

import Sidebar from "./Sidebar";
import { CardPost } from "../../cards/CenterCards";
import PostComments from "./PostComments";

export default function PostModal({ postRef, postProps, close, info }) {
	window.history.replaceState(null, "New Post", "/" + postRef.path);

	useEffect(() => {
		const rootElement = document.getElementById("main_section");
		rootElement.classList.add("section_full");

		return () => rootElement.classList.remove("section_full");
	}, []);

	return (
		<div className="section modal">
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
					<Sidebar info={info} close={close} />
				</div>
			</div>
		</div>
	);
}
