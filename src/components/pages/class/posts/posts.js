import React from "react";

import ContentTitle from "../../../header/ContentTitle";
import Sidebar from "../Sidebar";
import Content from "./Content";

export default function SchoolPosts(props) {
	return (
		<>
			<ContentTitle header="Popular Posts" sortList={["Hot", "Top", "New"]} />
			<div className="hub_column_layout">
				<Content {...props} />
				<Sidebar posts />
			</div>
		</>
	);
}
