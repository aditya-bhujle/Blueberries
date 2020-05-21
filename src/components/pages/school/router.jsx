import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { db } from "../../../firebase/config";

import SchoolHeader from "../../header/SchoolHeader";
import PageNav from "../../header/PageNav";
import Section from "../../Section";

import Sidebar from "./SchoolSidebar";

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

	const NewSidebar = (
		<Sidebar
			schoolLoading={loading}
			schoolInfo={schoolInfo}
			schoolRef={schoolRef}
		/>
	);

	return (
		<Section>
			<SchoolHeader
				name={schoolInfo.name}
				short={schoolInfo.short}
				schoolId={schoolId}
				loading={loading}
			/>
			<PageNav type="school" baseLink={match.url} />
			<div className="line" />
			<Switch>
				<Route
					exact
					path={`${match.path}`}
					render={(props) => (
						<Posts
							{...props}
							schoolRef={schoolRef.collection("posts")}
							sidebar={NewSidebar}
						/>
					)}
				/>
				<Route
					exact
					path={`${match.path}/majors`}
					render={(props) => <Majors {...props} sidebar={NewSidebar} />}
				/>
				<Route
					exact
					path={`${match.path}/classes`}
					render={(props) => <Classes {...props} sidebar={NewSidebar} />}
				/>
				<Route
					exact
					path={`${match.path}/clubs`}
					render={(props) => <Clubs {...props} sidebar={NewSidebar} />}
				/>
				<Route
					exact
					path={`${match.path}/chats`}
					render={(props) => <Chats {...props} sidebar={NewSidebar} />}
				/>
				<Route
					exact
					path={`${match.path}/events`}
					render={(props) => <Events {...props} sidebar={NewSidebar} />}
				/>
			</Switch>
		</Section>
	);
}
