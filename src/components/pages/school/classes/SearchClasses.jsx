import React, { useState, useEffect } from "react";
import algoliasearch from "algoliasearch/lite";
import SpinLoad from "../../../SpinLoad";
import { Link } from "react-router-dom";

export default function SearchClasses({
	searchQuery,
	schoolId,
	isOnboarding,
	...props
}) {
	const [algoliaLoading, setAlgoliaLoading] = useState(true);
	const [searchResults, setSearchResults] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			console.log("Fetchin data!");
			setAlgoliaLoading(true);

			const searchClient = algoliasearch(
				"N0TPLXF71A",
				"189999656c32b0f21e6c06df407b5f3c"
			);

			const index = searchClient.initIndex(schoolId);

			try {
				let fetchSearches = await index.search(searchQuery, {
					filters: `type:class`,
				});
				setSearchResults(fetchSearches.hits);
			} catch (error) {
				console.error(error);
			}

			setAlgoliaLoading(false);
		};

		fetchData();
	}, [schoolId, searchQuery]);

	if (algoliaLoading) return <SpinLoad big />;

	let previousField = "testing field";

	let fieldArray = [];
	searchResults.forEach((classData) => {
		if (classData.field !== previousField)
			fieldArray.push({ name: classData.field, content: [] });

		fieldArray[fieldArray.length - 1].content.push({
			header: classData.name,
			content: classData.short,
			id: classData.objectID,
		});
		previousField = classData.field;
	});

	if (!searchResults.length)
		return <p style={{ textAlign: "center" }}>No results</p>;

	return fieldArray.map((field, index) => (
		<div className="hub_card" key={index}>
			<h4 className="main_color">
				<strong>{field.name}</strong>
			</h4>
			{!isOnboarding && (
				<div className="list_grid_div">
					{field.content.map((element, index) => (
						<Link
							to={`/schools/${schoolId}/classes/${element.id}`}
							className="list_div w-clearfix"
							key={index}
						>
							<strong>{element.header}</strong>
							<p className="list_subtitle">{element.content}</p>
						</Link>
					))}
				</div>
			)}
			{isOnboarding && (
				<div className="list_grid_div onboarding_classes">
					{field.content.map((element, index) => {
						const isSelected = !!props.selectedClasses.filter(
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
										? props.setSelectedClasses(
												props.selectedClasses.filter(
													(selectedClass) => selectedClass.id !== element.id
												)
										  )
										: props.setSelectedClasses(
												props.selectedClasses.concat({
													id: element.id,
													short: element.content,
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
			)}
		</div>
	));
}
