import React from "react";
import Section from "../../Section";
import { ReactComponent as ConstructionSVG } from "../../../SVGs/construction.svg";

export default function ComingSoon() {
	document.title = "Coming Soon! - Blueberries"
	return (
		<Section>
			<h1>Under construction!</h1>
			<div
				className="landing_subtitle"
				style={{ fontSize: "22px", lineHeight: "26px" }}
			>
				We need a bit more time to perfect this page, but be sure to check back
				soon
			</div>
			<ConstructionSVG width="470px" height="289px" />
		</Section>
	);
}
