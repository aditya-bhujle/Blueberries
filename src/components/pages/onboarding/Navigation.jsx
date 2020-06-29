import React from "react";
import { Link } from "react-router-dom";

export default function OnboardingNavigation({
	pageNum: num,
	hideNext,
	submit,
}) {
	const pages = ["schools", "major", "classes", "overview"];

	const hideNextButton = (
		<div
			className="button no_margin"
			style={{ opacity: "50%", cursor: "not-allowed" }}
		>
			Next
		</div>
	);

	return (
		<div className="onboarding_navigation">
			{num > 0 ? (
				<Link to={`./${pages[num - 1]}`} className="button select no_margin">
					Go Back
				</Link>
			) : (
				<div></div>
			)}
			{num < pages.length - 1 &&
				(hideNext ? (
					hideNextButton
				) : (
					<Link to={`./${pages[num + 1]}`} className="button no_margin">
						Next
					</Link>
				))}
		</div>
	);
}
