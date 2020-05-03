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

	const data = {
		school: {
			id: "KMLrVq9pltD3OgFouIIV",
			short: "UNCC",
		},
		major: {
			id: "KMLrVq9pltD3OgFouIIV",
			name: "Computer Science",
		},
		classes: [
			{
				id: "KMLrVq9pltD3OgFouIIV",
				name: "Data Structures and Algorithms",
			},
			{
				id: "KMLrVq9pltD3OgFouIIV",
				name: "Logic and Algorithms",
			},
			{
				id: "KMLrVq9pltD3OgFouIIV",
				name: "Principles of Accounting II",
			},
			{
				id: "KMLrVq9pltD3OgFouIIV",
				name: "Introduction to Technical Communication",
			},
		],
		clubs: [
			{
				id: "KMLrVq9pltD3OgFouIIV",
				name: "Track and Field",
			},
			{
				id: "KMLrVq9pltD3OgFouIIV",
				name: "ACM",
			},
		],
		chats: [
			{
				id: "KMLrVq9pltD3OgFouIIV",
				name: "Witherspoon Residence Hall",
			},
		],
	};

	const { school, major, chats, classes, clubs } = data;

	return (
		<div className="nav_menu">
			<MenuLink content="Your Feed" icon="home" link="/" />

			<SubMenuHead
				content={school.short}
				icon="school"
				link={`/school/${school.id}`}
			>
				<MenuLink
					submenu
					content="Posts"
					icon="post"
					link={`/school/${school.id}`}
				/>

				<SubMenuHead
					submenu
					content="Join"
					icon="school"
					link={`/school/${school.id}`}
				>
					<MenuLink
						submenu
						content="Majors"
						icon="rocket"
						link={`/school/${school.id}/majors`}
					/>
					<MenuLink
						submenu
						content="Classes"
						icon="flask"
						link={`/school/${school.id}/classes`}
					/>
					<MenuLink
						submenu
						content="Clubs"
						icon="football"
						link={`/school/${school.id}/clubs`}
					/>
					<MenuLink
						submenu
						content="Chats"
						icon="chat"
						link={`/school/${school.id}/chat`}
					/>
				</SubMenuHead>

				<MenuLink
					submenu
					content="Events"
					icon="calendar"
					link={`/school/${school.id}/events`}
				/>
			</SubMenuHead>

			<MenuLink content="Community" icon="community" link="/community" />
			<div className="line even" />

			<MenuLink
				content={`${major.name} Hub`}
				icon="hub"
				link={`/school/${school.id}/major/${major.id}`}
			/>
			<div className="line even" />

			{mapLinks(classes, "class", "flask", [
				{ content: "Posts", icon: "post" },
				{ content: "Chat", icon: "chat" },
				{ content: "Notes", icon: "notes" },
				{ content: "Calendar", icon: "calendar" },
				{ content: "Thoughts", icon: "thoughts" },
				{ content: "Reviews", icon: "reviews" },
			])}

			{mapLinks(clubs, "club", "football", [
				{ content: "Posts", icon: "post" },
				{ content: "Chat", icon: "chat" },
				{ content: "Announcement", icon: "announcement" },
				{ content: "Calendar", icon: "calendar" },
			])}

			{user.chats && (
				<>
					{chats.map((chat) => (
						<MenuLink content={chat.name} icon={"chat"} link={`/school/${school.id}/chat/${chat.id}`} key={chat.id} />
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

	function mapLinks(list, hubType, icon, submenu) {
		return (
			list && (
				<>
					{list.map((item) => (
						<div key={item.id}>
							<SubMenuHead
								content={item.name}
								icon={icon}
								link={`/school/${school.id}/${hubType}/${item.id}`}
							>
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
