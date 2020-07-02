import React, { useState, useEffect } from "react";
import HubPost from "./HubPosts";
import ContentTitle from "../header/ContentTitle";
import { useLocation, Redirect } from "react-router-dom";
import { CardSearch, CardCreate } from "../cards/CenterCards";
import HubResults from "./HubResults";
import DashboardPost from "./DashboardPosts";

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

	const [searchQuery, setSearchQuery] = useState("");
	const loc = useLocation();
	const [loading, setLoading] = useState(true);

	const [created, setCreated] = useState([]);

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
						{ title: "Comments", query: "comments", desc: true },
					]
				}
				sortQuery={sortQuery}
				setSortQuery={(query) => setSortQuery(query)}
			/>
			<div className="hub_column_layout">
				<div className="hub_content">
					{props.thoughts ? (
						props.children
					) : (
						<>
							<CardSearch
								placeholder={props.searchPlaceholder || "Search Popular Posts"}
								searchHub={(query) => setSearchQuery(query)}
								defaultValue={searchQuery}
							/>
							<CardCreate
								{...props.create}
								postRef={hubRef}
								addCreated={(postInfo) => setCreated(created.concat(postInfo))}
							/>
						</>
					)}
					{!searchQuery &&
						!loading &&
						(!props.dashboard ? (
							<HubPost
								created={created}
								collectionRef={props.hubPostQuery || hubRef}
								info={hubInfo}
								sortQuery={sortQuery.query}
								sortQueryOrder={sortQuery.desc ? "desc" : "asc"}
								hideCategory={props.hideCategory}
								loc={loc}
							/>
						) : (
							<DashboardPost
								created={created}
								sortQuery={sortQuery.query}
								sortQueryOrder={sortQuery.desc ? "desc" : "asc"}
								loc={loc}
							/>
						))}
					{searchQuery &&
						(!props.dashboard ? (
							<HubResults
								searchQuery={searchQuery}
								hubRef={hubRef}
								info={hubInfo}
								loc={loc}
							/>
						) : (
							<h1>dashboard search</h1>
						))}
				</div>
				{props.sidebar}
			</div>
		</>
	);
}
