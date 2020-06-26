import React, { useState, useEffect } from "react";

import ContentTitle from "../../../header/ContentTitle";
import Content from "./Content";
import { useLocation, Redirect } from "react-router-dom";
import { CardSearch } from "../../../cards/CenterCards";
import SearchClasses from "./SearchClasses";

export default function SchoolPosts({ sidebar, schoolRef }) {
	const [searchQuery, setSearchQuery] = useState("");
	const loc = useLocation();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		let searchHash = new URLSearchParams(loc.search).get("search");
		setSearchQuery(searchHash);
		setLoading(false);
	}, [loc.search]);

	return (
		<>
			{!loading && (
				<Redirect
					to={loc.pathname + (searchQuery ? `?search=${searchQuery}` : "")}
				/>
			)}
			<ContentTitle header="All Classes" />
			<div className="hub_column_layout">
				<div className="hub_content">
					<p>
						Can't find your class? <a>Add it here.</a>
					</p>

					<CardSearch
						placeholder="Search All Classes"
						searchHub={(query) => setSearchQuery(query)}
						defaultValue={searchQuery}
					/>

					{!searchQuery && !loading && <Content schoolRef={schoolRef} />}

					{searchQuery && (
						<SearchClasses searchQuery={searchQuery} hubRef={schoolRef} />
					)}
				</div>
				{sidebar}
			</div>
		</>
	);
}
