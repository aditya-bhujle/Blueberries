import React, { useState } from "react";
import { useToasts } from "react-toast-notifications";
import { db } from "../../../../firebase/config";
import InputForm from "./InputForm";

export default function NewClass({ schoolShort, schoolID, setShowAddClass }) {
	const { addToast } = useToasts();

	const [newClassInfo, setNewClassInfo] = useState({});

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

	const inputProps = {
		hook: newClassInfo,
		setHook: (hook) => setNewClassInfo(hook),
	};

	return (
		<form
			className="form_block w-form flex_stretch onboarding"
			style={{ position: "relative" }}
			onSubmit={createClass}
		>
			<InputForm
				title="Class Name:"
				placeholder="Ex. Data Structures and Algorithms"
				prop="name"
				{...inputProps}
			/>

			<InputForm
				title="Class Code:"
				placeholder="Ex. ITSC 2214"
				prop="short"
				{...inputProps}
			/>

			<InputForm
				title="Class Department:"
				placeholder="Ex. College of Computing and Informatics"
				prop="field"
				{...inputProps}
			/>

			<InputForm
				title="Teacher First Name:"
				placeholder="Ex. Bruce"
				prop="teacher_first"
				{...inputProps}
			/>

			<InputForm
				title="Teacher Last Name:"
				placeholder="Ex. Long"
				prop="teacher_last"
				{...inputProps}
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
}
