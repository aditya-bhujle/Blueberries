import React from "react";
import { CardCreate } from "../../../cards/CenterCards";

export default function SchoolMajorsContent() {
	function ActionLinks(links) {
		return links.map((text) => (
			<div href="#" className="action_div post" key={text}>
				<strong>{text}</strong>
			</div>
		));
	}

	return (
		<div className="hub_content">
			<div className="hub_card">
				<h3 className="hub_create_title">What are Thoughts?</h3>
				<p className="hub_card_description">
					Thoughts are posts that are up to 200 characters long. They can be
					comments, observations, or whatever else you want to post!
					<br />‍<br />
					After 24 hours they are permanently deleted.
				</p>
			</div>
			<CardCreate
				title="Create a Thought!"
				placeholder="Type your thought"
				createPlaceholder="Thought"
			/>
			<div className="hub_card">
				<div className="hub_post_details">
					Anonymous ⋅ Yesterday ⋅ 4 replies
				</div>
				<h3>
					Even if these concepts are super important to us, we're going to
					forget them 2 weeks after the final.
				</h3>
				<div className="hub_card_line" />
				<div className="hub_card_links multiple post">
					<div>{ActionLinks(["Like ⋅ 3", "Dislike ⋅ 2", "Comment ⋅ 5"])}</div>
					<div>{ActionLinks(["Share", "Report"])}</div>
				</div>
			</div>
		</div>
	);
}
