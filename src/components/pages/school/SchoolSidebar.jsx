import React from "react";

import {
	CardPreviewInfo,
	CardPreviewList,
	CardPreviewListSkeleton,
} from "../../cards/PreviewCards";
import { useLocation, useParams } from "react-router-dom";

export default function SchoolSidebar({
	schoolInfo,
	schoolLoading,
	previewInfo,
	previewLoading,
}) {
	const currentPath = useLocation();
	const currentParams = useParams();

	const current = currentPath.pathname.replace(
		"/schools/" + currentParams.schoolId,
		""
	);

	return (
		<div className="hub_column_right">
			<CardPreviewInfo
				title={`Explore ${schoolInfo.short}`}
				members={schoolInfo.members}
				description={schoolInfo.description || true}
				loading={schoolLoading}
			/>

			{current !== "/majors" &&
				(previewLoading ? (
					<CardPreviewListSkeleton
						title="Join Major"
						link="See All Majors"
						isDouble
					/>
				) : (
					<CardPreviewList
						title="Join Majors"
						elements={previewInfo.majors.map((major) => ({
							header: major.data().name,
							content: `${major.data().members} Students`,
							link: `/schools/${currentParams.schoolId}/majors/${major.id}`,
						}))}
						link="See All Majors"
						isDouble
					/>
				))}

			{current !== "/classes" &&
				(previewLoading ? (
					<CardPreviewListSkeleton
						title="Join Classes"
						link="See All Classes"
					/>
				) : (
					<CardPreviewList
						title="Join Classes"
						elements={previewInfo.classes.map((schoolClass) => ({
							header: schoolClass.data().name,
							content: `${schoolClass.data().short} ⋅ ${
								schoolClass.data().members
							} Students`,
							link: `/schools/${currentParams.schoolId}/classes/${schoolClass.id}`,
						}))}
						link="See All Classes"
					/>
				))}
			{/*
			{current !== "/clubs" &&
				(previewLoading ? (
					<CardPreviewListSkeleton title="Join Clubs" link="See All Clubs" />
				) : (
					<CardPreviewList
						title="Join Clubs"
						elements={previewInfo.clubs.map((club) => ({
							header: club.data().name,
							content: `${club.data().short} ⋅ ${club.data().members} Students`,
						}))}
						link="See All Clubs"
					/>
				))}

			{current !== "/events" &&
				(previewLoading ? (
					<CardPreviewListSkeleton
						title="Upcoming Events"
						link="See All Events"
					/>
				) : (
					<CardPreviewList
						title="Upcoming Events"
						elements={previewInfo.events.map((event) => ({
							header: event.data().name,
							content: `${event.data().short} ⋅ ${
								event.data().members
							} Students`,
						}))}
						link="See All Events"
					/>
				))}

			{current !== "/chats" &&
				(previewLoading ? (
					<CardPreviewListSkeleton title="Public Chats" link="See All Chats" />
				) : (
					<CardPreviewList
						title="Public Chats"
						elements={previewInfo.chats.map((chat) => ({
							header: chat.data().name,
							content: `${chat.data().short} ⋅ ${chat.data().members} Students`,
						}))}
						link="See All Chats"
					/>
				))}*/}
		</div>
	);
}
