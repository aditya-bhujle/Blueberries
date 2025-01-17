import React, { useState, useEffect } from "react";
import { CardSearch } from "../../../cards/CenterCards";
import { useLocation, Redirect } from "react-router-dom";
import { db } from "../../../../firebase/config";
import SearchMajors from "../../school/majors/SearchMajors";
import SpinLoad from "../../../SpinLoad";
import OnboardingNavigation from "../Navigation";
import { useToasts } from "react-toast-notifications";

export default function MajorOnboarding({
	schoolID,
	selectedMajor,
	setSelectedMajor,
}) {
	const { addToast } = useToasts();

	const [majors, setMajors] = useState([]);
	const [loading, setLoading] = useState(true);

	const [showAddMajor, setShowAddMajor] = useState(false);
	const [newMajorInfo, setNewMajorInfo] = useState({});

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
				await db
					.collection("schools")
					.doc(schoolID)
					.collection("majors")
					.onSnapshot((querySnapshot) => {
						console.log("Major info set!");

						setMajors(querySnapshot.docs);
						setLoading(false);
					});
			} catch (error) {
				console.error(error);
			}
		};

		if (schoolID) fetchData();
	}, [schoolID]);

	document.title = "Onboarding - Major | Blueberries";

	async function createMajor(e) {
		e.preventDefault();

		try {
			await db
				.collection("schools")
				.doc(schoolID)
				.collection("majors")
				.add({ ...newMajorInfo, members: 0 });
		} catch (error) {
			console.error(error);
		}

		addToast(`${newMajorInfo.name} Successfully Created!`, {
			appearance: "success",
			autoDismiss: true,
		});
		console.log(`${newMajorInfo.name} successfully created!`);
		setNewMajorInfo({});
		setShowAddMajor(false);
	}

	const ConditionalRender = () => {
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
				<div className="list_grid_div onboarding_classes">
					{majors.map((major, index) => {
						const isSelected = selectedMajor && selectedMajor.id === major.id;
						return (
							<div
								className={
									"hub_card bot_padding " +
									(isSelected ? "selected" : "hoverable")
								}
								onClick={() => {
									if (selectedMajor && major.id === selectedMajor.id)
										setSelectedMajor(null);
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
	};

	const InputForm = ({ title, placeholder, prop }) => (
		<>
			<p style={{ fontWeight: "500" }}>{title + " *"}</p>
			<div className="hub_card search username">
				<input
					type="search"
					className="search_input w-input"
					placeholder={placeholder}
					style={{ padding: "4px" }}
					value={newMajorInfo[prop]}
					onChange={(e) => {
						const newInfo = newMajorInfo;
						newInfo[prop] = e.currentTarget.value;
						setNewMajorInfo(newInfo);
					}}
					required
				/>
			</div>
		</>
	);

	const AddMajorForm = () => (
		<form
			noValidate
			className="form_block w-form"
			style={{ position: "relative" }}
			onSubmit={(e) => createMajor(e)}
		>
			<InputForm
				title="Major Name:"
				placeholder="Ex. Computer Science"
				prop="name"
			/>

			<div>
				<button
					className="button select no_margin"
					onClick={() => setShowAddMajor(false)}
					type="button"
				>
					Cancel
				</button>
				<button className="button">Send Request</button>
			</div>
		</form>
	);

	const DefaultContent = () => (
		<>
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

			<ConditionalRender />

			<div>
				<button
					className="button select no_margin"
					onClick={() => setShowAddMajor(!showAddMajor)}
				>
					Request New Major
				</button>
			</div>
		</>
	);

	return (
		<>
			{!urlLoading && (
				<Redirect
					to={loc.pathname + (searchQuery ? `?search=${searchQuery}` : "")}
				/>
			)}

			<h3>{showAddMajor ? "Request Your Major!" : "Add Your Major"}</h3>

			{!showAddMajor && <p>Can't find your major? Request it below!</p>}

			{showAddMajor ? <AddMajorForm /> : <DefaultContent />}

			<div className="flex_stretch"></div>

			<OnboardingNavigation page="major" />
		</>
	);
}
