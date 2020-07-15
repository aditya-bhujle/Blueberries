import React, { useState, useEffect } from "react";
import { CardSearch } from "../../../cards/CenterCards";
import { useLocation, Redirect } from "react-router-dom";
import { db } from "../../../../firebase/config";
import SpinLoad from "../../../SpinLoad";
import SearchClasses from "../../school/classes/SearchClasses";
import OnboardingNavigation from "../Navigation";

export default function ClassesOnboarding({
	schoolID,
	selectedClasses,
	setSelectedClasses,
}) {
	const [classes, setClasses] = useState([]);
	const [loading, setLoading] = useState(true);

	const [showAddClass, setShowAddClass] = useState(false);

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
					.collection("classes")
					.get();
				console.log("Class info set!");

				setClasses(fetchInfo.docs);
			} catch (error) {
				console.error(error);
			}

			setLoading(false);
		};

		if (schoolID) fetchData();
	}, [schoolID]);

	document.title = "Onboarding - Classes | Blueberries";

	function ConditionalRender() {
		if (!schoolID)
			return (
				<div style={{ textAlign: "center" }} className="flex_stretch">
					<p>Error: No school selected</p>
				</div>
			);

		if (loading)
			return (
				<div style={{ textAlign: "center" }} className="flex_stretch">
					<SpinLoad big />
				</div>
			);

		if (!searchQuery) {
			let previousField = "testing field";

			let fieldArray = [];
			classes.forEach((classInfo) => {
				const classData = { ...classInfo.data(), id: classInfo.id };
				if (classData.field !== previousField)
					fieldArray.push({ name: classData.field, content: [] });

				fieldArray[fieldArray.length - 1].content.push({
					header: classData.name,
					short: classData.short,
					content: `${classData.short} ⋅ ${classData.members} Students`,
					id: classData.id,
				});
				previousField = classData.field;
			});

			return fieldArray.map((field, index) => (
				<div className="hub_card" key={index}>
					<h4 className="main_color">
						<strong>{field.name}</strong>
					</h4>
					<div className="list_grid_div onboarding_classes">
						{field.content.map((element, index) => {
							const isSelected = !!selectedClasses.filter(
								(selectedClass) => selectedClass.id === element.id
							).length;

							return (
								<div
									className={
										"hub_card inside_div bot_padding " +
										(isSelected ? "selected" : "hoverable")
									}
									onClick={() => {
										isSelected
											? setSelectedClasses(
													selectedClasses.filter(
														(selectedClass) => selectedClass.id !== element.id
													)
											  )
											: setSelectedClasses(
													selectedClasses.concat({
														id: element.id,
														short: element.short,
														name: element.header,
													})
											  );
									}}
									key={index}
								>
									<strong>{element.header}</strong>
									<p className="list_subtitle">{element.content}</p>
								</div>
							);
						})}
					</div>
				</div>
			));
		}

		return (
			<SearchClasses
				searchQuery={searchQuery}
				schoolId={schoolID}
				isOnboarding
				selectedClasses={selectedClasses}
				setSelectedClasses={setSelectedClasses}
			/>
		);
	}

	const InputForm = ({ title, placeholder, icon }) => (
		<>
			<p style={{ fontWeight: "500" }}>{title}</p>
			<div className="hub_card search username">
				<svg className="nav_search_icon">
					<use xlinkHref={"#" + icon} />
				</svg>
				<input
					type="search"
					className="search_input w-input"
					placeholder={placeholder}
					style={{ padding: "4px" }}
				/>
			</div>
		</>
	);

	const AddClassForm = () => (
		<form
			noValidate
			className="form_block w-form"
			style={{ position: "relative" }}
			onSubmit={(e) => e.preventDefault()}
		>
			<InputForm
				title="Class Name:"
				placeholder="Ex. Data Structures and Algorithms"
				icon="user_add"
			/>

			<InputForm
				title="Class Code:"
				placeholder="Ex. ITSC 2214"
				icon="user_add"
			/>

			<InputForm
				title="Teacher First Name:"
				placeholder="Ex. Bruce"
				icon="user_add"
			/>

			<InputForm
				title="Teacher Last Name:"
				placeholder="Ex. Long"
				icon="user_add"
			/>

			<div>
				<button
					className="button select no_margin"
					onClick={() => setShowAddClass(false)}
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
				placeholder="Search All Classes"
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
					onClick={() => setShowAddClass(!showAddClass)}
				>
					Request New Class
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

			<h3>{showAddClass ? "Request Your Class!" : "Add Your Classes"}</h3>

			<p>Can't find your classes? Request them below!</p>

			{showAddClass ? <AddClassForm /> : <DefaultContent />}

			<div className="flex_stretch"></div>

			<OnboardingNavigation page="classes" />
		</>
	);
}
