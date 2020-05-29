import React from "react";

import ContentTitle from "../../../header/ContentTitle";
import CreateThought from "./CreateThought";
import HubPost from "../../../systems/HubPosts";

export default function SchoolPosts({ sidebar, classRef, classInfo }) {
	return (
		<>
			<ContentTitle header="All Thoughts" sortList={["Hot", "Top", "New"]} />
			<div className="hub_column_layout">
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
					<CreateThought
						title="Create a Thought!"
						placeholder="Type your thought"
						createPlaceholder="Thought"
						postRef={classRef}
					/>
					<HubPost
						postRef={classRef}
						query={classRef.where("category", "==", "Thoughts")}
						info={classInfo}
					/>
				</div>
				{sidebar}
			</div>
		</>
	);
}
