import React from "react";

import { CardCreate } from "../../cards/CenterCards";
import HubPostSystem from "../../systems/HubPostSystem";

export default function ClassPosts(props) {
	return (
		<HubPostSystem {...props}>
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
