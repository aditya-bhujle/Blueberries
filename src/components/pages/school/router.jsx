import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { db } from "../../../firebase/config";

import Header from "../../header/Header";
import PageNav from "../../header/PageNav";
import Section from "../../Section";

import Posts from "./posts/index";
import Majors from "./majors/majors";
import Classes from "./classes/classes";
import Clubs from "./clubs/clubs";
import Events from "./events/events";
import Chats from "./chats/chats";

export default function SchoolRouter({ match }) {
	let { schoolId } = match.params;
	const schoolRef = db.collection("schools").doc(schoolId);

	const [schoolInfo, setSchoolInfo] = useState({});

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				let fetchInfo = await schoolRef.get();
				console.log("School info fetched!");

				setSchoolInfo(fetchInfo.data());
			} catch (error) {
				console.error(error);
			}

			setLoading(false);
		};

		fetchData();
	}, [match.url]);

	return (
		<Router>
			<Section>
				<Header
					name={schoolInfo.name}
					short={schoolInfo.short}
					loading={loading}
				/>
				<PageNav type="school" baseLink={match.url} />
				<div className="line" />
				<Switch>
					<Route
						exact
						path={`${match.path}`}
						render={(props) => <Posts {...props} schoolId={schoolId} />}
					/>
					<Route exact path={`${match.path}/majors`} component={Majors} />
					<Route exact path={`${match.path}/classes`} component={Classes} />
					<Route exact path={`${match.path}/clubs`} component={Clubs} />
					<Route exact path={`${match.path}/events`} component={Events} />
					<Route exact path={`${match.path}/chats`} component={Chats} />
				</Switch>
			</Section>
		</Router>
	);
}
