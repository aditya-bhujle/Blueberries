import React, { useContext } from "react";

import ContentTitle from "../../header/ContentTitle";
import Section from "../../Section";
import Sidebar from "./Sidebar";
import { UserContext } from "../../../App";
import { db } from "../../../firebase/config";
import DashboardContent from "./Content";

export default function DashboardHub() {
	const userInfo = useContext(UserContext);
	return (
		<Section>
			<ContentTitle header="Your Feed" sortList={["Hot", "Top", "New"]} />
			<div className="hub_column_layout">
				<DashboardContent
					dashboardRef={db
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
