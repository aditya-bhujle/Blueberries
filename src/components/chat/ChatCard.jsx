import React, { useState } from "react";

export default function ChatCard({ sendMessage, teacherId, children }) {
	const [content, setContent] = useState("");

	function handleSubmit(e) {
		setContent("");
		sendMessage(e, content);
	}

	return (
		<div className="hub_card chat">
			<div className="hub_chat_title_div">
				<div>
					<h3 className="nav_link no_padding current">
						Professor Long&#x27;s Class
					</h3>
					{teacherId && <h3 className="nav_link no_padding">ITSC 2214 Hub</h3>}
				</div>
				<strong className="hub_subtitle">23 Members</strong>
			</div>
			<div className="hub_chat_content">{children}</div>
			<div className="hub_card_line"/>
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
