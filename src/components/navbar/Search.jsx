import algoliasearch from "algoliasearch/lite";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import AutoComplete from "./AutoComplete";

export default function Search() {
	const userInfo = useContext(UserContext);

	const [loading, setLoading] = useState(false);
	const [searchResults, setSearchResults] = useState([]);
	const [searchQuery, setSearchQuery] = useState("");

	useEffect(() => {
		const fetchData = async () => {
			const searchClient = algoliasearch(
				"N0TPLXF71A",
				"189999656c32b0f21e6c06df407b5f3c"
			);

			const queries = [
				{
					indexName: "schools",
					query: searchQuery,
				},
				{
					indexName: userInfo.school.id,
					query: searchQuery,
				},
			];

			try {
				const fetchSearches = await searchClient.search(queries);
				setSearchResults(fetchSearches.results);
			} catch (error) {
				console.error(error);
			}

			setLoading(true);
		};

		if (userInfo && searchQuery) fetchData();
		if (!searchQuery) setLoading(false);
	}, [searchQuery, userInfo]);

	if (!userInfo)
		return (
			<form noValidate className="form_block w-form nav user" role="search">
				<div className="hub_card search nav">
					<svg className="nav_search_icon">
						<use xlinkHref="#search" />
					</svg>
					<input
						type="search"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.currentTarget.value)}
						className="search_input w-input"
						placeholder="Type something here..."
						style={{ padding: "4px" }}
					/>
				</div>
			</form>
		);

	const SchoolHits = ({ hits }) => {
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

	const MainHits = ({ hits }) => {
		if (!hits.length) return null;

		const categories = sortHits(hits);

		return Object.values(categories).map((category, index) => (
			<AutoComplete category={category} key={index} />
		));
	};

	return (
		<form
			noValidate
			className="form_block w-form nav user"
			style={{ position: "relative" }}
			role="search"
		>
			<div className={"hub_card search nav" + (searchQuery ? " open" : "")}>
				<svg className="nav_search_icon">
					<use xlinkHref="#search" />
				</svg>
				<input
					type="search"
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.currentTarget.value)}
					className="search_input w-input"
					placeholder="Type something here..."
					style={{ padding: "4px" }}
				/>
			</div>

			{searchQuery && loading && (
				<div className="search_autocomplete">
					<SchoolHits hits={searchResults[0].hits} />
					<MainHits hits={searchResults[1].hits} />
					{!searchResults[0].nbHits && !searchResults[1].nbHits && (
						<p style={{ marginBottom: "0px" }}>No results found</p>
					)}
				</div>
			)}
		</form>
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
