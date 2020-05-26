import React, { useState, useEffect, useContext } from "react";
import Skeleton from "react-loading-skeleton";
import { firestore, storage } from "firebase/app";
import { Checkbox } from "antd";
import { useToasts } from "react-toast-notifications";
import { UserContext } from "../../App";

function CardCreate({
	title,
	placeholder,
	createPlaceholder,
	postRef,
	category,
	...props //notes
}) {
	const userInfo = useContext(UserContext);
	const { addToast } = useToasts();

	const [showCreate, setShowCreate] = useState(false);
	const [showLink, setShowLink] = useState(false);
	const [userImages, setUserImages] = useState(new Set());

	const [postInfo, setPostInfo] = useState({ files: [] }); //Title, content, linkUrl, linkName, files, category
	const [anon, setAnon] = useState(false);

	const [uploading, setUploading] = useState(false);

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

	useEffect(() => {
		const showImage = async () => {
			function fileReader(file) {
				return new Promise((resolve, reject) => {
					const reader = new FileReader();

					reader.onload = () => {
						resolve(reader.result);
					};
					reader.onerror = reject;

					reader.readAsDataURL(file);
				});
			}

			const newImages = [];
			for (let index = 0; index < postInfo.files.length; index++) {
				const file = postInfo.files[index];
				if (file.type.startsWith("image/"))
					newImages.push(await fileReader(file));
			}

			setUserImages([...newImages]);
		};

		showImage();
	}, [postInfo]);

	function onChangeFile(e) {
		e.preventDefault();

		setPostInfo({
			...postInfo,
			files: postInfo.files.concat([...e.target.files]),
		});
	}

	const categoryButton = (text) => (
		<button
			type="button"
			className={
				"action_div category post" +
				(postInfo.category === text ? " select" : "")
			}
			style={{ float: "none" }}
			onClick={() => setPostInfo({ ...postInfo, category: text })}
		>
			<strong>{text}</strong>
		</button>
	);
	let inputRef;

	const formContent = (
		<>
			<textarea
				placeholder="Description (optional)"
				value={postInfo.content || ""}
				maxLength="5000"
				className="search_input description w-input"
				onChange={(e) => setPostInfo({ ...postInfo, content: e.target.value })}
			/>

			{category && (
				<div style={{ marginBottom: "5px" }}>
					{category.map((tag) => categoryButton(tag))}
				</div>
			)}

			<div
				style={{
					marginTop: "5px",
					marginBottom: "10px",
					display: "inline-block",
				}}
			>
				<button
					type="button"
					className="button select small no_margin"
					onClick={() => inputRef.click()}
				>
					<svg className="menu_svg" style={iconStyles}>
						<use xlinkHref={"#upload"} />
					</svg>
					Upload Files
				</button>
				<input
					id="fileInput"
					type="file"
					ref={(ref) => (inputRef = ref)}
					onChange={onChangeFile}
					multiple
					style={{ display: "none" }}
				/>
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

			{postInfo.files && (
				<div>
					{userImages.length > 0 && (
						<div className="hub_chat_photos_div">
							{[...userImages].map((url, index) => (
								<img
									src={url}
									className="hub_chat_photo"
									key={index}
									alt="User Uploaded"
								/>
							))}
						</div>
					)}
					{postInfo.files.map((file, index) => (
						<div className="file_div" key={index}>
							<svg
								className="close_file"
								onClick={() => {
									let newFiles = postInfo.files;
									newFiles.splice(index, 1);

									setPostInfo({
										...postInfo,
										files: newFiles,
									});
								}}
							>
								<use xlinkHref={"#close"} />
							</svg>
							<p style={{ margin: "0px" }}>{file.name}</p>
						</div>
					))}
				</div>
			)}

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
						value={uploading ? "Uploading..." : "Submit"}
						className="button w-button border"
					/>
				</div>
			</div>
		</>
	);

	async function createPost(e) {
		e.preventDefault();

		if (!postInfo.title) {
			addToast("You must add a title to your post", {
				appearance: "warning",
				autoDismiss: true,
			});
			return;
		}

		let fileSize = 0;
		postInfo.files.forEach((file) => (fileSize += file.size));
		if (fileSize > 2000000) {
			addToast("Your files cannot be greater than 2 MB!", {
				appearance: "warning",
				autoDismiss: true,
			});
			return;
		}

		setUploading(true);

		try {
			const { files: postFiles, ...postInfoWithoutFiles } = postInfo;

			let firestoreAdd = {
				...postInfoWithoutFiles,
				likes: [],
				comments: 0,
				author: anon ? "Anonymous" : userInfo.username,
				date_posted: firestore.Timestamp.now(),
			};

			if (props.notes) firestoreAdd.category = "Notes";

			if (postFiles) firestoreAdd.files = postFiles.map(({ name }) => name);

			const { id: docId } = await postRef.add(firestoreAdd);

			if (postFiles)
				for (let index = 0; index < postFiles.length; index++) {
					const file = postFiles[index];
					await storage()
						.ref()
						.child(postRef.path)
						.child(docId)
						.child(file.name)
						.put(file);
				}

			setUploading(false);
			addToast(`${postInfo.title} Successfully Created!`, {
				appearance: "success",
				autoDismiss: true,
			});
			console.log(`${postInfo.title} successfully created!`);

			setShowCreate(false);
			setPostInfo({ files: [] });
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
					style={showCreate ? { fontSize: "16px" } : {}}
					placeholder={showCreate ? createPlaceholder : placeholder}
					onChange={(e) => setPostInfo({ ...postInfo, title: e.target.value })}
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

function CardPost({ uid, showModal, ...props }) {
	const [likes, setLikes] = useState(props.likes.length);
	const [liked, setLiked] = useState(false);

	const [files, setFiles] = useState([]);
	const [showImages, setShowImages] = useState([]);

	useEffect(() => {
		async function getFiles() {
			let fileCounter = [];
			let imageCounter = [];
			for (let index = 0; index < props.files.length; index++) {
				const fileRef = storage()
					.ref()
					.child(props.postRef.path)
					.child(props.files[index]);

				const fileURL = await fileRef.getDownloadURL();
				const fileType = await fileRef.getMetadata();

				fileCounter.push({ url: fileURL, type: fileType.contentType });

				if (fileType.contentType.startsWith("image/"))
					imageCounter.push(fileURL);
			}
			setFiles(files.concat(fileCounter));
			setShowImages(imageCounter);
		}

		if (props.files) getFiles();
	}, []);

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
						likes: firestore.FieldValue.arrayUnion(uid),
					});
				} else {
					setLiked(false);
					setLikes(likes - 1);

					await props.postRef.update({
						likes: firestore.FieldValue.arrayRemove(uid),
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

	function callShowModal(event) {
		if (!showModal) return null;

		let targetClass = event.target.className;
		if (
			targetClass !== "menu_link post" &&
			targetClass !== "action_div post" &&
			event.target.textContent !== "follow" &&
			event.target.tagName !== "svg" &&
			event.target.tagName !== "use"
		)
			showModal(props.postRef, { uid, ...props });
	}

	return (
		<div
			className={"hub_card" + (props.followed ? " followed" : "")}
			onClick={(e) => callShowModal(e)}
			style={{ display: "block" }}
		>
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

			{!props.modal && showImages.length > 0 && (
				<img src={showImages[0]} alt="user_image" className="hub_notes_image" />
			)}

			<div className="post_header_div">
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

				<h3 style={{ lineHeight: "24px", margin: "0px" }}>
					{props.unit
						? props.unit_name
							? `Unit ${props.unit} - ${props.unit_name}`
							: `Unit ${props.unit}`
						: props.title}
				</h3>
			</div>

			{props.alert && <p className="alert">{props.alert}</p>}
			{showImages && (
				<p className="main_color">
					{showImages.length > 1 ? `${showImages.length} Images` : "1 Image"}
				</p>
			)}

			{props.content && <p>{props.content}</p>}

			{props.modal &&
				showImages.map((url) => (
					<img
						src={url}
						alt="user_image"
						className="hub_notes_modal"
						key={url}
					/>
				))}

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
		</div>
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
