import React from "react";
import { Link } from "react-router-dom";

export default function AutoComplete({ category }) {
	if (!category.elements.length) return null;

	return (
		<div className="search_auto_section" key={category.name}>
			<strong>{category.name}</strong>
			{category.elements &&
				category.elements.map((element, index) => (
					<Link className="search_auto_child" to={element.link} key={index}>
						<svg
							style={{
								width: "24px",
								height: "24px",
								marginRight: "17px",
								marginBottom: "3px",
								fill: "#788699",
							}}
						>
							<use xlinkHref={"#" + category.icon} />
						</svg>
						<div>
							<strong>{element.name}</strong>
							<p className="list_subtitle">{element.description}</p>
						</div>
					</Link>
				))}
		</div>
	);
}
