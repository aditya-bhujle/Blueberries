import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "../../layout/header/Header";
import PageNav from "../../layout/header/PageNav";
import Section from "../../layout/Section";

export default function SchoolRouter() {
	return (
		<Router>
			<Section>
				<Header name="University of North Carolina at Charlotte" short="UNCC" />
				<PageNav type="school" />
				<div className="line" />
				<Switch>{/*
					<Route exact path="/" component={DashboardHub} />
                    <Route path="/majors" component={DashboardHub} />
                    <Route path="/classes" component={DashboardHub} />
                    <Route path="/clubs" component={DashboardHub} />
                    <Route path="/events" component={DashboardHub} />
                    <Route path="/chats" component={DashboardHub} />*/}
				</Switch>
			</Section>
		</Router>
	);
}
