import React from "react";

import ContentTitle from "../../../header/ContentTitle";
import Content from "./Content";

export default function SchoolPosts({ schoolRef, sidebar }) {
	return (
		<>
			<ContentTitle header="Popular Posts" sortList={["Hot", "Top", "New"]} />
			<div className="hub_column_layout">
				<Content schoolRef={schoolRef} />
				{sidebar}
			</div>
		</>
	);
}
