import React, { useState } from "react";

export default function PostComment2({
	user,
	date_posted,
	content,
	likes,
	top_answer,
	...props
}) {
    const [reply, setReply] = useState(false);

	return (
		<div>
			<div className={"post_comment_2" + (top_answer ? " top" : "")}>
				<div className="post_comment_details">
					<strong>{user}</strong> ⋅ {date_posted}
				</div>

				{top_answer && (
					<strong className="action_div category">Top Answer</strong>
				)}

				<p className="post_comment_paragraph">{content}</p>

				<div className="post_comment_action_div">
					<strong
						className="action_div"
						onClick={() => setReply(!reply)}
						style={reply ? { color: "#1a73e8" } : {}}
					>
						Reply
					</strong>
					<div className="action_div comment">
						<svg style={{ width: "14px", height: "14px", marginRight: "5px" }}>
							<use xlinkHref="#heart" />
						</svg>
						<strong>3</strong>
					</div>
					<div className="action_div comment">
						<svg style={{ width: "14px", height: "14px", marginRight: "5px" }}>
							<use xlinkHref="#answer" />
						</svg>
						<strong>Best Answer ⋅ 3</strong>
					</div>
				</div>
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

			{props.children && (
				<div style={{ marginLeft: "45px" }}>{props.children}</div>
			)}
		</div>
	);
}
