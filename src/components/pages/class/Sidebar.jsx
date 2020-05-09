import React from "react";

import {
	CardPreviewInfo,
	CardPreviewList,
	CardPreviewReview
} from "../../cards/PreviewCards";

export default function ClassPreview({posts, chat, notes, calendar, thoughts, reviews}) {
	return (
		<div className="hub_column_right">
			<CardPreviewInfo
				title="Data Structures and Algorithms"
				subtitle="Professor Bruce Long"
				members={72}
			/>
			{!reviews && <CardPreviewReview
				title="Professor Bruce Long"
				elements={[
					{ header: "Overall Rating", content: "4.6 / 5" },
					{ header: "Average Difficulty", content: "2.3 / 5" },
					{ header: "Attendance Mandatory", content: "71%" },
					{ header: "Textbook Use", content: "42%" },
				]}
				isDouble
				link={["Add Review", "See All Reviews"]}
				take_again={91}
				quote="An amazingly passionate, enthusiastic teacher!"
				tags={[
					"Gives Good Feedback",
					"Respected",
					"Lots of Homework",
					"Lots of Writing",
					"Test Heavy",
				]}
			/>}
			{!chat && <CardPreviewList
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
			/>}
			{!calendar && <CardPreviewList
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
			/>}
			{!posts && <CardPreviewList
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
			/>}
		</div>
	);
}
