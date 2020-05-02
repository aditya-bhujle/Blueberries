import React, { useState } from "react";

export default function SubMenuLink({
	content,
	icon,
	selected,
	submenu,
	expand,
	children,
}) {
	const [dropped, setDropped] = useState(true);
	let svgClassname =
		"menu_svg" + (selected ? " active" : submenu ? " submenu" : "");

	return (
		<>
			<div
				className={`list_div category 
						${submenu ? "submenu" : "menu"}
						${selected ? "selected" : ""}`}
				onClick={() => setDropped(!dropped)}
				style={{ cursor: "pointer" }}
			>
				<svg className={svgClassname}>
					<use xlinkHref={`#${icon}`} />
				</svg>
				<strong className="menu_link">{content}</strong>
				{expand && (
					<svg className={svgClassname}>
						<use xlinkHref={dropped ? "#up" : "#down"} />
					</svg>
				)}
			</div>
			{expand && dropped && <div className="submenu_div">{children}</div>}
		</>
	);
}
