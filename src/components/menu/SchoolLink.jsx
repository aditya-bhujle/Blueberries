import React from "react";
import SubMenuHead from "./SubMenuHead";
import MenuLink from "./MenuLink";

export default function SchoolLink({ school }) {
	if (school.short)
		return (
			<SubMenuHead
				content={school.short}
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
				{/*<MenuLink
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
				/>*/}
			</SubMenuHead>
		);
	else
		return (
			<MenuLink content="Pick Your School!" icon="school" link={`/schools`} />
		);
}
