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
		"/schools/" + currentParams.schoolId + "/classes/" + currentParams.classId,
		""
	);

	if (current === "/chat") return null;

	return (
		<div className="hub_column_right">
			<CardPreviewInfo
				title={classInfo.name}
				subtitle={
					classInfo.last_name ? `Professor ${classInfo.last_name}` : "Hub"
				}
				members={classInfo.members}
				loading={classLoading}
				teacherLink={classInfo.last_name}
			/>

			{current !== "/reviews" && classInfo.reviews && (
				<CardPreviewReview
					title="Professor Bruce Long"
					{...classInfo.reviews}
					loading={classLoading}
					titleLoading
				/>
			)}

			{classInfo.teachers && (
				<CardPreviewList
					title="Select Your Professor"
					elements={classInfo.teachers.map((teacher) => ({
						header: `Professor ${teacher.first_name} ${teacher.last_name}`,
						right:
							Math.round(
								(teacher.rating.overall / teacher.rating.counter) * 100
							) /
								100 +
							" / 5",
						content: `${teacher.members} Students`,
						link: `/schools/${currentParams.schoolId}/classes/${currentParams.classId}/teachers/${teacher.id}`,
					}))}
					link="Add New Professor"
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
