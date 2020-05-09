import React, { useEffect, useState } from "react";
import { db } from "../../../firebase/config";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "../../header/Header";
import PageNav from "../../header/PageNav";
import Section from "../../Section";

import Posts from "./posts/posts";
import Chat from "./chat/chat";
import Notes from "./notes/notes";
import Calendar from "./calendar/calendar";
import Thoughts from "./thoughts/thoughts";
import Reviews from "./reviews/reviews";

export default function ClassRouter({ match, school }) {
	let { schoolId, classId } = match.params;
	const classRef = db
		.collection("schools")
		.doc(schoolId)
		.collection("classes")
		.doc(classId);

	const [classInfo, setClassInfo] = useState({});
	const [avgReviews, setAvgReviews] = useState({});

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				let fetchInfo = await classRef.get();
				console.log("Class info fetched!");

				let {reviews, ...restOfClassInfo} = fetchInfo.data();
				setClassInfo(restOfClassInfo);
				setAvgReviews(reviews);
			} catch (error) {
				console.error(error);
			}

			setLoading(false);
		};

		fetchData();
	}, []);

	return (
		<Router>
			<Section>
				<Header
					name={classInfo.name}
					short={school.short}
					loading={loading || school === "loading"}
					subShort={classInfo.short || true}
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
								avgReviews={avgReviews}
								reviewsLoading={loading}
								classRef={classRef.collection("reviews")}
							/>
						)}
					/>
				</Switch>
			</Section>
		</Router>
	);
}
