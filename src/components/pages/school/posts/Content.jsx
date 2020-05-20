import React from "react";
import { CardSearch, CardCreate } from "../../../cards/CenterCards";
import HubPost from "../../../systems/HubPosts";

export default function SchoolPostContent({ schoolRef }) {
	return (
		<div className="hub_content">
			<CardSearch placeholder="Search Popular Posts" />
			<CardCreate
				title="Create Post"
				placeholder="Ask questions, share information, or start a discussion!"
				createPlaceholder="Post Title"
				postRef={schoolRef}
			/>
			<HubPost postRef={schoolRef} />
		</div>
	);
}
