import React, { useEffect, useState } from "react";
import { db } from "../../../firebase/config";
import { Switch, Route } from "react-router-dom";

import PageNav from "../../header/PageNav";
import Section from "../../Section";

import Sidebar from "./ClassSidebar";

import Posts from "./posts/posts";
import Chat from "./chat/chat";
import Notes from "./notes/notes";
import Calendar from "./calendar/calendar";
import Thoughts from "./thoughts/thoughts";
import Reviews from "./reviews/reviews";
import ClassHeader from "../../header/ClassHeader";

export default function ClassRouter({ match }) {
	let { schoolId, classId } = match.params;
	const classRef = db
		.collection("schools")
		.doc(schoolId)
		.collection("classes")
		.doc(classId);

	const [classInfo, setClassInfo] = useState({});

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				let fetchInfo = await classRef.get();
				console.log("Class info fetched!");

				setClassInfo(fetchInfo.data());
			} catch (error) {
				console.error(error);
			}

			setLoading(false);
		};

		fetchData();
	}, [match.url]);

	const NewSidebar = <Sidebar classLoading={loading} classInfo={classInfo} />;

	return (
		<Section fullscreen>
			<ClassHeader
				school={{ id: schoolId, short: classInfo.school_short }}
				classId={classId}
				name={classInfo.name}
				short={classInfo.short}
				last_name={classInfo.professor_last}
				loading={loading}
			/>
			<PageNav type="class" baseLink={match.url} />
			<div className="line" />
			<Switch>
				<Route
					exact
					path={`${match.path}`}
					render={(props) => (
						<Posts
							{...props}
							classRef={classRef.collection("posts")}
							sidebar={NewSidebar}
							classInfo={classInfo}
						/>
					)}
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
							classRef={classRef.collection("posts")}
							sidebar={NewSidebar}
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
							classRef={classRef.collection("posts")}
							sidebar={NewSidebar}
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
