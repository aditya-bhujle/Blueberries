import React from "react";

import ContentTitle from "../../../header/ContentTitle";
import { CardSearch, CardCreate } from "../../../cards/CenterCards";
import HubPost from "../../../systems/HubPosts";

export default function SchoolPosts({ sidebar, classRef, classInfo }) {
	return (
		<>
			<ContentTitle header="Recent Notes" sortList={["Hot", "Top", "New"]} />
			<div className="hub_column_layout">
				<div className="hub_content">
					<CardSearch placeholder="Search Unit Name or Number" />
					<CardCreate
						title="Upload Notes"
						placeholder="Share your notes with the class!"
						createPlaceholder="Unit Name"
						postRef={classRef}
						notes
					/>
					<HubPost
						postRef={classRef}
						query={classRef.where("category", "==", "Notes")}
						classInfo={classInfo}
					/>
				</div>
				{sidebar}
			</div>
		</>
	);
}
