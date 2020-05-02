import React from "react";
import Navbar from "./components/layout/Navbar";
import Menu from "./components/layout/menu/Menu";
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

export default function App() {
	return (
		<Router>
			<SVG />
			<Navbar />
			<Menu />
			<Switch>
				<Route path="/login" component={Login}/>
				<Route path="/signup" component={Signup}/>
				<Route exact path="/" component={DashboardHub}/>

				<Route path="/school/:id/class/:classId" component={ClassRouter}/>
				<Route path="/school/:id" component={SchoolRouter}/>
				
				<Route path="/post/:id" component={Post}/>
			</Switch>
		</Router>
	);
}