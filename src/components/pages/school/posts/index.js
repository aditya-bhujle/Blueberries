import React from "react";

import HubPostSystem from "../../../systems/HubPostSystem";

export default function SchoolPosts(props) {
	const createProps = {
		title: "Create Post",
		placeholder: "Ask questions, share information, or start a discussion!",
		createPlaceholder: "Post Title",
	};
	return <HubPostSystem {...props} create={createProps} />;
}
