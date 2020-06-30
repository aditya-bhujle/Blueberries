import React, { useEffect, useState, useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import SchoolOnboarding from "./school/schools";
import MajorOnboarding from "./major/major";
import ClassesOnboarding from "./class/classes";
import { UserContext } from "../../../App";
import OnboardingOverview from "./overview";

export default function OnboardingRouter() {
	const [school, setSchool] = useState();
	const [major, setMajor] = useState();
	const [classes, setClasses] = useState([]);
	const userInfo = useContext(UserContext);

	useEffect(() => {
		const rootElement = document.getElementById("root");

		rootElement.classList.add("content_container");

		return () => rootElement.classList.remove("content_container");
	}, []);

	useEffect(() => {
		if (userInfo) {
			if (userInfo.school) setSchool(userInfo.school);
			if (userInfo.major) setMajor(userInfo.major);
			if (userInfo.classes) setClasses(userInfo.classes);
		}
	}, [userInfo]);

	return (
		<div className="section onboarding">
			<div className="w-container content_container" style={{ height: "100%" }}>
				<Switch>
					<Route path="/onboarding/schools">
						<SchoolOnboarding
							schoolId={school ? school.id : false}
							setSchool={(school) => setSchool(school)}
						/>
					</Route>
					<Route path="/onboarding/major">
						<MajorOnboarding
							schoolID={school ? school.id : false}
							selectedMajor={major}
							setSelectedMajor={(majors) => setMajor(majors)}
						/>
					</Route>
					<Route path="/onboarding/classes">
						<ClassesOnboarding
							schoolID={school ? school.id : false}
							selectedClasses={classes}
							setSelectedClasses={(classes) => setClasses(classes)}
						/>
					</Route>
					<Route path="/onboarding/overview">
						<OnboardingOverview
							school={school}
							major={major}
							classes={classes}
							userId={userInfo ? userInfo.id : null}
						/>
					</Route>
					<Route>
						<Redirect to="/onboarding/schools" />
					</Route>
				</Switch>
			</div>
		</div>
	);
}
