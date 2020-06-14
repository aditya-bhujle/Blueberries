import React, { useState, useEffect } from "react";
import HubPost from "./HubPosts";
import ContentTitle from "../header/ContentTitle";
import { useLocation, Redirect } from "react-router-dom";
import { CardSearch } from "../cards/CenterCards";

export default function HubPostSystem({
	contentTitle,
	contentList,
	hubRef,
	hubInfo,
	...props
}) {
	const [sortQuery, setSortQuery] = useState({
		title: "New",
		query: "date_posted",
		desc: true,
	});

	//POST SEARCH
	const [searchQuery, setSearchQuery] = useState("");
	const loc = useLocation();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		let searchHash = new URLSearchParams(loc.search).get("search");
		setSearchQuery(searchHash);
		setLoading(false);
	}, [loc.search]);

	function searchHub(query) {
		if (query) console.log("Searched for " + query);
		else console.log("Search reset!");
		setSearchQuery(query);
	}

	return (
		<>
			{!loading && (
				<Redirect
					to={loc.pathname + (searchQuery ? `?search=${searchQuery}` : "")}
				/>
			)}
			{/* END POST SEARCH */}
			<ContentTitle
				header={
					searchQuery
						? `Search results for "${searchQuery}"`
						: contentTitle || "Popular Posts"
				}
				sortList={
					contentList || [
						{ title: "Hot", query: "likeCount", desc: true },
						{ title: "Top", query: "likeCount", desc: true },
						{ title: "Disputed", query: "likeCount" },
						{ title: "New", query: "date_posted", desc: true },
						{ title: "Old", query: "date_posted" },
					]
				}
				sortQuery={sortQuery}
				setSortQuery={(query) => setSortQuery(query)}
			/>
			<div className="hub_column_layout">
				<div className="hub_content">
					<CardSearch
						placeholder="Search Popular Posts"
						searchHub={searchHub}
						defaultValue={searchQuery}
					/>
					{props.children}
					<HubPost
						postRef={props.hubPostQuery || hubRef}
						info={hubInfo}
						sortQuery={sortQuery.query}
						sortQueryOrder={sortQuery.desc ? "desc" : "asc"}
						hideCategory={props.hideCategory}
						loc={loc}
					/>
				</div>
				{props.sidebar}
			</div>
		</>
	);
}
