import React from "react";

import ContentTitle from "../../../header/ContentTitle";
import Sidebar from "../ClassSidebar";
import Content from "./Content";
import HubPost from "../../../systems/HubPosts";

export default function SchoolPosts(props) {
	return (
		<>
			<ContentTitle header="Popular Posts" sortList={["Hot", "Top", "New"]} />
			<div className="hub_column_layout">
				<HubPost postRef={props.classRef} />
				<Sidebar
					current="posts"
					classInfo={props.classInfo}
					classLoading={props.classLoading}
				/>
			</div>
		</>
	);
}
