import React from "react";

import ContentTitle from "../../../header/ContentTitle";
import Content from "./Content";

export default function SchoolPosts({
	classInfo,
	classRef,
	reviewsLoading,
	sidebar,
}) {
	const numReviews = classInfo.reviews && classInfo.reviews.counter;
	return (
		<>
			{Object.keys(classInfo).length > 0 && (
				<ContentTitle
					header={`Overview for Professor ${classInfo.last_name}`}
					subtitle={numReviews + " Review" + (numReviews === 1 ? "" : "s")}
				/>
			)}
			<div className="hub_column_layout">
				<Content
					classRef={classRef}
					reviewsLoading={reviewsLoading}
					avgReviews={classInfo.reviews}
				/>
				{sidebar}
			</div>
		</>
	);
}
