import React from "react";
import MenuLink from "./MenuLink";
import SubMenuHead from "./SubMenuHead";

export default function Menu() {
	const user = {
		handle: "FirstUser",
		school: "University of North Carolina at Charlotte",
		major: "Computer Science",
		classes: [
			"Data Structures and Algorithms",
			"Logic and Algorithms",
			"Principles of Accounting II",
			"Introduction to Technical Communication",
		],
		clubs: ["Track and Field", "ACM"],
		chats: ["Witherspoon Residence Hall"],
	};

	return (
		<div className="nav_menu">
			<MenuLink content="Your Feed" icon="home" link="/" />

			<SubMenuHead content="UNCC" icon="school" link="/school/uncc">
				<MenuLink submenu content="Posts" icon="post" />

				<SubMenuHead submenu content="Join" icon="school" link="/school/uncc">
					<MenuLink submenu content="Majors" icon="rocket" />
					<MenuLink submenu content="Classes" icon="flask" />
					<MenuLink submenu content="Clubs" icon="football" />
					<MenuLink submenu content="Chats" icon="chat" />
				</SubMenuHead>

				<MenuLink submenu content="Events" icon="calendar" />
			</SubMenuHead>

			<MenuLink content="Community" icon="community" />
			<div className="line even" />

			<MenuLink content={`${user.major} Hub`} icon="hub" />
			<div className="line even" />

			{mapLinks(user.classes, "flask", [
				{ content: "Posts", icon: "post" },
				{ content: "Chat", icon: "chat" },
				{ content: "Notes", icon: "notes" },
				{ content: "Calendar", icon: "calendar" },
				{ content: "Thoughts", icon: "thoughts" },
				{ content: "Reviews", icon: "reviews" },
			])}

			{mapLinks(user.clubs, "football", [
				{ content: "Posts", icon: "post" },
				{ content: "Chat", icon: "chat" },
				{ content: "Announcement", icon: "announcement" },
				{ content: "Calendar", icon: "calendar" },
			])}

			{user.chats && (
				<>
					{user.chats.map((chat) => (
						<MenuLink content={chat} icon={"chat"} key={chat} />
					))}
					<div className="line even" />
				</>
			)}

			<div className="nav_menu_details">
				<p>Settings</p>
				<p>Download the Android App</p>
				<p>Download the iOS App</p>
				<p>Send Feedback</p>
				<p>About ⋅ Privacy ⋅ Terms</p>
				<p>Blueberries © 2020</p>
			</div>
		</div>
	);

	function mapLinks(list, icon, submenu) {
		return (
			list && (
				<>
					{list.map((item) => (
						<div key={item}>
							<SubMenuHead content={item} icon={icon}>
								{submenu &&
									submenu.map(({ content, icon }) => (
										<MenuLink
											submenu
											content={content}
											icon={icon}
											key={content}
										/>
									))}
							</SubMenuHead>
						</div>
					))}
					<div className="line even" />
				</>
			)
		);
	}
}
