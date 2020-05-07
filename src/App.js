import React from "react";
import Navbar from "./components/Navbar";
import Menu from "./components/menu/Menu";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

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

export default function App() {
	const user = { school: { id: "KMLrVq9pltD3OgFouIIV", name: "UNCC" } };
	return (
		<Router>
			<SVG />
			<Navbar />
			<Menu data={user} />
			<Switch>
				<Route path="/login" component={Login}></Route>
				<Route path="/signup" component={Signup} />
				<Route exact path="/" component={DashboardHub} />

				<Route path="/school/:id/major/:majorId" component={ClassRouter} />
				<Route path="/school/:id/class/:classId" component={ClassRouter} />
				<Route path="/school/:id/club/:clubId" component={ClassRouter} />
				<Route path="/school/:id/chat/:chatId" component={ClassRouter} />
				<Route path="/school/:id" component={SchoolRouter} />

				<Route path="/post/:id" component={Post} />
			</Switch>
		</Router>
	);
}
