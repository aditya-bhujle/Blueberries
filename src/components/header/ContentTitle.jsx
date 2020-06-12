import React from "react";
import SortList from "../SortList";

export default function ContentTitle({
	header,
	sortList,
	content,
	subtitle,
	...setQueryProps
}) {
	return (
		<div className={"hub_title_div" + (content ? " content" : "")}>
			<h3>{header}</h3>
			<SortList list={sortList} {...setQueryProps} />
			{subtitle && (
				<div className="hub_subtitle">
					<strong>{subtitle}</strong>
				</div>
			)}
		</div>
	);
}
