import React from "react";
import { Link } from "react-router-dom";

export default function PageNav({ type }) {
	let links;

	switch (type) {
		case "school":
			links = [
				{ content: "Posts", path: "/school", icon: "post" },
				{ content: "Majors", path: "/school/majors", icon: "rocket" },
				{ content: "Classes", path: "/school/classes", icon: "flask" },
				{ content: "Clubs", path: "/school/clubs", icon: "football" },
				{ content: "Events", path: "/school/events", icon: "calendar" },
				{ content: "Chats", path: "/school/chats", icon: "chat" },
			];
			break;

		case "class":
			links = [
				{ content: "Posts", path: "/class", icon: "post" },
				{ content: "Chat", path: "/class/chat", icon: "chat" },
				{ content: "Notes", path: "/class/notes", icon: "notes" },
				{ content: "Calendar", path: "/class/calendar", icon: "calendar" },
				{ content: "Thoughts", path: "/class/thoughts", icon: "thoughts" },
				{ content: "Reviews", path: "/class/reviews", icon: "reviews" },
			];
			break;

		default:
			break;
	}

	return (
		<div className="hub_nav">
			{links.map((link) => {
				return (
					<Link to={link.path} className="nav_link" key={link.path}>
						{/* Active should be nav_link current */}
						<svg className={"nav_svg" + (isActive ? " active" : "")}>
							{/* TO DO Change styling so nav_link current changes svg color too, remove nav_svg active */}
							<use xlinkHref={`#${link.icon}`} />
						</svg>
						<div className="menu_link post">{link.content}</div>
					</Link>
				);
			})}
		</div>
	);
}
