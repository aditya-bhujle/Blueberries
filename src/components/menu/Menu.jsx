import React from "react";
import MenuLink from "./MenuLink";
import SubMenuHead from "./SubMenuHead";

export default function Menu({ data, loading }) {
	if (loading) {
		return (
			<div className="nav_menu">
				<MenuLink loading={loading} />
				<MenuLink loading={loading} />
				<MenuLink loading={loading} />
				<div className="line even" />

				<MenuLink loading={loading} />
				<div className="line even" />

				<MenuLink loading={loading} />
				<MenuLink loading={loading} />
				<MenuLink loading={loading} />
				<div className="line even" />

				<MenuLink loading={loading} />
				<MenuLink loading={loading} />
				<MenuLink loading={loading} />
				<div className="line even" />

				<MenuLink loading={loading} />
				<div className="line even" />

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
	}

	if (!data) return null;

	const { school, major, chats, classes, clubs } = data;

	return (
		<div className="nav_menu">
			<MenuLink content="Your Feed" icon="home" link="/" />

			<SubMenuHead
				content={school.short || "Pick Your School!"}
				icon="school"
				link={`/schools/${school.id}`}
				siblingLinks={["/majors", "/classes", "/clubs", "/events", "/chats"]}
			>
				<MenuLink
					submenu
					content="Posts"
					icon="post"
					link={`/schools/${school.id}`}
				/>
				<MenuLink
					submenu
					content="Majors"
					icon="rocket"
					link={`/schools/${school.id}/majors`}
					siblingLinks={["/majors", "/classes", "/clubs"]}
				/>
				<MenuLink
					submenu
					content="Classes"
					icon="flask"
					link={`/schools/${school.id}/classes`}
				/>
				<MenuLink
					submenu
					content="Clubs"
					icon="football"
					link={`/schools/${school.id}/clubs`}
				/>
				<MenuLink
					submenu
					content="Chats"
					icon="chat"
					link={`/schools/${school.id}/chats`}
				/>

				<MenuLink
					submenu
					content="Events"
					icon="calendar"
					link={`/schools/${school.id}/events`}
				/>
			</SubMenuHead>

			<MenuLink content="Community" icon="community" link="/community" />
			<div className="line even" />

			{school.short && (
				<>
					<MenuLink
						content={major.name ? `${major.name} Hub` : "Pick Your Major!"}
						icon="hub"
						link={`/schools/${school.id}/major/${major.id}`}
					/>
					<div className="line even" />
				</>
			)}

			{mapLinks(classes, "classes", "flask", [
				{ content: "Posts", icon: "post", link: "" },
				{ content: "Chat", icon: "chat", link: "chat" },
				{ content: "Notes", icon: "notes", link: "notes" },
				{ content: "Calendar", icon: "calendar", link: "calendar" },
				{ content: "Thoughts", icon: "thoughts", link: "thoughts" },
				{ content: "Reviews", icon: "reviews", link: "reviews" },
			])}

			{mapLinks(clubs, "club", "football", [
				{ content: "Posts", icon: "post", link: "" },
				{ content: "Chat", icon: "chat", link: "chat" },
				{ content: "Announcement", icon: "announcement", link: "announcement" },
				{ content: "Calendar", icon: "calendar", link: "calendar" },
			])}

			{!!chats.length && (
				<>
					{chats.map((chat) => (
						<MenuLink
							content={chat.name}
							icon={"chat"}
							link={`/schools/${school.id}/chat/${chat.id}`}
							key={chat.id}
						/>
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
			!!list.length && (
				<>
					{list.map((item) => (
						<div key={item.id}>
							<SubMenuHead
								content={item.name}
								icon={icon}
								link={`/schools/${school.id}/${hubType}/${item.id}`}
								notExact
							>
								{submenu &&
									submenu.map(({ content, icon, link }) => (
										<MenuLink
											submenu
											content={content}
											icon={icon}
											key={content}
											link={`/schools/${school.id}/${hubType}/${item.id}/${link}`}
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
