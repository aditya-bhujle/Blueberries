import React from "react";

import ContentTitle from "../../../header/ContentTitle";
import Sidebar from "../Sidebar";
import Content from "./Content"

export default function SchoolPosts({schoolId}) {
	return (
		<>
			<ContentTitle header="Popular Posts" sortList={["Hot", "Top", "New"]} />
			<div className="hub_column_layout">
				<Content /> {/* Posts subcollection */}
				<Sidebar />
			</div>
		</>
	);
}
