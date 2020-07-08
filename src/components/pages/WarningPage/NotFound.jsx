import React from "react";

import { ReactComponent as EmptySVG } from "../../../SVGs/empty.svg";
import { Link } from "react-router-dom";
import Section from "../../Section";

export default function NotFoundAlert() {
	return (
		<Section>
			<div className="hub_card bot_padding" style={{ textAlign: "center" }}>
				<h1>404 - Page not found</h1>
				<div
					className="landing_subtitle"
					style={{ fontSize: "22px", lineHeight: "26px" }}
				>
					Unfortunately, we can't find that page.{" "}
					<Link className="text_link" to="/">
						Click here to go home
					</Link>
				</div>
				<EmptySVG height="200px" />
			</div>
		</Section>
	);
}
