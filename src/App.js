import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Menu from "./components/menu/Menu";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./styles/normalize.css";
import "./styles/webflow.css";
import "./styles/global.css";
import SVG from "./styles/SVG";

import DashboardHub from "./components/pages/dashboard/dashboard";
import Post from "./components/pages/post/post";
import Login from "./components/pages/auth/login";
import Signup from "./components/pages/auth/signup";
import SchoolRouter from "./components/pages/school/router";
import ClassRouter from "./components/pages/class/router";
import { db } from "./firebase/config";

export default function App() {
	const user = { school: { id: "KMLrVq9pltD3OgFouIIV", name: "UNCC" } };
	const [loading, setLoading] = useState(true);
	const [userInfo, setUserInfo] = useState();
	
	useEffect(() => {
		const fetchData = async () => {
			try {
				let fetchUserInfo = await db
					.collection("users")
					.doc("i24nevgPdghkfXgSAmx8")
					.get();

				console.log("UserInfo fetched!");

				setUserInfo(fetchUserInfo.data());
			} catch (error) {
				console.error(error);
			}

			setLoading(false);
		};

		fetchData();
	}, []);

	return (
		<Router>
			<SVG />
			<Navbar />
			<Menu data={userInfo} loading={loading} />
			<Switch>
				<Route path="/login" component={Login}></Route>
				<Route path="/signup" component={Signup} />
				<Route exact path="/" component={DashboardHub} />

				<Route
					path="/school/:schoolId/major/:majorId"
					component={ClassRouter}
				/>
				<Route
					path="/school/:schoolId/class/:classId"
					render={(props) => <ClassRouter {...props} school={userInfo ? userInfo.school : "loading"} />}
				/>
				<Route path="/school/:schoolId/club/:clubId" component={ClassRouter} />
				<Route path="/school/:schoolId/chat/:chatId" component={ClassRouter} />
				<Route path="/school/:schoolId" component={SchoolRouter} />

				<Route path="/post/:id" component={Post} />
			</Switch>
		</Router>
	);
}
