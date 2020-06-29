import React, { useState, useEffect } from "react";
import { CardSearch } from "../../cards/CenterCards";
import { useLocation, Redirect } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import SchoolResults from "./school/SchoolResults";

export default function OnboardingSystem({ fbRef, itemCard }) {
	const [items, setItems] = useState([]);
	const [loading, setLoading] = useState(true);

	const [searchQuery, setSearchQuery] = useState("");
	const loc = useLocation();
	const [urlLoading, setUrlLoading] = useState(true);

	useEffect(() => {
		let searchHash = new URLSearchParams(loc.search).get("search");
		setSearchQuery(searchHash);
		setUrlLoading(false);
	}, [loc.search]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				let fetchInfo = await fbRef.get();
				console.log("Onboarding info set!");

				setItems(fetchInfo.docs);
			} catch (error) {
				console.error(error);
			}

			setLoading(false);
		};

		fetchData();
	}, []);

	function SchoolCard({ children }) {
		return (
			<div className="hub_card" style={{ padding: 15, textAlign: "center" }}>
				<svg
					style={{
						height: "48px",
						width: "48px",
						marginBottom: "10px",
					}}
				>
					<use xlinkHref="#school" />
				</svg>

				{children}
			</div>
		);
	}

	function conditionalRender() {
		if (loading)
			return new Array(3).fill().map((s, i) => (
				<SchoolCard key={i}>
					<div style={{ fontSize: "16px", lineHeight: "22px" }}>
						<Skeleton width={200} />
						<p className="list_subtitle" style={{ marginTop: "5px" }}>
							<Skeleton width={75} />
						</p>
					</div>
				</SchoolCard>
			));

		if (!searchQuery)
			return items.map((school, index) => {
				const schoolData = school.data();
				return (
					<SchoolCard key={index}>
						<div style={{ fontSize: "16px", lineHeight: "22px" }}>
							<strong>{schoolData.name}</strong>
							<p className="list_subtitle" style={{ marginTop: "5px" }}>
								{schoolData.short}
							</p>
						</div>
					</SchoolCard>
				);
			});

		return <SchoolResults searchQuery={searchQuery} />;
	}

	return (
		<>
			{!urlLoading && (
				<Redirect
					to={loc.pathname + (searchQuery ? `?search=${searchQuery}` : "")}
				/>
			)}

			<h3>Choose Your Schools</h3>

			<p>Can't find your school? Request it here</p>
			<CardSearch
				placeholder="Search All Schools"
				searchHub={(query) => setSearchQuery(query)}
				defaultValue={searchQuery}
			/>

			<div className="list_grid_div onboarding_school">
				{conditionalRender()}
			</div>

			<div className="onboarding_navigation">
				<button className="button select no_margin">Go Back</button>
				<button className="button no_margin">Next</button>
			</div>
		</>
	);
}
