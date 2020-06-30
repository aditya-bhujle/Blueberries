import React, { useState, useEffect } from "react";
import { CardSearch } from "../../../cards/CenterCards";
import { useLocation, Redirect } from "react-router-dom";
import { db } from "../../../../firebase/config";
import SearchMajors from "../../school/majors/SearchMajors";
import SpinLoad from "../../../SpinLoad";
import OnboardingNavigation from "../Navigation";

export default function MajorOnboarding({
	schoolID,
	selectedMajor,
	setSelectedMajor,
}) {
	const [majors, setMajors] = useState([]);
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
				let fetchInfo = await db
					.collection("schools")
					.doc(schoolID)
					.collection("majors")
					.get();
				console.log("Major info set!");

				setMajors(fetchInfo.docs);
			} catch (error) {
				console.error(error);
			}

			setLoading(false);
		};

		if (schoolID) fetchData();
	}, [schoolID]);

	function conditionalRender() {
		if (!schoolID)
			return (
				<div style={{ textAlign: "center" }} className="flex_stretch">
					<p>Error: No school selected</p>
				</div>
			);

		if (loading)
			return (
				<div className="flex_stretch">
					<SpinLoad big />
				</div>
			);

		if (!searchQuery)
			return (
				<div className="list_grid_div onboarding_school">
					{majors.map((major, index) => {
						const isSelected = selectedMajor.id === major.id;
						return (
							<div
								className={
									"hub_card bot_padding " +
									(isSelected ? "selected" : "hoverable")
								}
								onClick={() => {
									if (major.id === selectedMajor.id) setSelectedMajor({});
									else
										setSelectedMajor({ name: major.data().name, id: major.id });
								}}
								key={index}
							>
								<strong>{major.data().name}</strong>
								<p className="list_subtitle">{major.data().members} Members</p>
							</div>
						);
					})}
				</div>
			);

		return (
			<SearchMajors
				searchQuery={searchQuery}
				schoolId={schoolID}
				isOnboarding
				selectedMajor={selectedMajor}
				setSelectedMajor={setSelectedMajor}
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

			<h3>Add Your Major</h3>

			<p>Can't find your major? Request it here</p>
			<CardSearch
				placeholder="Search All Majors"
				searchHub={(query) => setSearchQuery(query)}
				defaultValue={searchQuery}
			/>

			{searchQuery && (
				<strong style={{ marginBottom: "5px" }}>
					Search Results for "{searchQuery}"
				</strong>
			)}

			{conditionalRender()}

			<OnboardingNavigation pageNum={1} />
		</>
	);
}
