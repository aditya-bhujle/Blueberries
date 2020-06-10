import React from "react";

export default function Hit({ hit }) {
	console.log(hit);
	return (
		<div className="search_auto_section">
			<strong>{hit.type}</strong>
			<div className="search_auto_child">
				<svg
					style={{
						width: "24px",
						height: "24px",
						marginRight: "17px",
						marginBottom: "3px",
						fill: "#788699",
					}}
				>
					<use xlinkHref={"#flask"} />
				</svg>
				<div>
					<strong>{hit.name}</strong>
					<p className="list_subtitle">{hit.short}</p>
				</div>
			</div>
		</div>
	);
	/*
	return (
		<div className="search_autocomplete">
			{category.map((section) => (
				<div className="search_auto_section" key={section.name}>
					<strong>{section.name}</strong>
					{section.elements.map((element, index) => (
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
								<use xlinkHref={"#" + section.icon} />
							</svg>
							<div>
								<strong>{element.title}</strong>
								<p className="list_subtitle">{element.description}</p>
							</div>
						</div>
					))}
				</div>
			))}
		</div>
	);*/
}
