import React from "react";

import { CardCreate } from "../../cards/CenterCards";
import HubPostSystem from "../../systems/HubPostSystem";

export default function SchoolPosts(props) {
	return (
		<HubPostSystem
			contentTitle="Recent Notes"
			hubPostQuery={props.hubRef.where("category", "==", "Notes")}
			hubRef={props.hubRef}
			hideCategory
			notes
			searchPlaceholder="Search Notes"
			{...props}
		>
			<CardCreate
				title="Share Notes"
				placeholder="Upload notes to share with this class!"
				createPlaceholder="Unit Number - Unit Name"
				postRef={props.hubRef}
			/>
		</HubPostSystem>
	);
}
