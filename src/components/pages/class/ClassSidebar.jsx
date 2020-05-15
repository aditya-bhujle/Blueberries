import React from "react";

import {
	CardPreviewInfo,
	CardPreviewList,
	CardPreviewReview,
} from "../../cards/PreviewCards";
import { useLocation, useParams } from "react-router-dom";

export default function ClassSidebar({ classInfo, classLoading }) {
	const currentPath = useLocation();
	const currentParams = useParams();

	const current = currentPath.pathname.replace(
		"/school/" + currentParams.schoolId + "/class/" + currentParams.classId,
		""
	);

	if (current === "/chat") return null;

	return (
		<div className="hub_column_right">
			<CardPreviewInfo
				title={classInfo.name}
				subtitle={`Professor ${classInfo.professor_first} ${classInfo.professor_last}`}
				members={classInfo.members}
				loading={classLoading}
			/>

			{current !== "/reviews" && (
				<CardPreviewReview
					title="Professor Bruce Long"
					{...classInfo.reviews}
					loading={classLoading}
					titleLoading
				/>
			)}

			<CardPreviewList
				title="Chat"
				elements={[
					{
						header: "You Have 2 Unread Messages",
						right: "Now",
					},
					{
						header: "Someone Mentioned You",
						right: "2 Days Ago",
						content: "ITSC 2214 Group Chat",
					},
				]}
				link="Open Group Chat"
			/>

			{current !== "/calendar" && (
				<CardPreviewList
					title="Upcoming Activity"
					elements={[
						{
							header: "Unit 2 Test",
							right: "In 2 Days",
							content: "Test ⋅ Open Notes",
						},
						{
							header: "Zybooks Due",
							right: "In 1 Week",
							content: "Assignment",
						},
					]}
					link="Open Calendar"
				/>
			)}

			{current !== "" && (
				<CardPreviewList
					title="Hot Posts"
					elements={[
						{
							header: "Taking this class with Logic and Algorithms?",
							right: "Yesterday",
							content: [
								<strong className="list_category red" key="red">
									Not In Class
								</strong>,
								" ⋅ Anonymous ⋅ 4 replies",
							],
						},
						{
							header: "Who else has Assignment 3 pushed back",
							right: "Yesterday",
							content: [
								<strong className="list_category" key="blue">
									Hub
								</strong>,
								" ⋅ Anonymous ⋅ 4 replies",
							],
						},
					]}
				/>
			)}
		</div>
	);
}
