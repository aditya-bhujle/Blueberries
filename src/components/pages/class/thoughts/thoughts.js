import React from "react";

import ContentTitle from "../../../header/ContentTitle";
import Sidebar from "../ClassSidebar";
import Content from "./Content"

export default function SchoolPosts() {
	return (
		<>
			<ContentTitle header="All Thoughts" sortList={["Hot", "Top", "New"]} />
			<div className="hub_column_layout">
				<Content />
				<Sidebar current="thoughts" />
			</div>
		</>
	);
}
