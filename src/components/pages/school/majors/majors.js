import React, { useState, useEffect } from "react";

import ContentTitle from "../../../header/ContentTitle";
import Content from "./Content";
import { useLocation, Redirect } from "react-router-dom";
import SearchMajors from "./SearchMajors";
import { CardSearch } from "../../../cards/CenterCards";

export default function SchoolPosts({ sidebar, schoolRef }) {
	const [sortQuery, setSortQuery] = useState({
		title: "Top",
		query: "members",
		desc: true,
	});

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
			<ContentTitle
				header={
					searchQuery ? `Search results for "${searchQuery}"` : "All Majors"
				}
				sortList={[
					{ title: "Top", query: "members", desc: true },
					{ title: "Alphabetical", query: "name" },
				]}
				sortQuery={sortQuery}
				setSortQuery={(query) => setSortQuery(query)}
			/>
			<div className="hub_column_layout">
				<div className="hub_content">
					<p>
						Can't find your major? <a>Add it here.</a>
					</p>

					<CardSearch
						placeholder="Search All Majors"
						searchHub={(query) => setSearchQuery(query)}
						defaultValue={searchQuery}
					/>

					{!searchQuery && !loading && (
						<Content
							schoolRef={schoolRef}
							sortQuery={sortQuery.query}
							sortQueryOrder={sortQuery.desc ? "desc" : "asc"}
						/>
					)}

					{searchQuery && (
						<SearchMajors
							searchQuery={searchQuery}
							hubRef={schoolRef}
							loc={loc}
						/>
					)}
				</div>
				{sidebar}
			</div>
		</>
	);
}
