import React from "react";
import { Link } from "react-router-dom";

export default function OnboardingNavigation({ page, hideNext }) {
	const pages = ["welcome", "schools", "major", "classes", "overview"];

	let pageNum;
	pages.forEach((setPage, index) => {
		if (page === setPage) pageNum = index;
	});

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
			{pageNum > 0 ? (
				<Link
					to={`./${pages[pageNum - 1]}`}
					className="button select no_margin"
				>
					Go Back
				</Link>
			) : (
				<div></div>
			)}
			{pageNum < pages.length - 1 &&
				(hideNext ? (
					hideNextButton
				) : (
					<Link to={`./${pages[pageNum + 1]}`} className="button no_margin">
						Next
					</Link>
				))}
		</div>
	);
}
