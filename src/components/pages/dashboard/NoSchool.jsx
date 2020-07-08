import React from "react";

import { ReactComponent as EmptySVG } from "../../../SVGs/empty.svg";
import { Link } from "react-router-dom";

export default function NoSchoolAlert() {
	return (
		<div className="hub_card bot_padding" style={{ textAlign: "center" }}>
			<EmptySVG height="200px" />
			<h3 style={{ margin: "20px 0px 15px" }}>
				You Haven't Joined a School Yet!
			</h3>
			<Link
				className="button select"
				style={{ borderStyle: "solid" }}
				to="/schools"
			>
				Join Your School
			</Link>
		</div>
	);
}
