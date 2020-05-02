import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "../../header/Header";
import PageNav from "../../header/PageNav";
import Section from "../../Section";

import Posts from "./posts/index";
import Chat from "./chat/chat";
import Notes from "./notes/notes";
import Calendar from "./calendar/calendar";
import Thoughts from "./thoughts/thoughts";
import Reviews from "./reviews/reviews";

export default function ClassRouter({ match }) {
	return (
		<Router>
			<Section>
				<Header
					name="Data Structures and Algorithms"
					short="UNCC"
					subShort="ITSC 2214 Professor Long"
				/>
				<PageNav type="class" baseLink={match.url} />
				<div className="line" />
				<Switch>
					<Route exact path={`${match.path}`} component={Posts} />
					<Route exact path={`${match.path}/chat`} component={Chat} />
					<Route exact path={`${match.path}/notes`} component={Notes} />
					<Route exact path={`${match.path}/calendar`} component={Calendar} />
					<Route exact path={`${match.path}/thoughts`} component={Thoughts} />
					<Route exact path={`${match.path}/reviews`} component={Reviews} />
				</Switch>
			</Section>
		</Router>
	);
}
