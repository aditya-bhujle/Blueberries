import React from "react";
import { CardSearch } from "../../../cards/CenterCards";
import { CardPreviewList } from "../../../cards/PreviewCards";

export default function SchoolMajorsContent() {
	return (
		<div className="hub_content">
			<p>
				Can't find your major? <a>Add it here.</a>
			</p>
			<CardSearch placeholder="Search All Majors" />
			<CardPreviewList
				isDouble
				elements={[
					{ header: "Psychology", content: "24 Students" },
					{ header: "Psychology", content: "24 Students" },
					{ header: "Psychology", content: "24 Students" },
					{ header: "Psychology", content: "24 Students" },
					{ header: "Psychology", content: "24 Students" },
					{ header: "Psychology", content: "24 Students" },
				]}
			/>
		</div>
	);
}
