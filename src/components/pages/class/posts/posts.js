import React from "react";

import ContentTitle from "../../../header/ContentTitle";
import { CardSearch, CardCreate } from "../../../cards/CenterCards";
import HubPost from "../../../systems/HubPosts";

export default function SchoolPosts({ sidebar, classRef }) {
	return (
		<>
			<ContentTitle header="Popular Posts" sortList={["Hot", "Top", "New"]} />
			<div className="hub_column_layout">
				<div className="hub_content">
					<CardSearch placeholder="Search Popular Posts" />
					<CardCreate
						title="Create Post"
						placeholder="Ask questions, share information, or start a discussion!"
						createPlaceholder="Post Title"
						postRef={classRef}
					/>
					<HubPost postRef={classRef} />
				</div>
				{sidebar}
			</div>
		</>
	);
}
