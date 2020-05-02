import React from "react";

import ContentTitle from "../../header/ContentTitle";
import Section from "../../Section";
import Content from "./Content";
import Sidebar from "./Sidebar";

export default function DashboardHub() {
	return (
		<Section>
			<ContentTitle header="Your Feed" sortList={["Hot", "Top", "New"]} />
			<div className="hub_column_layout">
				<Content />
				<Sidebar />
			</div>
		</Section>
	);
}
