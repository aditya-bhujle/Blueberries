import React, { useEffect, useState } from "react";

import {
	CardPreviewInfo,
	CardPreviewList,
	CardPreviewListSkeleton,
} from "../../cards/PreviewCards";
import { useLocation, useParams } from "react-router-dom";

export default function SchoolSidebar({
	schoolInfo,
	schoolLoading,
	schoolRef,
}) {
	const [previewInfo, setPreviewInfo] = useState({});

	const [loading, setLoading] = useState(true);

	const currentPath = useLocation();
	const currentParams = useParams();

	const current = currentPath.pathname.replace(
		"/school/" + currentParams.schoolId,
		""
	);

	useEffect(() => {
		const fetchData = async () => {
			try {
				let fetchClasses = await schoolRef
					.collection("classes")
					.orderBy("members", "desc")
					.limit(3)
					.get();

				let fetchMajors = await schoolRef
					.collection("majors")
					.orderBy("members", "desc")
					.limit(6)
					.get();

				let fetchClubs = await schoolRef
					.collection("clubs")
					.orderBy("members", "desc")
					.limit(3)
					.get();

				let fetchEvents = await schoolRef
					.collection("events")
					.orderBy("members", "desc")
					.limit(3)
					.get();

				let fetchChats = await schoolRef
					.collection("events")
					.orderBy("members", "desc")
					.limit(3)
					.get();

				setPreviewInfo({
					classes: fetchClasses.docs,
					majors: fetchMajors.docs,
					clubs: fetchClubs.docs,
					events: fetchEvents.docs,
					chats: fetchChats.docs,
				});
			} catch (error) {
				console.error(error);
			}

			setLoading(false);
		};

		fetchData();
	}, []);

	return (
		<div className="hub_column_right">
			<CardPreviewInfo
				title={`Explore ${schoolInfo.short}`}
				members={schoolInfo.members}
				description={schoolInfo.description || true}
				loading={schoolLoading}
			/>

			{current !== "/majors" &&
				(loading ? (
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
						}))}
						link="See All Majors"
						isDouble
					/>
				))}

			{current !== "/classes" &&
				(loading ? (
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
						}))}
						link="See All Classes"
					/>
				))}

			{current !== "/clubs" &&
				(loading ? (
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
				(loading ? (
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
				(loading ? (
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
				))}
		</div>
	);
}
