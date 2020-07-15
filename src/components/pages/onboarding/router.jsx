import React, { useEffect, useState, useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import SchoolOnboarding from "./pages/school/schools";
import MajorOnboarding from "./pages/major";
import ClassesOnboarding from "./pages/classes";
import { UserContext } from "../../../App";
import OnboardingOverview from "./overview";
import UsernameOnboarding from "./pages/username";

export default function OnboardingRouter() {
	const [username, setUsername] = useState("");
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
			if (userInfo.username) setUsername(userInfo.username);
			if (userInfo.school) setSchool(userInfo.school);
			if (userInfo.major) setMajor(userInfo.major);
			if (userInfo.classes) setClasses(userInfo.classes);
		}
	}, [userInfo]);

	return (
		<div className="section onboarding">
			<div className="w-container content_container" style={{ height: "100%" }}>
				<Switch>
					<Route path="/onboarding/welcome">
						<UsernameOnboarding
							username={username}
							setUsername={(username) => setUsername(username)}
						/>
					</Route>
					{!username && <Redirect to="/onboarding/welcome" />}

					<Route path="/onboarding/schools">
						<SchoolOnboarding
							schoolId={school ? school.id : false}
							setSchool={(school) => setSchool(school)}
							username={username}
						/>
					</Route>
					{!school && <Redirect to="/onboarding/schools" />}

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
							schoolShort={school ? school.short : false}
						/>
					</Route>
					<Route path="/onboarding/overview">
						<OnboardingOverview
							username={username}
							school={school}
							major={major}
							classes={classes}
							userId={userInfo ? userInfo.id : null}
						/>
					</Route>

					<Redirect to="/onboarding/welcome" />
				</Switch>
			</div>
		</div>
	);
}
