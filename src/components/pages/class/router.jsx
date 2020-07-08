import React, { useEffect, useState } from "react";
import { db } from "../../../firebase/config";
import { Switch, Route, Redirect } from "react-router-dom";

import PageNav from "../../header/PageNav";
import Section from "../../Section";

import Sidebar from "./ClassSidebar";

import Posts from "./posts";
import Chat from "./chat/chat";
import Notes from "./notes";
import Calendar from "./calendar/calendar";
import Thoughts from "./thoughts/thoughts";
import Reviews from "./reviews/reviews";
import ClassHeader from "../../header/ClassHeader";
import SinglePostModal from "../post/SinglePostModal";
import NotFoundSection from "../WarningPage/HubNotFound";

export default function ClassRouter({ match }) {
	let { schoolId, classId, teacherId } = match.params;

	const classCollection = db
		.collection("schools")
		.doc(schoolId)
		.collection("classes")
		.doc(classId);
	const classRef = teacherId
		? classCollection.collection("teachers").doc(teacherId)
		: classCollection;

	const [classInfo, setClassInfo] = useState({});

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				let fetchInfo = await classRef.get();
				console.log("Class info fetched!");

				if (!fetchInfo.exists) setClassInfo(404);
				else {
					setClassInfo(fetchInfo.data());
				}
			} catch (error) {
				console.error(error);
			}

			setLoading(false);
		};

		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [teacherId]);

	if (classInfo === 404) return <NotFoundSection text="class" />;

	const NewSidebar = <Sidebar classLoading={loading} classInfo={classInfo} />;

	return (
		<Section fullscreen>
			<div
				className="hub_card"
				style={{ borderBottomStyle: "none", flexShrink: 0 }}
			>
				<ClassHeader
					school={{ id: schoolId, short: classInfo.school_short }}
					schoolClass={{
						id: classId,
						name: classInfo.name,
						short: classInfo.short,
						...(classInfo.last_name && {
							teacher: { name: classInfo.last_name, id: teacherId },
						}),
					}}
					loading={loading}
				/>
				<PageNav type="class" baseLink={match.url} />
			</div>
			<Switch>
				<Route
					exact
					path={`${match.path}`}
					render={(props) => (
						<Posts
							{...props}
							hubRef={classRef.collection("posts")}
							sidebar={NewSidebar}
							hubInfo={classInfo}
						/>
					)}
				/>
				<Route
					exact
					path={`${match.path}/posts`}
					render={() => <Redirect to={match.url} />}
				/>

				<Route
					path={`${match.path}/posts/:postId`}
					component={SinglePostModal}
				/>

				<Route
					exact
					path={`${match.path}/chat`}
					render={(props) => (
						<Chat {...props} classRef={classRef.collection("messages")} />
					)}
				/>

				<Route
					exact
					path={`${match.path}/notes`}
					render={(props) => (
						<Notes
							{...props}
							hubRef={classRef.collection("posts")}
							sidebar={NewSidebar}
							hubInfo={classInfo}
						/>
					)}
				/>

				<Route
					exact
					path={`${match.path}/calendar`}
					render={(props) => <Calendar {...props} sidebar={NewSidebar} />}
				/>

				<Route
					exact
					path={`${match.path}/thoughts`}
					render={(props) => (
						<Thoughts
							{...props}
							hubRef={classRef.collection("posts")}
							sidebar={NewSidebar}
							hubInfo={classInfo}
						/>
					)}
				/>

				<Route
					exact
					path={`${match.path}/reviews`}
					render={(props) => (
						<Reviews
							{...props}
							sidebar={NewSidebar}
							classInfo={classInfo}
							reviewsLoading={loading}
							classRef={classRef.collection("reviews")}
						/>
					)}
				/>
			</Switch>
		</Section>
	);
}
