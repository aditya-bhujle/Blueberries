import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
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
import NotFoundSection from "../../NotFoundSection";

export default function SchoolRouter({ match }) {
	let { schoolId } = match.params;
	const schoolRef = db.collection("schools").doc(schoolId);

	const [schoolInfo, setSchoolInfo] = useState({});
	const [schoolInfoLoading, setSchoolInfoLoading] = useState(true);

	const [previewInfo, setPreviewInfo] = useState({});
	const [previewLoading, setPreviewLoading] = useState(true);

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
				console.log("Performed some reads!");
			} catch (error) {
				console.error(error);
			}

			setPreviewLoading(false);
		};

		fetchData();
	}, []);

	useEffect(() => {
		const fetchData = async () => {
			try {
				let fetchInfo = await schoolRef.get();
				console.log("School info fetched!");

				if (!fetchInfo.exists) setSchoolInfo(404);
				else setSchoolInfo(fetchInfo.data());
			} catch (error) {
				console.error(error);
			}

			setSchoolInfoLoading(false);
		};

		fetchData();
	}, [match.url]);

	if (schoolInfo === 404) return <NotFoundSection text="school" />;

	const NewSidebar = (
		<Sidebar
			schoolLoading={schoolInfoLoading}
			schoolInfo={schoolInfo}
			previewInfo={previewInfo}
			previewLoading={previewLoading}
		/>
	);

	return (
		<Section>
			<div
				className="hub_card"
				style={{ borderBottomStyle: "none", flexShrink: 0 }}
			>
				<SchoolHeader
					name={schoolInfo.name}
					short={schoolInfo.short}
					schoolId={schoolId}
					loading={schoolInfoLoading}
				/>
				<PageNav type="school" baseLink={match.url} />
			</div>
			<div className="line" />
			<Switch>
				<Route
					exact
					path={`${match.path}`}
					render={(props) => (
						<Posts
							{...props}
							hubRef={schoolRef.collection("posts")}
							sidebar={NewSidebar}
							hubInfo={schoolInfo}
						/>
					)}
				/>
				<Route
					exact
					path={`${match.path}/majors`}
					render={(props) => (
						<Majors
							{...props}
							sidebar={NewSidebar}
							schoolRef={schoolRef.collection("majors")}
						/>
					)}
				/>
				<Route
					exact
					path={`${match.path}/classes`}
					render={(props) => (
						<Classes
							{...props}
							sidebar={NewSidebar}
							schoolRef={schoolRef.collection("classes")}
						/>
					)}
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
