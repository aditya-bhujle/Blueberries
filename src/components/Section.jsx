import React, { useContext } from "react";
import { UserContext } from "../App";

export default function Section({ children, fullscreen }) {
	const user = useContext(UserContext);

	return (
		<div className={"section" + (user ? "" : " content")}>
			<div className={"w-container" + (fullscreen ? " content_container" : "")} style={{ width: "100%" }}>
				{children}
			</div>
		</div>
	);
}
