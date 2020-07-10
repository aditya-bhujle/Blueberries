import React, { useEffect } from "react";

import ChatPreview from "../../../chat/ChatPreview";
import Content from "./Content";

export default function ClassChat(props) {
	useEffect(() => {
		const rootElement = document.getElementById("root");

		rootElement.classList.add("content_container");

		return () => rootElement.classList.remove("content_container");
	}, []);

	return (
		<div className="hub_column_layout">
			<Content {...props} />
			<ChatPreview />
		</div>
	);
}
