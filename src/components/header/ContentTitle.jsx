import React from "react"
import SortList from "../SortList"

export default function ContentTitle({ header, sortList, content, subtitle }) {
	return (
		<div className={"hub_title_div" + (content ? " content" : "")}>
			<h3>{header}</h3>
			<SortList list={sortList}/>
			{subtitle && (
				<div className="hub_subtitle">
					<strong>{subtitle}</strong>
				</div>
			)}
		</div>
	);
}
