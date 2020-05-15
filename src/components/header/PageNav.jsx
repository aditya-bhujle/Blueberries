import React from "react";
import { NavLink } from "react-router-dom";

export default function PageNav({ type, baseLink }) {
	let links;

	switch (type) {
		case "school":
			links = [
				{ content: "Posts", path: "", icon: "post" },
				{ content: "Majors", path: "/join/majors", icon: "rocket" },
				{ content: "Classes", path: "/join/classes", icon: "flask" },
				{ content: "Clubs", path: "/join/clubs", icon: "football" },
				{ content: "Chats", path: "/join/chats", icon: "chat" },
				{ content: "Events", path: "/events", icon: "calendar" },
			];
			break;

		case "class":
			links = [
				{ content: "Posts", path: "", icon: "post" },
				{ content: "Chat", path: "/chat", icon: "chat" },
				{ content: "Notes", path: "/notes", icon: "notes" },
				{ content: "Calendar", path: "/calendar", icon: "calendar" },
				{ content: "Thoughts", path: "/thoughts", icon: "thoughts" },
				{ content: "Reviews", path: "/reviews", icon: "reviews" },
			];
			break;

		default:
			break;
	}

	return (
		<div className="hub_nav">
			{links.map((link) => {
				return (
					<NavLink
						exact
						to={`${baseLink}${link.path}`}
						className="nav_link"
						activeClassName="current"
						key={link.path}
					>
						<svg className="nav_svg">
							<use xlinkHref={`#${link.icon}`} />
						</svg>
						<div className="menu_link post">{link.content}</div>
					</NavLink>
				);
			})}
		</div>
	);
}
