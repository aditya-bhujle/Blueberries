import React from "react";
import { CardPreviewInfo, CardPreviewPictures, CardPreviewList } from "../../cards/PreviewCards";

export default function ChatPreview() {
	return (
		<>
			<CardPreviewInfo
				title="Data Structures and Algorithms"
				subtitle="Professor Bruce Long"
				members={72}
			/>
			<CardPreviewPictures
				title="Professor Long's Group Chat"
				subtitle="Shared Photos"
				pictures={["hi", "hi"]}
				link="View More"
			/>
			<CardPreviewList
				title="Recent Polls"
				elements={[
					{
						header: "Crown or Sovi?",
						right: "2 Days Ago",
						content: "Ends in an hour ⋅ 12 votes",
					},
					{
						header: "Crown or Sovi?",
						right: "2 Days Ago",
						content: "Ends in an hour ⋅ 12 votes",
					},
					{
						header: "Crown or Sovi?",
						right: "2 Days Ago",
						content: "Ends in an hour ⋅ 12 votes",
					},
				]}
			/>
			<CardPreviewList
				title="Most Liked"
				elements={[
					{
						header: "Like if your online classes are 10x worse.",
						content: "Destroyer ⋅ 142 likes",
					},
					{
						header: "I legit might have corona lmao",
						content: "TestName2 ⋅ 40 likes",
					},
					{
						header: "I think I might fail this class...",
						content: "TestName1 ⋅ 4 likes",
					},
				]}
			/>
			<CardPreviewList
				title="Shared Files"
				elements={[
					{
						header: "Class Syllabus",
						right: "2 Hours Ago",
						content: "Anonymous ⋅ 3 files",
					},
				]}
			/>
			<CardPreviewList
				title="Upcoming Events"
				elements={[
					{
						header: "Graduation Ceremony",
						right: "In 3 Weeks",
						content: "TestNam2 ⋅ 2 Likes",
					},
				]}
			/>
		</>
	);
}
