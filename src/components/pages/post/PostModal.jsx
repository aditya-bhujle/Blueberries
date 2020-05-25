import React from "react";

import Content from "./Content";
import Sidebar from "./Sidebar";

export default function PostModal({ id, postProps, close }) {
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
					<Content postProps={postProps} />
					<Sidebar />
				</div>
			</div>
		</div>
	);
}
