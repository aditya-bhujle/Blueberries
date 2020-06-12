import React, { useState } from "react";
import HubPost from "./HubPosts";
import ContentTitle from "../header/ContentTitle";

export default function HubPostSystem({
	contentTitle,
	contentList,
	hubRef,
	hubInfo,
	...props
}) {
	const [sortQuery, setSortQuery] = useState({
		title: "New",
		query: "date_posted",
		desc: true,
	});

	return (
		<>
			<ContentTitle
				header={contentTitle || "Popular Posts"}
				sortList={
					contentList || [
						{ title: "Hot", query: "likeCount", desc: true },
						{ title: "Top", query: "likeCount", desc: true },
						{ title: "Disputed", query: "likeCount" },
						{ title: "New", query: "date_posted", desc: true },
						{ title: "Old", query: "date_posted" },
					]
				}
				sortQuery={sortQuery}
				setSortQuery={(query) => setSortQuery(query)}
			/>
			<div className="hub_column_layout">
				<div className="hub_content">
					{props.children}
					<HubPost
						postRef={props.hubPostQuery || hubRef}
						info={hubInfo}
						sortQuery={sortQuery.query}
						sortQueryOrder={sortQuery.desc ? "desc" : "asc"}
						hideCategory={props.hideCategory}
					/>
				</div>
				{props.sidebar}
			</div>
		</>
	);
}
