import React, { useEffect, useState, createContext, Component } from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";
import { db, auth } from "./firebase/config";

import "./styles/antd.css";
import "./styles/normalize.css";
import "./styles/webflow.css";
import "./styles/global.css";
import SVG from "./styles/SVG";

import Navbar from "./components/navbar/Navbar";
import Menu from "./components/menu/Menu";

import DashboardHub from "./components/pages/dashboard/dashboard";
import Login from "./components/pages/auth/login";
import Signup from "./components/pages/auth/signup";
import SchoolRouter from "./components/pages/school/router";
import ClassRouter from "./components/pages/class/router";
import OnboardingRouter from "./components/pages/onboarding/router";
import ProtectedAccess from "./components/WarningPage/ProtectedAccess";
import FindSchools from "./components/pages/findHubs/findSchools";

export const UserContext = createContext({ user: null });

export default function App() {
	const [loading, setLoading] = useState(true);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userInfo, setUserInfo] = useState();
	const [user, setUser] = useState(null);

	useEffect(() => {
		auth().onAuthStateChanged((userAuth) => {
			setIsLoggedIn(!!userAuth);
			setUser(userAuth);
		});
	}, []);

	useEffect(() => {
		const fetchData = async () => {
			try {
				db.collection("users")
					.doc("i24nevgPdghkfXgSAmx8")
					.onSnapshot((querySnapshot) => {
						console.log("UserInfo fetched!");

						let userInfoWithId = querySnapshot.data();
						userInfoWithId.id = querySnapshot.id;

						setUserInfo(userInfoWithId);
					});
			} catch (error) {
				console.error(error);
			}

			setLoading(false);
		};

		user ? fetchData() : setUserInfo(null);
	}, [user]);

	const PrivateRoute = ({ component: Component, ...props }) => (
		<Route
			{...props}
			render={(props) =>
				isLoggedIn ? <Component {...props} /> : <Redirect to="/protected" />
			}
		/>
	);

	return (
		<UserContext.Provider value={userInfo}>
			<Router>
				<SVG />
				<Navbar user={user} />
				{isLoggedIn && <Menu data={userInfo} loading={loading} />}

				<Switch>
					<Route path="/login" component={Login}></Route>
					<Route path="/signup" component={Signup} />

					<Route path="/onboarding" component={OnboardingRouter} />

					<Route path="/protected" component={ProtectedAccess} />

					<Route exact path="/" component={DashboardHub} />

					<PrivateRoute
						path="/schools/:schoolId/major/:majorId"
						component={ClassRouter}
					/>
					<PrivateRoute
						path="/schools/:schoolId/classes/:classId/teachers/:teacherId"
						component={ClassRouter}
					/>
					<PrivateRoute
						path="/schools/:schoolId/classes/:classId"
						component={ClassRouter}
					/>
					<PrivateRoute
						path="/schools/:schoolId/club/:clubId"
						component={ClassRouter}
					/>
					<PrivateRoute
						path="/schools/:schoolId/chat/:chatId"
						component={ClassRouter}
					/>
					<Route
						path="/schools/:schoolId"
						render={(props) => (
							<SchoolRouter {...props} isLoggedIn={isLoggedIn} />
						)}
					/>
					<Route path="/schools" component={FindSchools} />
				</Switch>
			</Router>
		</UserContext.Provider>
	);
}
