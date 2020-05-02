import React from "react"

export default function ChatCard({ children }) {
	return (
		<div className="hub_card chat">
			<div className="hub_chat_title_div">
				<div>
					<h3 className="nav_link current">Professor Long&#x27;s Class</h3>
					<h3 className="nav_link">ITSC 2214 Hub</h3>
				</div>
				<div>
					<div className="hub_subtitle">
						<strong>23 Members</strong>
					</div>
					<div className="hub_subtitle">
						<strong className="main_color">Settings</strong>
					</div>
				</div>
			</div>
			<div className="hub_chat_content">{children}</div>
			<div className="hub_card_line"></div>
			<div className="hub_card_links">
				<form className="form_block chat w-form">
					<input
						className="search_input chat w-input"
						maxLength="256"
						placeholder="Type something here..."
						required=""
					/>
				</form>
			</div>
		</div>
	);
}
