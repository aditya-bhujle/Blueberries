import React from "react";

export default function Header({ name, short, subShort }) {
	return (
		<div className="hub_header">
			<div>
				<div className="hub_parent_title">{short}</div>
				{subShort && (
					<>
						<div className="hub_parent_title">/</div>
						<div className="hub_teacher_title">ITSC 2214 Professor Long</div>
					</>
				)}
				<h2>{name}</h2>
			</div>
			<div>
				<button className="button w-button">Join Class</button>
				<button className="button select w-button">Leave Class</button>
			</div>
		</div>
	);
}
