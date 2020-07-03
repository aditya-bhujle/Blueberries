import React, { useState, useEffect } from "react";
import algoliasearch from "algoliasearch/lite";
import SpinLoad from "../../../SpinLoad";

export default function SchoolResults({ searchQuery, schoolId, children }) {
	const [algoliaLoading, setAlgoliaLoading] = useState(true);
	const [searchResults, setSearchResults] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			setAlgoliaLoading(true);

			const searchClient = algoliasearch(
				"N0TPLXF71A",
				"189999656c32b0f21e6c06df407b5f3c"
			);

			const index = searchClient.initIndex("schools");

			try {
				let fetchSearches = await index.search(searchQuery);
				setSearchResults(fetchSearches.hits);
				console.log(fetchSearches.hits)
			} catch (error) {
				console.error(error);
			}

			setAlgoliaLoading(false);
		};

		fetchData();
	}, [searchQuery]);

	if (algoliaLoading) return <SpinLoad big />;

	if (!searchResults.length)
		return (
			<p style={{ textAlign: "center" }} className="flex_stretch">
				No results
			</p>
		);

	return (
		<div className="list_grid_div onboarding_school">
			{searchResults.map((school, index) => children(school))}
		</div>
	);
}
