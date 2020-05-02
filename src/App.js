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

				<Route exact path="/school/:id" component={School}/> {/* Nested routing in here, can do persistant rendering for schools and classes and stuff */}
				
				<Route path="/post/:id" component={Post}/>
			</Switch>
		</Router>
	);
}