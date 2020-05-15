import React, { useContext } from "react";

import ContentTitle from "../../header/ContentTitle";
import Section from "../../Section";
import Sidebar from "./Sidebar";
import { UserContext } from "../../../App";
import HubPost from "../../systems/HubPosts";
import { db } from "../../../firebase/config";

export default function DashboardHub() {
	const userInfo = useContext(UserContext);
	return (
		<Section>
			<ContentTitle header="Your Feed" sortList={["Hot", "Top", "New"]} />
			<div className="hub_column_layout">
				<HubPost
					postRef={db
						.collection("schools")
						.doc("bjqzPlSzvQZUivxCAFIY")
						.collection("classes")
						.doc("tMDQlZ37elhZdqWK7HTq")
						.collection("posts")}
				/>
				<Sidebar userInfo={userInfo} />
			</div>
		</Section>
	);
}
