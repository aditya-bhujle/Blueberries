import algoliasearch from "algoliasearch/lite";
import React, { useContext, useState } from "react";
import {
	connectHits,
	InstantSearch,
	connectSearchBox,
	Index,
	connectStateResults,
} from "react-instantsearch-dom";
import { UserContext } from "../../App";
import AutoComplete from "./AutoComplete";

export default function Search() {
	const userInfo = useContext(UserContext);

	if (!userInfo)
		return (
			<form noValidate className="form_block w-form nav user" role="search">
				<div className="hub_card search nav">
					<svg className="nav_search_icon">
						<use xlinkHref="#search" />
					</svg>
					<input
						type="search"
						className="search_input w-input"
						placeholder="Type something here..."
						style={{ padding: "4px" }}
					/>
				</div>
			</form>
		);

	const searchClient = algoliasearch(
		"N0TPLXF71A",
		"189999656c32b0f21e6c06df407b5f3c"
	);

	const AllResults = connectStateResults(
		({ allSearchResults, searchState, children }) => {
			/* 
				ALGOLIA ISSUE https://github.com/algolia/react-instantsearch/issues/2875
				BUG #1 - Search results show empty with no p text because of this issue
			if (
				allSearchResults &&
				allSearchResults.schools &&
				allSearchResults[userInfo.school.id]
			) {
				console.log("School Query:");
				console.log(allSearchResults.schools.query);

				console.log("SCATS Query:");
				console.log(allSearchResults[userInfo.school.id].query);
			}*/

			if (!searchState.query)
				return (
					<>
						<Index indexName="schools" />
						<Index indexName={userInfo.school.id} />
					</>
				);

			const hasResults =
				allSearchResults &&
				Object.values(allSearchResults).some((results) => {
					return results.nbHits > 0;
				});

			return !hasResults ? (
				<div className="search_autocomplete">
					<Index indexName="schools" />
					<Index indexName={userInfo.school.id} />
					<p style={{ marginBottom: "0px" }}>No results found</p>
				</div>
			) : (
				children
			);
		}
	);

	const NewHits = ({ hits }) => {
		//console.log("New Hits are ");
		//console.log(hits);
		if (!hits.length) return null;

		const categories = sortHits(hits);

		return Object.values(categories).map((category, index) => (
			<AutoComplete category={category} key={index} />
		));
	};
	const CustomHits = connectHits(NewHits);

	const schoolHits = ({ hits }) => {
		//console.log("New School Hits are ");
		//console.log(hits);

		if (!hits.length) return null;
		return (
			<AutoComplete
				category={{
					name: "Schools",
					icon: "school",
					elements: hits.map((school) => {
						return {
							name: school.name,
							description: school.short,
							link: "/schools/" + school.objectID,
						};
					}),
				}}
			/>
		);
	};
	const CustomSchoolHits = connectHits(schoolHits);

	const SearchBox = ({ currentRefinement, refine }) => (
		<div className={"hub_card search nav" + (currentRefinement ? " open" : "")}>
			<svg className="nav_search_icon">
				<use xlinkHref="#search" />
			</svg>
			<input
				type="search"
				value={currentRefinement}
				onChange={(event) => refine(event.currentTarget.value)}
				className="search_input w-input"
				placeholder="Type something here..."
				style={{ padding: "4px" }}
			/>
		</div>
	);

	const CustomSearchBox = connectSearchBox(SearchBox);

	return (
		<InstantSearch searchClient={searchClient} indexName="schools">
			<form
				noValidate
				className="form_block w-form nav user"
				style={{ position: "relative" }}
				role="search"
			>
				<CustomSearchBox />

				<AllResults>
					<div className="search_autocomplete">
						<Index indexName="schools">
							<CustomSchoolHits />
						</Index>
						<Index indexName={userInfo.school.id}>
							<CustomHits />
						</Index>
					</div>
				</AllResults>
			</form>
		</InstantSearch>
	);

	function sortHits(hits) {
		let categories = {
			school: { name: "Schools", icon: "school", elements: [] },
			class: { name: "Classes", icon: "flask", elements: [] },
			other: { name: "other", icon: "school", elements: [] },
		};

		hits.forEach((element) => {
			switch (element.type) {
				case "school":
					categories.school.elements.push({
						name: element.name,
						description: element.short,
						link: "/schools/" + element.objectID,
					});
					break;

				case "class":
					categories.class.elements.push({
						name: element.name,
						description: element.short,
						link:
							"/schools/" + userInfo.school.id + "/classes/" + element.objectID,
					});
					break;

				default:
					categories.other.elements.push({
						name: element.name,
						description: "This is an other",
						link: "/unknown/" + element.objectID,
					});
					break;
			}
		});

		return categories;
	}
}
