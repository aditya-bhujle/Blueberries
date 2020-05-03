import React from "react";
import { NavLink } from "react-router-dom";

export default function MenuLink({ content, icon, link, submenu }) {
	return (
		<NavLink
			exact
			to={link || "/notfound"}
			className={`list_div category menu ${submenu ? "sub" : ""}`}
			activeClassName="selected"
		>
			<svg className="menu_svg">
				<use xlinkHref={`#${icon}`} />
			</svg>
			<strong className="menu_link">{content}</strong>
		</NavLink>
	);
}
