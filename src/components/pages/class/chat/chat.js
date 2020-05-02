import React from "react";

import ContentTitle from "../../../header/ContentTitle";
import ChatPreview from "../../../chat/ChatPreview"
import Content from "./Content"

export default function SchoolPosts() {
	return (
		<>
			<ContentTitle header="Your Feed" sortList={["Hot", "Top", "New"]} />
			<div className="hub_column_layout">
				<Content />
				<ChatPreview />
			</div>
		</>
	);
}
