import React from "react";

import { CardPreviewInfo, CardPreviewList } from "../../cards/PreviewCards";
import { useLocation, useParams } from "react-router-dom";

export default function SchoolSidebar({ schoolInfo, schoolLoading }) {
	const currentPath = useLocation();
	const currentParams = useParams();

	const current = currentPath.pathname.replace(
		"/school/" + currentParams.schoolId,
		""
	);

	console.log(current);

	return (
		<div className="hub_column_right">
			<CardPreviewInfo
				title={`Explore ${schoolInfo.short}`}
				members={schoolInfo.members}
				description={schoolInfo.description || true}
				loading={schoolLoading}
			/>
			{current !== "/majors" && (
				<CardPreviewList
					title="Join Major"
					elements={[
						{ header: "Accounting", content: "240 Students" },
						{ header: "Computer Science", content: "212 Students" },
						{ header: "Pre-Med", content: "112 Students" },
						{ header: "Computer Engineering", content: "54 Students" },
						{ header: "Electrical Engineering", content: "45 Students" },
						{ header: "Nursing", content: "31 Students" },
					]}
					link="See All Majors"
					isDouble
				/>
			)}

			{current !== "/classes" && (
				<CardPreviewList
					title="Join Classes"
					elements={[
						{ header: "Data Structures", content: "ITSC 2214 ⋅ 24 Students" },
						{
							header: "Logic and Algorithms",
							content: "ITSC 2175 ⋅ 46 Students",
						},
						{
							header: "Introduction to Computer Science II",
							content: "ITSC 1213 ⋅ 24 Students",
						},
					]}
					link="See All Classes"
				/>
			)}

			{current !== "/clubs" && (
				<CardPreviewList
					title="Join Clubs"
					elements={[
						{
							header: "Charlotte Hacks",
							content: "Computer Science ⋅ 24 Students",
						},
						{
							header: "Association for Computing Machinery",
							content: "Computer Science ⋅ 46 Students",
						},
					]}
					link="See All Clubs"
				/>
			)}

			{current !== "/events" && (
				<CardPreviewList
					title="Upcoming Events"
					elements={[
						{
							header: "Badminton Club Interest Meeting",
							content: "Clubs ⋅ Athletics",
							right: "In 2 Days",
						},
					]}
					link="See All Events"
				/>
			)}

			{current !== "/chats" && (
				<CardPreviewList
					title="Public Chats"
					elements={[
						{
							header: "Witherspoon Residence Hall",
							content: "49 Students",
						},
					]}
					link="See All Chats"
				/>
			)}
		</div>
	);
}
