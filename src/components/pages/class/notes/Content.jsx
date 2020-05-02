import React from "react";
import { CardSearch, CardCreate, CardPost } from "../../../cards/CenterCards";

export default function ClassNotesContent() {
	return (
		<div className="hub_content">
			<CardSearch placeholder="Search Notes" />
			<CardCreate
				title="Upload Notes"
				placeholder="Share your notes with Professor Long's Class!"
				createPlaceholder="Unit Name"
			/>
			<CardPost
				title="Unit 2.1"
				author="Anonymous"
				date_posted="Yesterday"
				likes={3}
				comments={4}
				content="Notes from Thursday's class. Didn't get first slide but it's on Canvas."
			/>
		</div>
	);
}
