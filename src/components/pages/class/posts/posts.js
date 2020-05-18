import React from "react";

import ContentTitle from "../../../header/ContentTitle";
import ClassPostContent from "./Content";

export default function SchoolPosts({ sidebar, classRef }) {
	return (
		<>
			<ContentTitle header="Popular Posts" sortList={["Hot", "Top", "New"]} />
			<div className="hub_column_layout">
				<ClassPostContent classRef={classRef} />
				{sidebar}
			</div>
		</>
	);
}
