import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

export default function SubMenuLink({
	content,
	icon,
	link,
	submenu,
	children,
}) {
	const [dropped, setDropped] = useState(true);
	let selected = useLocation().pathname === link;

	return (
		<>
			<NavLink
				exact
				className={`list_div category ${submenu ? "submenu" : "menu"}`}
				onClick={() => setDropped(!dropped)}
				to={link || "/"}
				activeClassName="selected"
			>
				<svg className="menu_svg">
					<use xlinkHref={`#${icon}`} />
				</svg>
				<strong className="menu_link">{content}</strong>
				{selected && (
					<svg className="menu_svg">
						<use xlinkHref={dropped ? "#up" : "#down"} />
					</svg>
				)}
			</NavLink>
			{selected && dropped && <div className="submenu_div">{children}</div>}
		</>
	);
}
