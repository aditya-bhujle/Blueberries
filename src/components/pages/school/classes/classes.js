import React, { useState, useEffect } from "react";

import ContentTitle from "../../../header/ContentTitle";
import Content from "./Content";
import { useLocation, Redirect, useParams } from "react-router-dom";
import { CardSearch } from "../../../cards/CenterCards";
import SearchClasses from "./SearchClasses";
import NewClass from "../../onboarding/requests/NewClass";

export default function SchoolPosts({ sidebar, schoolRef, schoolInfo }) {
	const [searchQuery, setSearchQuery] = useState("");
	const loc = useLocation();
	const [loading, setLoading] = useState(true);
	const { schoolId } = useParams();

	const [showAddClass, setShowAddClass] = useState(false);

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

	const DefaultContent = () => (
		<>
			<p>
				Can't find your class?{" "}
				<a
					className="text_link"
					style={{ cursor: "pointer" }}
					onClick={() => setShowAddClass(true)}
				>
					Add it here.
				</a>
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
		</>
	);

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
					{showAddClass ? (
						<NewClass
							schoolID={schoolId}
							schoolShort={schoolInfo.short}
							setShowAddClass={(bool) => setShowAddClass(bool)}
						/>
					) : (
						<DefaultContent />
					)}
				</div>
				{sidebar}
			</div>
		</>
	);
}
