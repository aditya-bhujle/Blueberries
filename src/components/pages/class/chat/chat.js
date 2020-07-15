import React, { useEffect } from "react";

import Content from "./Content";
import { Route, Redirect, Switch } from "react-router-dom";

export default function ClassChat({ match, sidebar, classRef, hubRef, ...props }) {
	useEffect(() => {
		const rootElement = document.getElementById("root");

		rootElement.classList.add("content_container");

		return () => rootElement.classList.remove("content_container");
	}, []);

	return (
		<div className="hub_column_layout">
			<Switch>
				<Route
					exact
					path={match.path}
					render={(...routeProps) => (
						<Content
							classRef={classRef}
							matchUrl={match.url}
							{...props}
							{...routeProps}
						/>
					)}
				/>
				<Route
					exact
					path={`${match.path}/hub`}
					render={(...routeProps) => (
						<Content
							classRef={hubRef}
							matchUrl={match.url}
							{...props}
							{...routeProps}
						/>
					)}
				/>
				<Redirect to={match.path} />
			</Switch>
			{/*<ChatPreview />*/}
			{sidebar}
		</div>
	);
}
