import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export default function ChatCard({
	sendMessage,
	classInfo,
	teacherId,
	matchUrl,
	children,
}) {
	const [content, setContent] = useState("");

	function handleSubmit(e) {
		setContent("");
		sendMessage(e, content);
	}

	return (
		<div className="hub_card chat">
			<div className="hub_chat_title_div">
				<div>
					<NavLink
						to={matchUrl}
						className="nav_link no_padding chat_header_link"
						activeClassName="current"
						exact
					>
						{teacherId
							? "Professor " + classInfo.last_name + "'s Class"
							: classInfo.short + " Hub"}
					</NavLink>

					{teacherId && (
						<NavLink
							to={matchUrl + "/hub"}
							className="nav_link no_padding chat_header_link"
							activeClassName="current"
						>
							{classInfo.short} Hub
						</NavLink>
					)}
				</div>
				<strong className="hub_subtitle">23 Members</strong>
			</div>
			<div className="hub_chat_content">{children}</div>
			<div className="hub_card_line" />
			<div className="hub_card_links">
				<form className="form_block chat w-form" onSubmit={handleSubmit}>
					<input
						className="search_input chat w-input"
						value={content}
						onChange={(e) => setContent(e.target.value)}
						maxLength="256"
						placeholder="Type something here..."
						required=""
					/>
				</form>
			</div>
		</div>
	);
}
