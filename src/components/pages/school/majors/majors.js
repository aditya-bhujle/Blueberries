import React from "react";

import ContentTitle from "../../../header/ContentTitle";
import Sidebar from "../SchoolSidebar";
import Content from "./Content";

export default function SchoolPosts({ sidebar }) {
	return (
		<>
			<ContentTitle header="Your Feed" sortList={["Hot", "Top", "New"]} />
			<div className="hub_column_layout">
				<Content />
				{sidebar}
			</div>
		</>
	);
}
