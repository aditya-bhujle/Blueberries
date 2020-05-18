import React from "react";

import ContentTitle from "../../../header/ContentTitle";
import Content from "./Content";

export default function SchoolPosts({ sidebar, classRef }) {
	return (
		<>
			<ContentTitle header="Recent Notes" sortList={["Hot", "Top", "New"]} />
			<div className="hub_column_layout">
				<Content classRef = {classRef}/>
				{sidebar}
			</div>
		</>
	);
}
