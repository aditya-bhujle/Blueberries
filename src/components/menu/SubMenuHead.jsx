import React, { useState } from "react";
import { NavLink, useRouteMatch, useLocation } from "react-router-dom";

export default function SubMenuLink({
	content,
	icon,
	link,
	siblingLinks,
	submenu,
	children,
	notExact,
}) {
	const [dropped, setDropped] = useState(true);

	let location = useLocation().pathname;

	let routeMatch = useRouteMatch(link);

	let selected;
	if (notExact) selected = routeMatch;
	else selected = routeMatch ? routeMatch.isExact : false;

	function toggleDropdown() {
		selected ? setDropped(!dropped) : setDropped(true);
	}

	siblingLinks &&
		siblingLinks.forEach((siblingLink) => {
			if (link + siblingLink === location) selected = true;
		});

	return (
		<>
			<NavLink
				className={`list_div category menu${submenu ? " sub head" : ""}`}
				onClick={toggleDropdown}
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
