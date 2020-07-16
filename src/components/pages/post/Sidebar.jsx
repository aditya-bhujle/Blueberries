import React from "react";
import { CardPreviewList, CardPreviewInfo } from "../../cards/PreviewCards";

export default function PostSidebar({ info, close }) {
	return (
		<div className="hub_column_right">
			{info ? (
				<CardPreviewInfo
					title={info.name}
					subtitle={
						info.professor_last
							? `Professor ${info.professor_first} ${info.professor_last}`
							: false
					}
					members={info.members}
					onClick={close}
					linkUrl={!close}
				/>
			) : (
				<CardPreviewInfo loading subtitle />
			)}
		</div>
	);
}
