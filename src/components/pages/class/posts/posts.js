import React from "react";

import ContentTitle from "../../../header/ContentTitle";
import Sidebar from "../ClassSidebar";
import Content from "./Content";
import HubPost from "../../../systems/HubPosts";

export default function SchoolPosts({ sidebar, classRef }) {
	return (
		<>
			<ContentTitle header="Popular Posts" sortList={["Hot", "Top", "New"]} />
			<div className="hub_column_layout">
				<HubPost postRef={classRef} />
				{sidebar}
			</div>
		</>
	);
}
