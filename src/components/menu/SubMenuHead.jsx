import React, { useState } from "react";
import { NavLink, useRouteMatch } from "react-router-dom";

export default function SubMenuLink({
	content,
	icon,
	link,
	submenu,
	children,
}) {
	const [dropped, setDropped] = useState(true);
	let selected = useRouteMatch(link);

	function toggleDropdown() {
		selected ? setDropped(!dropped) : setDropped(true);
	}

	return (
		<>
			<NavLink
				exact
				className={`list_div category menu${submenu ? " sub head" : ""}`}
				onClick={toggleDropdown}
				to={link || "/"}
				activeClassName="selected"
			>
				<svg className="menu_svg">
					<use xlinkHref={`#${icon}`} />
				</svg>
				<strong className="menu_link">{content}</strong>
				{/*selected && (
					<svg className="menu_svg">
						<use xlinkHref={dropped ? "#up" : "#down"} />
					</svg>
				)*/}
			</NavLink>
			{//selected && dropped && <div className="submenu_div">{children}</div>
			}
		</>
	);
}
