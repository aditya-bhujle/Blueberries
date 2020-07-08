import React from "react";
import { CardPreviewList } from "../../cards/PreviewCards";
import PreviewHub from "../../cards/PreviewHub";

export default function DashboardSidebar({ userInfo }) {
	if (userInfo && !userInfo.school.id) return null;

	return (
		<div className="hub_column_right">
			{userInfo && (
				<PreviewHub
					title={userInfo.school.name}
					subtitle={userInfo.classes.length > 0 ? "Your Classes" : false}
					elements={userInfo.classes.map((userClass) => ({
						header: userClass.name,
						content: [
							`${userClass.short} ⋅ `,
							<span className="main_color" key="professor">
								{`Professor ${userClass.last_name}`}
							</span>,
						],
						link: `/schools/${userInfo.school.id}/classes/${userClass.id}`,
					}))}
					button={{
						content:
							userInfo.classes.length > 0
								? "Add More Classes"
								: "Add Your Classes",
						link: `/schools/${userInfo.school.id}/classes`,
					}}
					loading={!userInfo}
				/>
			)}

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
