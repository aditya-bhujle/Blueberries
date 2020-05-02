import React from "react";

import Section from "../../Section";
import Content from "./Content";
import Sidebar from "./Sidebar";

export default function Post(props) {
	const postID = props.match.params.id;
	return (
		<Section>
			<div className="back_link">
				<svg className="back_link_svg">
					<use xlinkHref="#left" />
				</svg>
				<h5>Back to Home</h5>
			</div>
			<div className="hub_column_layout">
				<Content />
				<Sidebar />
			</div>
		</Section>
	);
}
