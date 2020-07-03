import React from "react";

export default function SchoolResultCard({ school, schoolId, setSchool }) {
	return (
		<div
			className={
				"hub_card" + (school.objectID === schoolId ? " selected" : " hoverable")
			}
			style={{ padding: 15, textAlign: "center" }}
			onClick={() => {
				if (school.objectID === schoolId) setSchool(null);
				else
					setSchool({
						id: school.objectID,
						name: school.name,
						short: school.short,
					});
			}}
		>
			<svg
				style={{
					height: "48px",
					width: "48px",
					marginBottom: "10px",
				}}
			>
				<use xlinkHref="#school" />
			</svg>

			<div style={{ fontSize: "16px", lineHeight: "22px" }}>
				<strong>{school.name}</strong>
				<p className="list_subtitle" style={{ marginTop: "5px" }}>
					{school.short}
				</p>
			</div>
		</div>
	);
}
