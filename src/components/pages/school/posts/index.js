import React from "react";

import ContentTitle from "../../../header/ContentTitle";
import Sidebar from "../Sidebar";
import Content from "./Content";
import HubPost from "../../../systems/HubPosts";
import { db } from "../../../../firebase/config";

export default function SchoolPosts({ schoolId }) {
	console.log(schoolId);
	return (
		<>
			<ContentTitle header="Popular Posts" sortList={["Hot", "Top", "New"]} />
			<div className="hub_column_layout">
				<HubPost
					postRef={db.collection("schools").doc(schoolId).collection("posts")}
				/>
				<Sidebar />
			</div>
		</>
	);
}
