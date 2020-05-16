import React, { useEffect } from "react";

import ContentTitle from "../../../header/ContentTitle";
import ChatPreview from "../../../chat/ChatPreview";
import Content from "./Content";

export default function ClassChat({ classRef }) {
	useEffect(() => {
		const rootElement = document.getElementById("root");

		rootElement.classList.add("content_container");

		return () => rootElement.classList.remove("content_container");
	}, []);

	return (
		<>
			<ContentTitle header="Your Feed" sortList={["Hot", "Top", "New"]} />
			<div className="hub_column_layout">
				<Content classRef={classRef} />
				<ChatPreview />
			</div>
		</>
	);
}
