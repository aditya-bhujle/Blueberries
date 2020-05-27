import React, { useState, useContext, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { UserContext } from "../../App";
import { useToasts } from "react-toast-notifications";
import { firestore } from "firebase";
import { Rate } from "antd";

function AvgReviewCard({ title, id, children, h3, loading }) {
	return (
		<div className="hub_card review" id={id}>
			{h3 ? (
				<h3 className="hub_create_title">
					{loading ? <Skeleton width={300} /> : title}
				</h3>
			) : (
				<h2 className="hub_create_title">
					{loading ? <Skeleton width={50} /> : title}
				</h2>
			)}
			<p>{children}</p>
		</div>
	);
}

function AvgReviews({ counter, tags, quote, loading, ...props }) {
	const calculate = (num) => Math.round((num / counter) * 100) / 100;

	const overall = calculate(props.overall);
	const difficulty = calculate(props.difficulty);
	const take_again_perc = calculate(props.take_again) * 100;
	const textbook_perc = calculate(props.textbook) * 100;
	const attendance_perc = calculate(props.attendance) * 100;

	return (
		<div className="hub_review_avg_div">
			<AvgReviewCard title={`${overall}/5`} id="review_half" loading={loading}>
				Overall Rating
			</AvgReviewCard>
			<AvgReviewCard
				title={`${difficulty}/5`}
				id="review_half"
				loading={loading}
			>
				Average Difficulty
			</AvgReviewCard>
			<AvgReviewCard
				title={`${take_again_perc}%`}
				id="review_third"
				loading={loading}
			>
				Would Take Again
			</AvgReviewCard>
			<AvgReviewCard
				title={`${textbook_perc}%`}
				id="review_third"
				loading={loading}
			>
				Recommend Textbook
			</AvgReviewCard>
			<AvgReviewCard
				title={`${attendance_perc}%`}
				id="review_third"
				loading={loading}
			>
				Say Come to Class
			</AvgReviewCard>
			<div className="hub_card review" id="review_full">
				{loading
					? Array(4)
							.fill()
							.map((i, index) => (
								<div
									style={{ marginRight: "5px", display: "inline-block" }}
									key={index}
								>
									<Skeleton width={100} height={36} />
								</div>
							))
					: tags.map((tag) => (
							<div className="tag big" key={tag}>
								{tag}
							</div>
					  ))}
				<p>Common Tags</p>
			</div>
			<AvgReviewCard title={quote} h3 id="review_full" loading={loading}>
				Featured Quote
			</AvgReviewCard>
		</div>
	);
}

function ReviewCard({
	reviewRef,
	author,
	date_posted,
	title,
	rating,
	content,
	tags,
	helpful,
	unhelpful,
}) {
	const userInfo = useContext(UserContext);
	const uid = userInfo ? userInfo.id : null;

	const [helped, setHelped] = useState(false);
	const [helps, setHelps] = useState(helpful.length);

	const [unhelped, setUnhelped] = useState(false);
	const [unhelps, setUnHelps] = useState(unhelpful.length);

	useEffect(() => {
		helpful.forEach((user) => {
			if (user === uid) setHelped(true);
		});
		unhelpful.forEach((user) => {
			if (user === uid) setUnhelped(true);
		});
	}, [uid]);

	const ratingQuestions = (answer, text) => {
		return (
			<div
				className={"action_div category " + (answer ? "bounty" : "post")}
				style={{ float: "none", cursor: "default" }}
			>
				<strong>{text}</strong>
			</div>
		);
	};

	function helpfulLink() {
		async function toggleHelpful() {
			try {
				if (!helped) {
					setHelped(true);
					setHelps(helps + 1);

					if (unhelped) {
						setUnhelped(false);
						setUnHelps(unhelps - 1);
						await reviewRef.update({
							unhelpful: firestore.FieldValue.arrayRemove(uid),
						});
					}
					await reviewRef.update({
						helpful: firestore.FieldValue.arrayUnion(uid),
					});
				} else {
					setHelped(false);
					setHelps(helps - 1);

					await reviewRef.update({
						helpful: firestore.FieldValue.arrayRemove(uid),
					});
				}
			} catch (error) {
				console.error(error);
			}
		}

		return (
			<div className="action_div post" onClick={toggleHelpful}>
				<svg style={{ width: "18px", height: "18px" }}>
					<use xlinkHref={"#" + (helped ? "heart-filled" : "heart")} />
				</svg>
				<strong className="menu_link post">Helpful ⋅ {helps}</strong>
			</div>
		);
	}

	function unhelpfulLink() {
		async function toggleUnhelpful() {
			try {
				if (!unhelped) {
					setUnhelped(true);
					setUnHelps(unhelps + 1);

					if (helped) {
						setHelped(false);
						setHelps(helps - 1);
						await reviewRef.update({
							helpful: firestore.FieldValue.arrayRemove(uid),
						});
					}

					await reviewRef.update({
						unhelpful: firestore.FieldValue.arrayUnion(uid),
					});
				} else {
					setUnhelped(false);
					setUnHelps(unhelps - 1);

					await reviewRef.update({
						unhelpful: firestore.FieldValue.arrayRemove(uid),
					});
				}
			} catch (error) {
				console.error(error);
			}
		}

		return (
			<div className="action_div post" onClick={toggleUnhelpful}>
				<svg style={{ width: "18px", height: "18px" }}>
					<use xlinkHref={"#" + (unhelped ? "dislike-filled" : "dislike")} />
				</svg>
				<strong className="menu_link post">Not Helpful ⋅ {unhelps}</strong>
			</div>
		);
	}

	return (
		<div className="hub_card">
			<div className="hub_post_details">
				{author} ⋅ {date_posted.toDate().toString()}
			</div>

			<h3>{title}</h3>
			<div className="hub_card_sub_split">
				<strong>Overall Rating:</strong>
				<h3>{rating.overall} / 5</h3>
			</div>
			<div className="hub_card_sub_split">
				<strong>Average Difficulty:</strong>
				<h3>{rating.difficulty} / 5</h3>
			</div>

			<div style={{ marginBottom: "10px" }}>
				{rating.take_again
					? ratingQuestions(true, "Would Take Again")
					: ratingQuestions(false, "Would Not Take Again")}
				{rating.textbook
					? ratingQuestions(true, "Textbook Use")
					: ratingQuestions(false, "No Textbook Use")}
				{rating.take_again
					? ratingQuestions(true, "Attendance is Mandatory")
					: ratingQuestions(false, "Attendance is Not Mandatory")}
			</div>

			<p>{content}</p>

			{tags && (
				<div className="hub_tag_div">
					{tags.map((tag) => (
						<div className="tag" key={tag}>
							{tag}
						</div>
					))}
				</div>
			)}
			<div className="hub_card_line"></div>
			<div className="hub_card_links multiple post">
				<div>
					{helpfulLink()}
					{unhelpfulLink()}
				</div>
				<div>
					<div className="action_div post">
						<strong>Share</strong>
					</div>
					<div className="action_div post">
						<strong>Report</strong>
					</div>
				</div>
			</div>
		</div>
	);
}

function ReviewCreate({ classRef }) {
	const userInfo = useContext(UserContext);
	const { addToast } = useToasts();

	const [showCreate, setShowCreate] = useState(false);
	const [reviewInfo, setReviewInfo] = useState({
		rating: {
			overall: 3,
			difficulty: 3,
			attendance: false,
			take_again: false,
			textbook: false,
		},
	});

	async function createReview(e) {
		e.preventDefault();

		if (!reviewInfo.title) {
			addToast("You must add a title to your post", {
				appearance: "warning",
				autoDismiss: true,
			});
			return;
		}

		try {
			let firestoreAdd = {
				...reviewInfo,
				helpful: [],
				unhelpful: [],
				author: userInfo.username,
				date_posted: firestore.Timestamp.now(),
			};

			let avgUpdate = {
				"reviews.counter": firestore.FieldValue.increment(1),
				"reviews.overall": firestore.FieldValue.increment(
					reviewInfo.rating.overall
				),
				"reviews.difficulty": firestore.FieldValue.increment(
					reviewInfo.rating.difficulty
				),
			};

			if (reviewInfo.rating.attendance)
				avgUpdate["reviews.attendance"] = firestore.FieldValue.increment(1);

			if (reviewInfo.rating.textbook)
				avgUpdate["reviews.textbook"] = firestore.FieldValue.increment(1);

			if (reviewInfo.rating.take_again)
				avgUpdate["reviews.take_again"] = firestore.FieldValue.increment(1);

			await classRef.add(firestoreAdd);
			await classRef.parent.update(avgUpdate);

			addToast(`${reviewInfo.title} Successfully Created!`, {
				appearance: "success",
				autoDismiss: true,
			});

			setShowCreate(false);
			setReviewInfo({
				rating: {
					overall: 3,
					difficulty: 3,
					attendance: false,
					take_again: false,
					textbook: false,
				},
			});
		} catch (error) {
			console.error(error);
		}
	}

	const categoryButton = (text, toggleText, category) => {
		const selected = reviewInfo.rating[category];
		return (
			<button
				type="button"
				className={"action_div category post" + (selected ? " select" : "")}
				style={{ float: "none" }}
				onClick={() =>
					setReviewInfo({
						...reviewInfo,
						rating: { ...reviewInfo.rating, [category]: !selected },
					})
				}
			>
				<strong>{selected ? text : toggleText}</strong>
			</button>
		);
	};

	const ratingBox = (text, category) => (
		<div className="hub_card_sub_split">
			<strong>{text}</strong>
			<div style={{ margin: "5px 0px 10px" }}>
				<Rate
					defaultValue={3}
					allowClear={false}
					onChange={(val) =>
						setReviewInfo({
							...reviewInfo,
							rating: { ...reviewInfo.rating, [category]: val },
						})
					}
				/>
			</div>
		</div>
	);

	const formContent = (
		<>
			{ratingBox("Overall Rating:", "overall")}
			{ratingBox("Average Difficulty:", "difficulty")}

			<div style={{ marginBottom: "10px", marginTop: "10px" }}>
				{categoryButton(
					"Would Take Again",
					"Would Not Take Again",
					"take_again"
				)}
				{categoryButton("Textbook Use", "No Textbook Use", "textbook")}
				{categoryButton(
					"Attendance is Mandatory",
					"Attendance is Not Mandatory",
					"attendance"
				)}
			</div>

			<textarea
				placeholder="Description (optional)"
				value={reviewInfo.content || ""}
				maxLength="5000"
				className="search_input description w-input"
				onChange={(e) =>
					setReviewInfo({ ...reviewInfo, content: e.target.value })
				}
				style={{ marginBottom: "15px" }}
			/>

			<div className="hub_tag_div">
				{[
					"Gives Good feedback",
					"Respected",
					"Lots of Homework",
					"Lots of Writing",
					"Test Heavy",
					"Group Projects",
					"Extra Credit",
					"Tough Grader",
				].map((tag) => (
					<div className="tag" key={tag}>
						{tag}
					</div>
				))}
			</div>
			<div className="hub_card_line"></div>
			<div className="hub_create_details">
				<div>
					<button
						type="button"
						onClick={() => setShowCreate(false)}
						className="button select w-button border"
						style={{ marginLeft: "0px" }}
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
		</>
	);

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
				<h3 className="hub_create_title">Add Review</h3>
			</div>
			<form
				className="form_block_create w-form"
				onSubmit={(e) => createReview(e)}
			>
				<input
					onFocus={() => setShowCreate(true)}
					value={reviewInfo.title || ""}
					className="search_input w-input"
					maxLength="256"
					style={showCreate ? { fontSize: "16px" } : {}}
					placeholder={
						showCreate ? "Review Title" : "Rate how you found this Professor"
					}
					onChange={(e) =>
						setReviewInfo({ ...reviewInfo, title: e.target.value })
					}
				/>
				{showCreate && formContent}
			</form>
		</div>
	);
}

export { AvgReviews, ReviewCard, ReviewCreate };
