import React from "react";
import Content from "./Content";

export default function SchoolPosts({ sidebar }) {
	return (
		<>
			<div className="hub_column_layout">
				<Content />
				{sidebar}
			</div>
		</>
	);
}
