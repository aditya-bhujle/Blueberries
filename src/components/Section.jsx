import React from "react"

export default function Section({children}) {
	return (
		<div className="section">
			<div className="w-container">{children}</div>
		</div>
	);
}