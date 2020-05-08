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
	const { school, major, chats, classes, clubs } = data;

	return (
		<div className="nav_menu">
			<MenuLink content="Your Feed" icon="home" link="/" />

			<MenuLink
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
			</MenuLink>

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

			{chats && (
				<>
					{chats.map((chat) => (
						<MenuLink
							content={chat.name}
							icon={"chat"}
							link={`/school/${school.id}/chat/${chat.id}`}
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
			list && (
				<>
					{list.map((item) => (
						<div key={item.id}>
							<MenuLink
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
							</MenuLink>
						</div>
					))}
					<div className="line even" />
				</>
			)
		);
	}
}
