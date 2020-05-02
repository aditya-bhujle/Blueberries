import React from "react";
import { CardPreviewList } from "../../cards/PreviewCards";

export default function DashboardContent() {
	return (
		<div className="hub_column_right">
			<CardPreviewList
				title="University of North Carolina at Charlotte"
				subtitle="Your Classes"
				elements={[
					{
						header: "Data Structures and Algorithms",
						content: [
							"ITSC 2214 ⋅ ",
							<span className="main_color" key="professor">
								Professor Long
							</span>,
						],
					},
					{
						header: "Logic and Algorithms",
						content: [
							"ITSC 2175 ⋅ ",
							<span className="main_color" key="professor">
								Professor Aksut
							</span>,
						],
					},
				]}
				bot_padding
			>
				<button className="button no_margin w-button">Add More Classes</button>
			</CardPreviewList>
			<CardPreviewList
				title="Upcoming UNCC Events"
				elements={[
					{
						header: "Graduation Ceremony",
						right: "In 3 Weeks",
						content: "Clubs ⋅ Athletics",
					},
				]}
				link="See All Events"
			/>
			<CardPreviewList
				title="Upcoming Chat Events"
				elements={[
					{
						header: [
							<strong className="list_category" key="source">
								ITSC 2214
							</strong>,
							" - Study Session",
						],
						right: "In 3 Weeks",
						content: "TestName2 ⋅ Library",
					},
				]}
			/>
			<CardPreviewList
				title="Your Upcoming Activities"
				elements={[
					{
						header: [
							<strong className="list_category" key="source">
								ITSC 2214
							</strong>,
							" - Unit Test 2",
						],
						right: "In 2 Days",
						content: "Test ⋅ Open Notes",
					},
					{
						header: [
							<strong className="list_category" key="source">
								ITSC 2175
							</strong>,
							" - Zybooks Due",
						],
						right: "In 1 Week",
						content: "Assignment",
					},
					{
						header: [
							<strong className="list_category" key="source">
								ACCT 2122
							</strong>,
							" - Final Exam",
						],
						right: "In 1 Week",
						content: "Test ⋅ Last day of school",
					},
				]}
			/>
			<CardPreviewList
				title="Hot Posts"
				elements={[
					{
						header: "Taking this class with Logic and Algorithms?",
						right: "Yesterday",
						content: [
							<strong className="list_category" key="source">
								ITSC 2214
							</strong>,
							" ⋅ Anonymous ⋅ 4 replies",
						],
					},
					{
						header: "Who else has Assignment 3 pushed back",
						right: "Yesterday",
						content: [
							<strong className="list_category" key="source">
								ITSC 2175
							</strong>,
							" ⋅ Anonymous ⋅ 4 replies",
						],
					},
				]}
			/>
		</div>
	);
}
