import React from "react";
import { CardPreviewList } from "../../cards/PreviewCards";
import PreviewHub from "../../cards/PreviewHub";

export default function DashboardSidebar({ userInfo }) {
	if (userInfo && !userInfo.school.id) return null;

	return (
		<div className="hub_column_right">
			{userInfo && (
				<PreviewHub
					title={userInfo.school.name}
					subtitle={userInfo.classes.length > 0 ? "Your Classes" : false}
					elements={userInfo.classes.map((userClass) => ({
						header: userClass.name,
						content: [
							`${userClass.short} ⋅ `,
							<span className="main_color" key="professor">
								{`Professor ${userClass.last_name}`}
							</span>,
						],
						link: `/schools/${userInfo.school.id}/classes/${userClass.id}`,
					}))}
					button={{
						content:
							userInfo.classes.length > 0
								? "Add More Classes"
								: "Add Your Classes",
						link: `/schools/${userInfo.school.id}/classes`,
					}}
					loading={!userInfo}
				/>
			)}
		</div>
	);
}
