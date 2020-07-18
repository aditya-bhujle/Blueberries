import React from "react";
import MenuLink from "./MenuLink";
import SubMenuHead from "./SubMenuHead";
import { useLocation } from "react-router-dom";
import SchoolLink from "./SchoolLink";
import { useToasts } from "react-toast-notifications";

export default function Menu({ data, loading }) {
	const loc = useLocation();
	const { addToast } = useToasts();

	if (loc.pathname.startsWith("/onboarding")) return null;

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

			<SchoolLink school={school} />

			<MenuLink content="Community" icon="community" link="/community" />

			<div className="line even" />

			{school.short && (
				<>
					<MenuLink
						content={major ? `${major.name} Hub` : "Pick Your Major!"}
						icon="hub"
						link={`/schools/${school.id}/majors/` + (major ? major.id : "")}
					/>
					<div className="line even" />
				</>
			)}

			{school.short &&
				classes &&
				mapLinks(
					classes,
					"classes",
					"flask",
					[
						{ content: "Posts", icon: "post", link: "" },
						{ content: "Chat", icon: "chat", link: "chat" },
						{ content: "Notes", icon: "notes", link: "notes" },
						//{ content: "Calendar", icon: "calendar", link: "calendar" },
						{ content: "Thoughts", icon: "thoughts", link: "thoughts" },
						{ content: "Reviews", icon: "reviews", link: "reviews" },
					],
					"Add Your Classes!"
				)}

			{school.short &&
				clubs &&
				mapLinks(
					clubs,
					"clubs",
					"football",
					[
						{ content: "Posts", icon: "post", link: "" },
						{ content: "Chat", icon: "chat", link: "chat" },
						{
							content: "Announcement",
							icon: "announcement",
							link: "announcement",
						},
						{ content: "Calendar", icon: "calendar", link: "calendar" },
					],
					"Join Some Clubs!"
				)}

			{school.short && chats.length > 0 && (
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
				{/*<p>Settings</p>
				<p>Download the Android App</p>
				<p>Download the iOS App</p>
				<p>Send Feedback</p>
				<p>About ⋅ Privacy ⋅ Terms</p>*/}
				<p
					className="text_link"
					onClick={() =>
						addToast("Send Us an Email at feedback@blueberries.app!", {
							appearance: "success",
						})
					}
					style={{ cursor: "pointer" }}
				>
					Send Feedback
				</p>
				<p>Blueberries © 2020</p>
			</div>
		</div>
	);

	function mapLinks(list, hubType, icon, submenu, noItemsText) {
		if (list.length)
			return (
				<>
					{list.map((item) => {
						const teacherLink = item.teacher
							? `/teachers/${item.teacher.id}`
							: "";
						const itemURL =
							`/schools/${school.id}/${hubType}/${item.id}` + teacherLink;

						return (
							<div key={item.id}>
								<SubMenuHead
									content={
										item.name +
										(item.teacher ? ` - ${item.teacher.name}` : " - Hub")
									}
									icon={icon}
									link={itemURL}
									notExact
								>
									{submenu &&
										submenu.map(({ content, icon, link }) => {
											if (content === "Reviews" && !item.teacher) return null;
											return (
												<MenuLink
													submenu
													content={content}
													icon={icon}
													key={content}
													link={`${itemURL}/${link}`}
												/>
											);
										})}
								</SubMenuHead>
							</div>
						);
					})}
					<div className="line even" />
				</>
			);
		else
			return (
				<>
					<MenuLink
						content={noItemsText}
						icon={icon}
						link={`/schools/${school.id}/${hubType}`}
					/>
					<div className="line even" />
				</>
			);
	}
}
