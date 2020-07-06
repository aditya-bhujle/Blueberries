import React, { useState, useEffect } from "react";

import ContentTitle from "../../../header/ContentTitle";
import Content from "./Content";
import { useLocation, Redirect, useParams } from "react-router-dom";
import { CardSearch } from "../../../cards/CenterCards";
import SearchClasses from "./SearchClasses";

export default function SchoolPosts({ sidebar, schoolRef, schoolInfo }) {
	const [searchQuery, setSearchQuery] = useState("");
	const loc = useLocation();
	const [loading, setLoading] = useState(true);
	const { schoolId } = useParams();

	useEffect(() => {
		let searchHash = new URLSearchParams(loc.search).get("search");
		setSearchQuery(searchHash);
		setLoading(false);
	}, [loc.search]);

	let documentTitle;
	if (searchQuery) documentTitle = `Search Results for "${searchQuery}"`;
	else if (schoolInfo && schoolInfo.short)
		documentTitle = "Classes - " + schoolInfo.short + " - " + schoolInfo.name;
	else documentTitle = "Classes";
	document.title = documentTitle + " | Blueberries";

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
						<SearchClasses searchQuery={searchQuery} schoolId={schoolId} />
					)}
				</div>
				{sidebar}
			</div>
		</>
	);
}
