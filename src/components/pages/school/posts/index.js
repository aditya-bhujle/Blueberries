import React from "react";

import ContentTitle from "../../../header/ContentTitle";
import Sidebar from "../SchoolSidebar";
import Content from "./Content";
import HubPost from "../../../systems/HubPosts";
import { db } from "../../../../firebase/config";

export default function SchoolPosts({ schoolId, sidebar }) {
	return (
		<>
			<ContentTitle header="Popular Posts" sortList={["Hot", "Top", "New"]} />
			<div className="hub_column_layout">
				<HubPost
					postRef={db.collection("schools").doc(schoolId).collection("posts")}
				/>
				{sidebar}
			</div>
		</>
	);
}
