import React from "react";

import { CardSearch, CardCreate } from "../../cards/CenterCards";
import HubPostSystem from "../../systems/HubPostSystem";

export default function SchoolPosts(props) {
	return (
		<HubPostSystem
			contentTitle="Recent Notes"
			hubPostQuery={props.hubRef.where("category", "==", "Notes")}
			hideCategory
			{...props}
		>
			<CardSearch placeholder="Search Popular Posts" />
			<CardCreate
				title="Create Post"
				placeholder="Ask questions, share information, or start a discussion!"
				createPlaceholder="Post Title"
				postRef={props.hubRef}
				category={["Question", "Resource", "Other"]}
			/>
		</HubPostSystem>
	);
}
