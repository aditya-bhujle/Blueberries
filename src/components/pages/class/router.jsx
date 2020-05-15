import React, { useEffect, useState } from "react";
import { db } from "../../../firebase/config";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import PageNav from "../../header/PageNav";
import Section from "../../Section";

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

	return (
		<Section>
			<ClassHeader
				school={{ id: schoolId, short: classInfo.school_short }}
				classId={classId}
				name={classInfo.name}
				loading={loading}
				subShort={
					classInfo.short +
						(classInfo.professor_last
							? " Professor " + classInfo.professor_last
							: "") || true
				}
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
							classInfo={classInfo}
							classLoading={loading}
							classRef={classRef.collection("posts")}
						/>
					)}
				/>
				<Route exact path={`${match.path}/chat`} component={Chat} />
				<Route exact path={`${match.path}/notes`} component={Notes} />
				<Route exact path={`${match.path}/calendar`} component={Calendar} />
				<Route exact path={`${match.path}/thoughts`} component={Thoughts} />
				<Route
					exact
					path={`${match.path}/reviews`}
					render={(props) => (
						<Reviews
							{...props}
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
