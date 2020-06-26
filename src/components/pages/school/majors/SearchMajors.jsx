import React, { useState, useEffect } from "react";
import algoliasearch from "algoliasearch/lite";
import SpinLoad from "../../../SpinLoad";
import { Link, useParams } from "react-router-dom";

export default function SearchMajors({ searchQuery, hubRef }) {
	const [algoliaLoading, setAlgoliaLoading] = useState(true);
	const [searchResults, setSearchResults] = useState([]);
	const { schoolId } = useParams();

	useEffect(() => {
		const fetchData = async () => {
			setAlgoliaLoading(true);

			const searchClient = algoliasearch(
				"N0TPLXF71A",
				"189999656c32b0f21e6c06df407b5f3c"
			);

			const index = searchClient.initIndex(schoolId);

			try {
				let fetchSearches = await index.search(searchQuery, {
					filters: `type:major`,
				});
				setSearchResults(fetchSearches.hits);
			} catch (error) {
				console.error(error);
			}

			setAlgoliaLoading(false);
		};

		fetchData();
	}, [searchQuery, hubRef.path]);

	if (algoliaLoading) return <SpinLoad big />;

	return (
		<>
			<div className="list_grid_div space_between">
				{searchResults.map((major, index) => (
					<Link
						to={`/schools/${schoolId}/majors/${major.objectID}`}
						className="hub_card bot_padding hoverable"
						style={{ padding: "15px 20px", textAlign: "center" }}
						key={index}
					>
						<strong>{major.name}</strong>
					</Link>
				))}
			</div>

			{!searchResults.length && (
				<p style={{ textAlign: "center" }}>No results</p>
			)}
		</>
	);
}
