import React from "react";
import { CardPreviewInfo } from "../../cards/PreviewCards";

export default function SinglePostSidebar({ info, loading }) {
	return (
		<div className="hub_column_right">
			{loading ? (
				<CardPreviewInfo loading />
			) : (
				<CardPreviewInfo
					title={info.name}
					subtitle={
						info.school_schort &&
						(info.last_name ? `Professor ${info.last_name}` : "Hub")
					}
					members={info.members}
					teacherLink={info.last_name}
					linkUrl
				/>
			)}
		</div>
	);
}
