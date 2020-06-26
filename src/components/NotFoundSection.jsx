import React from "react";
export default function NotFoundSection({ text }) {
	return (
		<div className="section center">
			<div className="hub_card" style={{ padding: "25px 30px 15px" }}>
				<svg height="48" width="100%" style={{ marginBottom: "10px" }}>
					<use xlinkHref="#warning" />
				</svg>
				<h3>Unfortunately, this {text} cannot be found</h3>
				<p>If you think this is an error, please contact the owners</p>
			</div>
		</div>
	);
}
