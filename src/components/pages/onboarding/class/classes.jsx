import React, { useState, useEffect } from "react";
import { CardSearch } from "../../../cards/CenterCards";
import { useLocation, Redirect } from "react-router-dom";

export default function ClassesOnboarding() {
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

			<h3>Add All Your Classes</h3>

			<p>Can't find a class? Request it here</p>
			<CardSearch
				placeholder="Search All Classes"
				searchHub={(query) => setSearchQuery(query)}
				defaultValue={searchQuery}
			/>

			<div className="list_grid_div onboarding_school one_column">
				<div className="hub_card">
					<h4 className="main_color">
						<strong>Commp</strong>
					</h4>
					<div className="list_grid_div">
						<div className="list_div w-clearfix">
							<strong>Class</strong>
							<p className="list_subtitle">ITSC 2214}</p>
						</div>
					</div>
				</div>
			</div>

			<div className="onboarding_navigation">
				<button className="button select no_margin">Go Back</button>
				<button className="button no_margin">Next</button>
			</div>
		</>
	);
}
