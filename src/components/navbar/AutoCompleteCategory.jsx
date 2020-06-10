import React from "react";

export default function Category(name, icon, elements) {
	return (
		<div className="search_auto_section" key={name}>
			<strong>{name}</strong>
			{elements.map((element, index) => (
				<div className="search_auto_child" key={index}>
					<svg
						style={{
							width: "24px",
							height: "24px",
							marginRight: "17px",
							marginBottom: "3px",
							fill: "#788699",
						}}
					>
						<use xlinkHref={"#" + icon} />
					</svg>
					<div>
						<strong>{element.title}</strong>
						<p className="list_subtitle">{element.description}</p>
					</div>
				</div>
			))}
		</div>
	);
}
