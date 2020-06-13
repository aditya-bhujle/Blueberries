import React, { useContext } from "react";

import Section from "../../Section";
import Sidebar from "./Sidebar";
import { UserContext } from "../../../App";
import { db } from "../../../firebase/config";
import HubPostSystem from "../../systems/HubPostSystem";
import { CardSearch, CardCreate } from "../../cards/CenterCards";

export default function DashboardHub() {
	const userInfo = useContext(UserContext);
	const dashboardRef = db
		.collection("schools")
		.doc("bjqzPlSzvQZUivxCAFIY")
		.collection("classes")
		.doc("tMDQlZ37elhZdqWK7HTq")
		.collection("posts");

	return (
		<Section>
			<HubPostSystem
				contentTitle="Your Feed"
				hubRef={dashboardRef}
				sidebar={<Sidebar userInfo={userInfo} />}
			>
				<CardSearch placeholder="Search Popular Posts" />
				<CardCreate
					title="Create Post"
					placeholder="Ask questions, share information, or start a discussion!"
					createPlaceholder="Post Title"
					postRef={dashboardRef}
				/>
			</HubPostSystem>
		</Section>
	);
}
