import React, { useContext } from "react";

import ContentTitle from "../../header/ContentTitle";
import Section from "../../Section";
import Content from "./Content";
import Sidebar from "./Sidebar";
import { UserContext } from "../../../App";

export default function DashboardHub() {
	const userInfo = useContext(UserContext);
	return (
		<Section>
			<ContentTitle header="Your Feed" sortList={["Hot", "Top", "New"]} />
			<div className="hub_column_layout">
				<Content userInfo={userInfo} />
				<Sidebar userInfo={userInfo} />
			</div>
		</Section>
	);
}
