import React from "react";

import {
	CardPreviewInfo,
	CardPreviewList,
	CardPreviewReview,
} from "../../cards/PreviewCards";

export default function ClassPreview({ current, avgReviews, reviewsLoading }) {
	return (
		<div className="hub_column_right">
			<CardPreviewInfo
				title="Data Structures and Algorithms"
				subtitle="Professor Bruce Long"
				members={72}
			/>

			{current !== "reviews" && (
				<CardPreviewReview
					title="Professor Bruce Long"
					{...avgReviews}
					loading={reviewsLoading}
				/>
			)}

			{current !== "chat" && (
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
			)}

			{current !== "calendar" && (
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

			{current !== "posts" && (
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
