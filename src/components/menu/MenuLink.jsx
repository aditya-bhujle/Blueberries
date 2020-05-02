import React from "react";
import { Link } from "react-router-dom";

export default function MenuLink({ content, icon, selected, submenu }) {
	return (
		<Link
			to="/school"
			className={`list_div category ${submenu ? "submenu" : "menu"} ${
				selected ? "selected" : ""
			}`}
		>
			<svg
				className={
					"menu_svg" + (selected ? " active" : submenu ? " submenu" : "")
				}
			>
				<use xlinkHref={`#${icon}`} />
			</svg>
			<strong className="menu_link">{content}</strong>
		</Link>
	);
}
