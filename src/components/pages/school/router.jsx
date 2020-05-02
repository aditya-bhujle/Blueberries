import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "../../layout/header/Header";
import PageNav from "../../layout/header/PageNav";

export default function SchoolRouter() {
	return (
		<Router>
			<Section>
				<Header name={title} short={short} />
				<PageNav links={links} />
				<div className="line" />
				<Switch>
					<Route exact path="/" component={DashboardHub} />
                    <Route path="/majors" component={DashboardHub} />
                    <Route path="/classes" component={DashboardHub} />
                    <Route path="/clubs" component={DashboardHub} />
                    <Route path="/events" component={DashboardHub} />
                    <Route path="/chats" component={DashboardHub} />
				</Switch>
			</Section>
		</Router>
	);
}
