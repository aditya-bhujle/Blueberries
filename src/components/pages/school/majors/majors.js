import React from "react";

import ContentTitle from "../../../header/ContentTitle";
import Content from "./Content";

export default function SchoolPosts({ sidebar, schoolRef }) {
	return (
		<>
			<ContentTitle header="Your Feed" sortList={["Hot", "Top", "New"]} />
			<div className="hub_column_layout">
				<Content schoolRef={schoolRef} />
				{sidebar}
			</div>
		</>
	);
}
