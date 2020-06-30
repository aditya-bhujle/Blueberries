import React, { useState, useEffect } from "react";
import { CardSearch } from "../../../cards/CenterCards";
import { useLocation, Redirect } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { db } from "../../../../firebase/config";
import SchoolResults from "./SchoolResults";
import OnboardingNavigation from "../Navigation";

export default function SchoolOnboarding({ schoolId, setSchool }) {
	const [schools, setSchools] = useState([]);
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
				let fetchInfo = await db.collection("schools").get();
				console.log("School info set!");

				setSchools(fetchInfo.docs);
			} catch (error) {
				console.error(error);
			}

			setLoading(false);
		};

		fetchData();
	}, []);

	function SchoolIcon() {
		return (
			<svg
				style={{
					height: "48px",
					width: "48px",
					marginBottom: "10px",
				}}
			>
				<use xlinkHref="#school" />
			</svg>
		);
	}

	function conditionalRender() {
		if (loading)
			return (
				<div className="list_grid_div onboarding_school">
					{new Array(3).fill().map((s, i) => (
						<div
							className="hub_card hoverable"
							style={{ padding: 15, textAlign: "center" }}
							key={i}
						>
							<SchoolIcon />
							<div style={{ fontSize: "16px", lineHeight: "22px" }}>
								<Skeleton width={200} />
								<p className="list_subtitle" style={{ marginTop: "5px" }}>
									<Skeleton width={75} />
								</p>
							</div>
						</div>
					))}
				</div>
			);

		if (!searchQuery)
			return (
				<div className="list_grid_div onboarding_school">
					{schools.map((school, index) => {
						const schoolData = school.data();
						return (
							<div
								className={
									"hub_card" +
									(school.id === schoolId ? " selected" : " hoverable")
								}
								style={{ padding: 15, textAlign: "center" }}
								key={index}
								onClick={() => {
									if (school.id === schoolId) setSchool(null);
									else
										setSchool({
											id: school.id,
											name: schoolData.name,
											short: schoolData.short,
										});
								}}
							>
								<SchoolIcon />
								<div style={{ fontSize: "16px", lineHeight: "22px" }}>
									<strong>{schoolData.name}</strong>
									<p className="list_subtitle" style={{ marginTop: "5px" }}>
										{schoolData.short}
									</p>
								</div>
							</div>
						);
					})}
				</div>
			);

		return (
			<SchoolResults
				searchQuery={searchQuery}
				schoolId={schoolId}
				setSchool={(school) => setSchool(school)}
			/>
		);
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

			{searchQuery && (
				<strong style={{ marginBottom: "5px" }}>
					Search Results for "{searchQuery}"
				</strong>
			)}

			{conditionalRender()}

			<OnboardingNavigation pageNum={0} hideNext={!schoolId} />
		</>
	);
}
