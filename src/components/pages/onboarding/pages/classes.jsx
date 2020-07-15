import React, { useState, useEffect } from "react";
import { CardSearch } from "../../../cards/CenterCards";
import { useLocation, Redirect } from "react-router-dom";
import { db } from "../../../../firebase/config";
import SpinLoad from "../../../SpinLoad";
import SearchClasses from "../../school/classes/SearchClasses";
import OnboardingNavigation from "../Navigation";
import { useToasts } from "react-toast-notifications";

export default function ClassesOnboarding({
	schoolID,
	schoolShort,
	selectedClasses,
	setSelectedClasses,
}) {
	const { addToast } = useToasts();

	const [classes, setClasses] = useState([]);
	const [loading, setLoading] = useState(true);

	const [showAddClass, setShowAddClass] = useState(false);
	const [newClassInfo, setNewClassInfo] = useState({});

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
					.collection("classes")
					.onSnapshot((querySnapshot) => {
						console.log("Class info set!");

						setClasses(querySnapshot.docs);
						setLoading(false);
					});
			} catch (error) {
				console.error(error);
			}
		};

		if (schoolID) fetchData();
	}, [schoolID]);

	document.title = "Onboarding - Classes | Blueberries";

	async function createClass(e) {
		e.preventDefault();

		const { teacher_first, teacher_last, field, ...classInfo } = newClassInfo;
		classInfo.members = 0;
		classInfo.school_short = schoolShort;

		try {
			const classCollection = db
				.collection("schools")
				.doc(schoolID)
				.collection("classes");

			const classData = {
				...classInfo,
				field: field,
			};

			const teacherData = {
				...classInfo,
				first_name: teacher_first,
				last_name: teacher_last,
			};

			const { id: classId } = await classCollection.add(classData);

			const { id: teacherId } = await classCollection
				.doc(classId)
				.collection("teachers")
				.add(teacherData);

			const teachers = {};
			teachers["teachers." + teacherId] = {
				first_name: teacher_first,
				last_name: teacher_last,
				members: 0,
			};

			await classCollection.doc(classId).update(teachers);
		} catch (error) {
			console.error(error);
		}

		addToast(`${newClassInfo.name} Successfully Created!`, {
			appearance: "success",
			autoDismiss: true,
		});
		console.log(`${newClassInfo.name} successfully created!`);
		setNewClassInfo({});
		setShowAddClass(false);
	}

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

	const InputForm = ({ title, placeholder, prop }) => (
		<>
			<p style={{ fontWeight: "500" }}>{title + " *"}</p>
			<div className="hub_card search username">
				<input
					className="search_input w-input"
					placeholder={placeholder}
					style={{ padding: "4px" }}
					value={newClassInfo[prop]}
					onChange={(e) => {
						const newInfo = newClassInfo;
						newInfo[prop] = e.currentTarget.value;
						setNewClassInfo(newInfo);
					}}
					required
				/>
			</div>
		</>
	);

	const AddClassForm = () => (
		<form
			className="form_block w-form flex_stretch onboarding"
			style={{ position: "relative" }}
			onSubmit={createClass}
		>
			<InputForm
				title="Class Name:"
				placeholder="Ex. Data Structures and Algorithms"
				prop="name"
			/>

			<InputForm title="Class Code:" placeholder="Ex. ITSC 2214" prop="short" />

			<InputForm
				title="Class Department:"
				placeholder="Ex. College of Computing and Informatics"
				prop="field"
			/>

			<InputForm
				title="Teacher First Name:"
				placeholder="Ex. Bruce"
				prop="teacher_first"
			/>

			<InputForm
				title="Teacher Last Name:"
				placeholder="Ex. Long"
				prop="teacher_last"
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
		<div className="flex_stretch onboarding">
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
		</div>
	);

	return (
		<>
			{!urlLoading && (
				<Redirect
					to={loc.pathname + (searchQuery ? `?search=${searchQuery}` : "")}
				/>
			)}

			<h3>{showAddClass ? "Request Your Class!" : "Add Your Classes"}</h3>

			{!showAddClass && <p>Can't find your classes? Request them below!</p>}

			{showAddClass ? <AddClassForm /> : <DefaultContent />}

			<OnboardingNavigation page="classes" />
		</>
	);
}
