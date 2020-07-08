import React, { useContext } from "react";
import { UserContext, UserLoadingContext } from "../App";

export default function Section({ children, fullscreen }) {
	const user = useContext(UserContext);
	const loading = useContext(UserLoadingContext);

	const content = (
		<div
			className={"w-container" + (fullscreen ? " content_container" : "")}
			style={{ width: "100%" }}
		>
			{children}
		</div>
	);

	if (!loading && !user)
		return (
			<div className="section content" id="main_section">
				{content}
			</div>
		);

	return (
		<div className="section" id="main_section">
			{content}
		</div>
	);
}
