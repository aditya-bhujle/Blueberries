import React from "react";

import ContentTitle from "../../../header/ContentTitle";
import Sidebar from "../Sidebar";
import Content from "./Content"

export default function SchoolPosts() {
	return (
		<>
			<ContentTitle header="Overview for Professor Long" subtitle="13 Reviews"/>
			<div className="hub_column_layout">
				<Content />
				<Sidebar />
			</div>
		</>
	);
}
