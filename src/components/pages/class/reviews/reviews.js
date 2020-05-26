import React from "react";

import ContentTitle from "../../../header/ContentTitle";
import Content from "./Content";

export default function SchoolPosts(props) {
	return (
		<>
			{Object.keys(props.classInfo).length > 0 && (
				<ContentTitle
					header={`Overview for Professor ${props.classInfo.professor_last}`}
					subtitle={
						props.classInfo.reviews.counter === 1
							? `${props.classInfo.reviews.counter} Review`
							: `${props.classInfo.reviews.counter} Reviews`
					}
				/>
			)}
			<div className="hub_column_layout">
				<Content
					classRef={props.classRef}
					reviewsLoading={props.reviewsLoading}
					avgReviews={props.classInfo.reviews}
				/>
				{props.sidebar}
			</div>
		</>
	);
}
