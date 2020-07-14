import React from "react";

import {
	CardPreviewInfo,
	CardPreviewList,
	CardPreviewReview,
} from "../../cards/PreviewCards";
import { useLocation, useParams } from "react-router-dom";
import Timeago from "react-timeago";

export default function ClassSidebar({
	classInfo,
	messagePreview,
	classLoading,
}) {
	const currentPath = useLocation();
	const currentParams = useParams();

	const regInfo = /\w+$/.exec(currentPath.pathname);
	const current = regInfo ? regInfo[0] : null;

	//if (current === "/chat") return null;

	const classURL =
		`/schools/${currentParams.schoolId}/classes/${currentParams.classId}` +
		(currentParams.teacherId ? `/teachers/${currentParams.teacherId}` : "");

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

			{current !== "reviews" && classInfo.reviews && (
				<CardPreviewReview
					title="Professor Bruce Long"
					{...classInfo.reviews}
					loading={classLoading}
					classURL={classURL}
					titleLoading
				/>
			)}

			{classInfo.teachers && (
				<CardPreviewList
					title="Select Your Professor"
					elements={Object.keys(classInfo.teachers).map((teacher_id) => {
						const { first_name, last_name, members } = classInfo.teachers[
							teacher_id
						];
						return {
							header: `Professor ${first_name} ${last_name}`,
							content: `${members} Students`,
							link: `${classURL}/teachers/${teacher_id}`,
						};
					})}
					link={{ name: "Add New Professor", pathname: "/comingsoon" }}
				/>
			)}

			{current !== "chat" && !classLoading && (
				<CardPreviewList
					title="Chat"
					elements={messagePreview.map((message) => {
						const { content, date_posted, user } = message.data();
						return {
							header: content,
							right: <Timeago date={date_posted.toDate()} />,
							content: user,
							link: `${classURL}/chat`,
						};
					})}
					link={{
						name: "Open Group Chat",
						pathname: `${classURL}/chat`,
					}}
				/>
			)}
		</div>
	);
}
