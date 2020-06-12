import React, { useState, useContext } from "react";
import { firestore } from "firebase/app";
import { Checkbox } from "antd";
import { useToasts } from "react-toast-notifications";
import { UserContext } from "../../../../App";

export default function CreateThought({
	title,
	placeholder,
	createPlaceholder,
	postRef,
}) {
	const userInfo = useContext(UserContext);
	const { addToast } = useToasts();

	const [showCreate, setShowCreate] = useState(false);

	const [thoughtTitle, setThoughtTitle] = useState(); //Title
	const [anon, setAnon] = useState(false);

	const formContent = (
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
					className="button w-button border"
				/>
			</div>
		</div>
	);

	async function createThought(e) {
		e.preventDefault();

		if (!thoughtTitle) {
			addToast("You must add a title to your post", {
				appearance: "warning",
				autoDismiss: true,
			});
			return;
		}

		try {
			let firestoreAdd = {
				title: thoughtTitle,
				likes: [],
				dislikes: [],
				likeCount: 0,
				comments: 0,
				author: anon ? "Anonymous" : userInfo.username,
				date_posted: firestore.Timestamp.now(),
				category: "Thoughts",
			};

			await postRef.add(firestoreAdd);

			addToast(`Thought Was Successfully Created!`, {
				appearance: "success",
				autoDismiss: true,
			});

			setShowCreate(false);
			setThoughtTitle();
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
				onSubmit={(e) => createThought(e)}
			>
				<textarea
					onFocus={() => setShowCreate(true)}
					value={thoughtTitle || ""}
					className="search_input w-input"
					maxLength="256"
					style={
						showCreate
							? { fontSize: "16px", height: "auto" }
							: { height: "40px" }
					}
					placeholder={showCreate ? createPlaceholder : placeholder}
					onChange={(e) => setThoughtTitle(e.target.value)}
				/>
				{showCreate && formContent}
			</form>
		</div>
	);
}
