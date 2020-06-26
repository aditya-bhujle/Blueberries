import React from "react";

import ContentTitle from "../../../header/ContentTitle";
import Content from "./Content"

export default function SchoolPosts({sidebar, schoolRef}) {
	return (
		<>
			<ContentTitle header="All Classes"/>
			<div className="hub_column_layout">
				<Content schoolRef = {schoolRef} />
				{sidebar}
			</div>
		</>
	);
}
