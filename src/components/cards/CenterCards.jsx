import React, { useState } from "react";
import Skeleton from "react-loading-skeleton";

function CardCreate({ title, placeholder, createPlaceholder, handleSubmit }) {
	const [showCreate, setShowCreate] = useState(false);

	const [postTitle, setPostTitle] = useState("");
	const [postDescription, setPostDescription] = useState("");

	const createPost = (
		<>
			<textarea
				placeholder="Description (optional)"
				maxLength="5000"
				className="search_input description w-input"
				onChange={(e) => setPostDescription(e.target.value)}
			/>
			<div className="hub_create_details">
				<label className="w-checkbox checkbox_div">
					<input type="checkbox" className="w-checkbox-input" />
					<span className="w-form-label">Post anonymously</span>
				</label>
				<div>
					<button
						onClick={() => setShowCreate(false)}
						className="button select w-button"
					>
						Close
					</button>
					<input
						type="submit"
						value="Submit"
						data-wait="Please wait..."
						className="button w-button"
					/>
				</div>
			</div>
		</>
	);

	return (
		<div className="hub_card">
			<div className="hub_title_div content">
				<h3 className="hub_create_title">{title}</h3>
			</div>
			<form
				className="form_block_create w-form"
				onSubmit={(e) => handleSubmit(e, postTitle, postDescription)}
			>
				<input
					onClick={() => setShowCreate(true)}
					className="search_input w-input"
					maxLength="256"
					placeholder={showCreate ? createPlaceholder : placeholder}
					onChange={(e) => setPostTitle(e.target.value)}
				/>
				{showCreate && createPost}
			</form>
		</div>
	);
}

function CardSearch({ placeholder }) {
	return (
		<div className="hub_card search">
			<form className="form_block w-form">
				<input
					className="search_input w-input"
					maxLength="256"
					placeholder={placeholder}
				/>
			</form>
		</div>
	);
}

function CardPost({ loading, ...props }) {
	function actionLink(content, icon) {
		return (
			<div className="action_div post">
				{loading ? (
					<Skeleton width={icon ? 75 : 50}/>
				) : (
					<>
						{icon && (
							<svg style={{ width: "18px", height: "18px" }}>
								<use xlinkHref={`#${icon}`} />
							</svg>
						)}
						<strong className="menu_link post">{content}</strong>
					</>
				)}
			</div>
		);
	}

	return (
		<div className={"hub_card" + (props.followed ? " followed" : "")}>
			{props.image && (
				<img
					src={"images/" + props.image}
					alt="post_image"
					className="hub_notes_image _32"
				/>
			)}
			<div className="hub_post_details">
				{loading ? (
					<>
						<Skeleton width={200} />
						<Skeleton width={75} />
					</>
				) : (
					<>
						<div>
							{props.source && (
								<>
									<strong>{props.source}</strong> ⋅{" "}
								</>
							)}
							{props.author} ⋅ {props.date_posted}
						</div>
						<strong className="main_color">
							{props.followed
								? "Followed!"
								: "Follow" + (props.follows ? " ⋅ " + props.follows : "")}
						</strong>
					</>
				)}
			</div>

			{props.category && (
				<div
					className="action_div category post"
					style={props.reward ? null : { marginRight: "10px" }}
				>
					<strong>{props.category}</strong>
				</div>
			)}

			{props.reward && (
				<div
					className="action_div category bounty"
					style={{ marginRight: "10px" }}
				>
					<strong>{props.reward}</strong>
				</div>
			)}

			<h3 style={{ lineHeight: "24px" }}>
				{loading ? <Skeleton height={24} /> : props.title}
			</h3>
			<p className="alert">{props.alert}</p>
			<p>{loading ? <Skeleton count={3} /> : props.content}</p>
			<div className="hub_card_line"></div>
			<div className="hub_card_links multiple post">
				<div>
					{actionLink(`Like ⋅ ${props.likes}`, "heart")}
					{actionLink(`Comment ⋅ ${props.comments}`, "chat")}
				</div>
				<div>
					{actionLink("Share")}
					{actionLink("Heart")}
				</div>
			</div>
		</div>
	);
}

function CardEvent({ title, content, event_date, category, type }) {
	return (
		<div className="hub_card">
			<div className="hub_post_details">
				<strong className="list_category">{event_date}</strong> ⋅ {category} ⋅{" "}
				{type}
			</div>
			<h3>{title}</h3>
			<p>{content}</p>
		</div>
	);
}

export { CardCreate, CardSearch, CardPost, CardEvent };
