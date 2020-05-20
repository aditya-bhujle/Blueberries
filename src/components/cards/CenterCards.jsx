import React, { useState, useEffect, useContext } from "react";
import Skeleton from "react-loading-skeleton";
import firebase from "firebase/app";
import { Checkbox } from "antd";
import { UserContext } from "../../App";

function CardCreate({ title, placeholder, createPlaceholder, postRef }) {
	const userInfo = useContext(UserContext);

	const [showCreate, setShowCreate] = useState(false);
	const [showLink, setShowLink] = useState(false);

	const [postInfo, setPostInfo] = useState({}); //Title, content, linkUrl, linkName, fileUrls, fileNames
	const [anon, setAnon] = useState(false);

	const iconStyles = {
		width: "16px",
		height: "16px",
		marginRight: "8px",
		marginBottom: "4px",
	};

	const linkDiv = (
		<div>
			<span className="w-form-label">
				<svg className="menu_svg" style={{ width: "16px", height: "16px" }}>
					<use xlinkHref={"#link"} />
				</svg>
			</span>
			<input
				style={{ width: "95%", display: "inline-block", marginLeft: "8px" }}
				value={postInfo.linkName || ""}
				className="search_input w-input"
				maxLength="256"
				placeholder="Link Name (ex. Quizlet Unit 3.1)"
				onChange={(e) => setPostInfo({ ...postInfo, linkName: e.target.value })}
			/>
			<span className="w-form-label">
				<svg className="menu_svg" style={{ width: "16px", height: "16px" }}>
					<use xlinkHref={"#link"} />
				</svg>
			</span>
			<input
				style={{ width: "95%", display: "inline-block", marginLeft: "8px" }}
				value={postInfo.linkUrl || ""}
				className="search_input w-input"
				maxLength="256"
				placeholder="Link URL"
				onChange={(e) => setPostInfo({ ...postInfo, linkUrl: e.target.value })}
			/>
		</div>
	);

	const formContent = (
		<>
			<textarea
				placeholder="Description (optional)"
				value={postInfo.content || ""}
				maxLength="5000"
				className="search_input description w-input"
				onChange={(e) => setPostInfo({ ...postInfo, content: e.target.value })}
			/>

			<div
				style={{
					marginTop: "5px",
					marginBottom: "10px",
					display: "inline-block",
				}}
			>
				<button type="button" className="button select small no_margin">
					<svg className="menu_svg" style={iconStyles}>
						<use xlinkHref={"#upload"} />
					</svg>
					Upload Files
				</button>
				<button
					type="button"
					className={"button small" + (showLink ? "" : " select")}
					onClick={() => setShowLink(!showLink)}
				>
					<svg
						className="menu_svg"
						style={showLink ? { ...iconStyles, fill: "white" } : iconStyles}
					>
						<use xlinkHref={"#link"} />
					</svg>
					Add a Link
				</button>
			</div>

			{showLink && linkDiv}

			<div className="hub_create_details">
				<label className="checkbox_div">
					<Checkbox onChange={(e) => setAnon(!anon)} checked={anon}>
						Post anonymously
					</Checkbox>
				</label>

				<div>
					<button
						type="button"
						onClick={() => setShowCreate(false)}
						className="button select w-button border"
					>
						Close
					</button>
					<input
						type="submit"
						value="Submit"
						data-wait="Please wait..."
						className="button w-button border"
					/>
				</div>
			</div>
		</>
	);

	async function createPost(e) {
		e.preventDefault();

		console.log(postInfo);

		try {
			await postRef.add({
				...postInfo,
				likes: [],
				comments: 0,
				author: anon ? "Anonymous" : userInfo.username,
				date_posted: firebase.firestore.Timestamp.now(),
			});
			console.log(`${postInfo.title} successfully created!`);

			setShowCreate(false);
			setPostInfo({});
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<div
			className="hub_card"
			onClick={(event) => {
				if (event.target === event.currentTarget) setShowCreate(true);
			}}
			style={showCreate ? {} : { cursor: "pointer" }}
		>
			<div
				className="hub_title_div content"
				style={{ display: "inline-block" }}
			>
				<h3 className="hub_create_title">{title}</h3>
			</div>
			<form
				className="form_block_create w-form"
				onSubmit={(e) => createPost(e)}
			>
				<input
					onFocus={() => setShowCreate(true)}
					value={postInfo.title || ""}
					className="search_input w-input"
					maxLength="256"
					placeholder={showCreate ? createPlaceholder : placeholder}
					onChange={(e) =>
						setPostInfo({ ...setPostInfo, title: e.target.value })
					}
				/>
				{showCreate && formContent}
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

function CardPost({ uid, ...props }) {
	const [likes, setLikes] = useState(props.likes.length);
	const [liked, setLiked] = useState(false);

	useEffect(() => {
		props.likes.forEach((user) => {
			if (user === uid) setLiked(true);
		});
	}, [uid]);

	function actionLink(content, icon) {
		return (
			<div className="action_div post">
				{icon && (
					<svg style={{ width: "18px", height: "18px" }}>
						<use xlinkHref={`#${icon}`} />
					</svg>
				)}
				<strong className="menu_link post">{content}</strong>
			</div>
		);
	}

	function likeLink() {
		async function toggleLike() {
			try {
				if (!liked) {
					setLiked(true);
					setLikes(likes + 1);

					await props.postRef.update({
						likes: firebase.firestore.FieldValue.arrayUnion(uid),
					});
				} else {
					setLiked(false);
					setLikes(likes - 1);

					await props.postRef.update({
						likes: firebase.firestore.FieldValue.arrayRemove(uid),
					});
				}
			} catch (error) {
				console.error(error);
			}
		}

		return (
			<div className="action_div post" onClick={toggleLike}>
				<svg style={{ width: "18px", height: "18px" }}>
					<use xlinkHref={"#" + (liked ? "heart-filled" : "heart")} />
				</svg>
				<strong className="menu_link post">{`Like ⋅ ${likes}`}</strong>
			</div>
		);
	}

	return (
		<a
			className={"hub_card" + (props.followed ? " followed" : "")}
			href={props.link}
			style={{ display: "block" }}
		>
			{props.image && (
				<img
					src={"images/" + props.image}
					alt="post_image"
					className="hub_notes_image _32"
				/>
			)}
			<div className="hub_post_details">
				<div>
					{props.showSource && props.source && (
						<>
							<strong>{props.source}</strong> ⋅{" "}
						</>
					)}
					{props.author} ⋅ {props.date_posted.toDate().toString()}
				</div>
				<strong className="main_color">
					{props.followed
						? "Followed!"
						: "Follow" + (props.follows ? " ⋅ " + props.follows : "")}
				</strong>
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
				{props.unit
					? props.unit_name
						? `Unit ${props.unit} - ${props.unit_name}`
						: `Unit ${props.unit}`
					: props.title}
			</h3>

			<p className="alert">{props.alert}</p>
			<p className="main_color">{props.info}</p>

			<p>{props.content}</p>
			<div className="hub_card_line"></div>
			<div className="hub_card_links multiple post">
				<div>
					{likeLink()}
					{actionLink(`Comment ⋅ ${props.comments}`, "chat")}
				</div>
				<div>
					{actionLink("Share")}
					{actionLink("Report")}
				</div>
			</div>
		</a>
	);
}

function CardPostSkeleton() {
	return (
		<div className="hub_card">
			<div className="hub_post_details">
				<Skeleton width={200} />
				<Skeleton width={75} />
			</div>

			<h3 style={{ lineHeight: "24px" }}>
				<Skeleton height={24} />
			</h3>

			<p>
				<Skeleton count={3} />
			</p>

			<div className="hub_card_line"></div>

			<div className="hub_card_links multiple post">
				<div>
					<div className="action_div post">
						<Skeleton width={75} />
					</div>
					<div className="action_div post">
						<Skeleton width={75} />
					</div>
				</div>
				<div>
					<div className="action_div post">
						<Skeleton width={50} />
					</div>
					<div className="action_div post">
						<Skeleton width={50} />
					</div>
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

export { CardCreate, CardSearch, CardPost, CardPostSkeleton, CardEvent };
