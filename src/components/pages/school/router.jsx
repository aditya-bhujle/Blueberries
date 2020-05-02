import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "../../header/Header";
import PageNav from "../../header/PageNav";
import Section from "../../Section";

import Posts from "./posts/index";
import Majors from "./majors/majors";
import Classes from "./classes/classes";
import Clubs from "./clubs/clubs";
import Events from "./events/events";
import Chats from "./chats/chats";

export default function SchoolRouter({ match }) {
	return (
		<Router>
			<Section>
				<Header name="University of North Carolina at Charlotte" short="UNCC" />
				<PageNav type="school" baseLink={match.url} />
				<div className="line" />
				<Switch>
					<Route exact path={`${match.path}`} component={Posts} />
					<Route exact path={`${match.path}/majors`} component={Majors} />
					<Route exact path={`${match.path}/classes`} component={Classes} />
					<Route exact path={`${match.path}/clubs`} component={Clubs} />
					<Route exact path={`${match.path}/events`} component={Events} />
					<Route exact path={`${match.path}/chats`} component={Chats} />
				</Switch>
			</Section>
		</Router>
	);
}
