import React, { useState } from "react";

export default function Comment({
	author,
	content,
	likes,
	date_posted,
	children,
	top_answer,
}) {
	const [reply, setReply] = useState(false);
	return (
		<div className="post_comment">
			<div className="post_comment_left">
				<div className="line vertical" />
			</div>
			<div>
				<div className="post_comment_details">
					{author} ⋅ {date_posted}
				</div>

				{top_answer && <strong className="action_div category">Top Answer</strong>}

				<p className="post_comment_paragraph">{content}</p>

				<div className="post_comment_action_div">
					<div className="action_div post">
						<svg style={{ width: "18px", height: "18px" }}>
							<use xlinkHref="#heart" />
						</svg>
						<strong className="menu_link post">{`Like ⋅ ${likes}`}</strong>
					</div>

					<strong
						className={`action_div ${reply ? "clicked" : ""}`}
						onClick={() => setReply(!reply)}
					>
						Reply
					</strong>
					<strong className="action_div selected">
						Selected as Answer ⋅ 3
					</strong>
				</div>
				{reply && (
					<form className="hub_card reply">
						<textarea
							placeholder="Write your comment here!"
							maxLength="5000"
							className="search_input w-input"
						/>
						<button href="www.google.com" className="button comment w-button">
							Comment
						</button>
					</form>
				)}
				{children}
			</div>
		</div>
	);
}
