import React from "react";

export default function SortList({ list }) {
	return list ? (
		<div>
			<div className="hub_subtitle">
				<strong>Sort By:</strong>
			</div>
			<div className="hub_dropdown_div">
				<div>
					<strong className="main_color">{list[0]}</strong>
				</div>
				<div className="dropdown_div">
					{list.map((element) => (
						<div className="list_div dropdown" key={element}>
							<strong>{element}</strong>
						</div>
					))}
				</div>
			</div>
		</div>
	) : null;
}
