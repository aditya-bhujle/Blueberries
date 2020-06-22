import React from "react";

import HubPostSystem from "../../systems/HubPostSystem";

export default function SchoolPosts(props) {
	const createProps = {
		title: "Share Notes",
		placeholder: "Upload notes to share with this class!",
		createPlaceholder: "Unit Number - Unit Name",
		notes: true,
	};
	return (
		<HubPostSystem
			contentTitle="Recent Notes"
			hubPostQuery={props.hubRef.where("category", "==", "Notes")}
			hideCategory
			searchPlaceholder="Search Notes"
			create={createProps}
			{...props}
		/>
	);
}
