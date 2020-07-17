import React from "react";

export default function InputForm({ title, placeholder, prop, hook, setHook }) {
	return (
		<>
			<p style={{ fontWeight: "500" }}>{title + " *"}</p>
			<div className="hub_card search username">
				<input
					className="search_input w-input"
					placeholder={placeholder}
					style={{ padding: "4px" }}
					value={hook[prop]}
					onChange={(e) => {
						const newInfo = hook;
						newInfo[prop] = e.currentTarget.value;
						setHook(newInfo);
					}}
					required
				/>
			</div>
		</>
	);
}
