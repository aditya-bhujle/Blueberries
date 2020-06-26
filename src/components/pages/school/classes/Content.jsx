import React, { useEffect, useState } from "react";
import { CardSearch } from "../../../cards/CenterCards";
import { Link, useParams } from "react-router-dom";
import SpinLoad from "../../../SpinLoad";

export default function SchoolClassesContent({ schoolRef }) {
	const param = useParams(); //schoolId

	const [classes, setClasses] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				let fetchPosts;
				fetchPosts = await schoolRef
					.orderBy("field")
					.orderBy("members", "desc")
					.get();
				setClasses(fetchPosts.docs);
			} catch (error) {
				console.error(error);
			}

			setLoading(false);
		};

		console.log("USEEFFEECTE!")
		fetchData();
	}, []);

	//[{name: "College of Computing and Informatics", content: [{header: "test", content: "ITSC 2214"}]}]

	let previousField = "testing field";
	let fieldArray = [];
	if (!loading) {
		classes.forEach((schoolClass) => {
			let classData = schoolClass.data();
			if (classData.field !== previousField)
				fieldArray.push({ name: classData.field, content: [] });

			fieldArray[fieldArray.length - 1].content.push({
				header: classData.name,
				content: `${classData.short} ⋅ ${classData.members} Students`,
				id: schoolClass.id,
			});
			previousField = classData.field;
		});
	}

	return (
		<div className="hub_content">
			<p>
				Can't find your class? <a>Add it here.</a>
			</p>
			<CardSearch placeholder="Search All Classes" />

			{!loading ? (
				fieldArray.map((field, index) => (
					<div className="hub_card" key={index}>
						<h4 className="main_color">
							<strong>{field.name}</strong>
						</h4>
						<div className="list_grid_div">
							{field.content.map((element, index) => (
								<Link to={`/schools/${param.schoolId}/classes/${element.id}`} className="list_div w-clearfix" key={index}>
									<strong>{element.header}</strong>
									<p className="list_subtitle">{element.content}</p>
								</Link>
							))}
						</div>
					</div>
				))
			) : (
				<div style={{ textAlign: "center" }}>
					<SpinLoad/>
				</div>
			)}
		</div>
	);
}
