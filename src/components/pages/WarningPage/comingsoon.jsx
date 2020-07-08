import React from "react";
import Section from "../../Section";
import { ReactComponent as ConstructionSVG } from "../../../SVGs/construction.svg";

export default function ComingSoon({ nosection }) {
	document.title = "Coming Soon! - Blueberries";
	const content = (
		<>
			<h1>Under construction!</h1>
			<div
				className="landing_subtitle"
				style={{ fontSize: "22px", lineHeight: "26px" }}
			>
				We need a bit more time to perfect this page, but be sure to check back
				soon
			</div>
			<ConstructionSVG width="470px" height="289px" />
		</>
	);

	if (nosection) return content;

	return <Section>{content}</Section>;
}
