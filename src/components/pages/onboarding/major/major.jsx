import React, { useState, useEffect } from "react";
import { CardSearch } from "../../../cards/CenterCards";
import { useLocation, Redirect } from "react-router-dom";

export default function MajorOnboarding() {
	const [searchQuery, setSearchQuery] = useState("");
	const loc = useLocation();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		let searchHash = new URLSearchParams(loc.search).get("search");
		setSearchQuery(searchHash);
		setLoading(false);
	}, [loc.search]);

	return (
		<>
			{!loading && (
				<Redirect
					to={loc.pathname + (searchQuery ? `?search=${searchQuery}` : "")}
				/>
			)}

			<h3>Add Your Major</h3>

			<p>Can't find your major? Request it here</p>
			<CardSearch
				placeholder="Search All Majors in this School"
				searchHub={(query) => setSearchQuery(query)}
				defaultValue={searchQuery}
			/>

			<div className="list_grid_div onboarding_school">
				<div
					className="hub_card bot_padding hoverable"
				>
					<strong>Accounting</strong>
					<p className="list_subtitle">240 Members</p>
				</div>
			</div>

			<div className="onboarding_navigation">
				<button className="button select no_margin">Go Back</button>
				<button className="button no_margin">Next</button>
			</div>
		</>
	);
}
