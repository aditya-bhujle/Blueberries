import React from "react";

import CreateThought from "./CreateThought";
import HubPostSystem from "../../../systems/HubPostSystem";

export default function SchoolPosts(props) {
	return (
		<HubPostSystem
			contentTitle="All Thoughts"
			hubPostQuery={props.hubRef.where("category", "==", "Thoughts")}
			hideCategory
			thoughts
			{...props}
		>
			<div className="hub_card">
				<h3 className="hub_create_title">What are Thoughts?</h3>
				<p className="hub_card_description">
					Thoughts are posts that are up to 200 characters long. They can be
					comments, observations, or whatever else you want to post!
					<br />‍<br />
					After 24 hours they are permanently deleted.
				</p>
			</div>
			<CreateThought
				title="Create a Thought!"
				placeholder="Type your thought"
				createPlaceholder="Thought"
				postRef={props.hubRef}
			/>
		</HubPostSystem>
	);
}
