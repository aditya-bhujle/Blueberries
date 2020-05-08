import React from "react";
import { NavLink } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

export default function MenuLink({ content, icon, link, submenu, loading }) {
	return (
		<NavLink
			exact
			to={link || "/notfound"}
			className={`list_div category menu ${submenu ? "sub" : ""}`}
			activeClassName="selected"
		>
			{loading ? (
				<Skeleton width={18} height={18} />
			) : (
				<svg className="menu_svg">
					<use xlinkHref={`#${icon}`} />
				</svg>
			)}
			<strong className="menu_link">
				{loading ? <Skeleton width={150} height={18}/> : content}
			</strong>
		</NavLink>
	);
}
