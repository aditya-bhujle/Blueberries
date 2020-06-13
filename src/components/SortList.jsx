import React from "react";

export default function SortList({ list, ...props }) {
	return list ? (
		<div>
			<div className="hub_subtitle">
				<strong>Sort By:</strong>
			</div>
			<div className="hub_dropdown_div">
				{props.sortQuery && ( //TEMP SOLUTION UNTIL WE ADD sortQuery TO COMMENTS!
					<strong className="main_color">{props.sortQuery.title}</strong>
				)}
				<div className="dropdown_div">
					{list.map((element) => (
						<strong
							className="list_div dropdown"
							key={element.title}
							onClick={() => {
								props.setSortQuery(element);
							}}
						>
							{element.title}
						</strong>
					))}
				</div>
			</div>
		</div>
	) : null;
}
