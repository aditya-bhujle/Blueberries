import React from "react";
import { NavLink } from "react-router-dom";

export default function MenuLink({ content, icon, link, selected, submenu }) {
	const className = `list_div category ${submenu ? "submenu" : "menu"}`;
	return (
		<NavLink
			exact
			to={link || "/school"}
			className={className}
			activeClassName="selected"
		>
			<svg className="menu_svg">
				<use xlinkHref={`#${icon}`} />
			</svg>
			<strong className="menu_link">{content}</strong>
		</NavLink>
	);
}
