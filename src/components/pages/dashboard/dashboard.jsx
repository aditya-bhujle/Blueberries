import React, { useContext } from "react";

import Section from "../../Section";
import Sidebar from "./Sidebar";
import { UserContext } from "../../../App";
import { db } from "../../../firebase/config";
import HubPostSystem from "../../systems/HubPostSystem";
import { CardCreate } from "../../cards/CenterCards";

export default function DashboardHub() {
	const userInfo = useContext(UserContext);
	const dashboardRef = db
		.collection("schools")
		.doc("bjqzPlSzvQZUivxCAFIY")
		.collection("classes")
		.doc("tMDQlZ37elhZdqWK7HTq")
		.collection("posts");

	const createProps = {
		title: "Create Post",
		placeholder: "Ask questions, share information, or start a discussion!",
		createPlaceholder: "Post Title",
		category: ["Question", "Resource", "Other"],
	};
	return (
		<Section>
			<HubPostSystem
				contentTitle="Your Feed"
				hubRef={dashboardRef}
				sidebar={<Sidebar userInfo={userInfo} />}
				create={createProps}
			/>
		</Section>
	);
}
