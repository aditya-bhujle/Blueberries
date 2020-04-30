function AvgReviewCard({ title, id, children, tags, h3 }) {
	return (
		<div className="hub_card review" id={id}>
			{h3 ? (
				<h3 className="hub_create_title">{title}</h3>
			) : (
				<h2 className="hub_create_title">{title}</h2>
			)}
			{tags &&
				tags.map((tag) => (
					<div className="tag big" key={tag}>
						{tag}
					</div>
				))}
			<p>{children}</p>
		</div>
	);
}

function ReviewCard({
	author,
	date_posted,
	title,
	rating,
	content,
	tags,
	helpful,
	unhelpful,
}) {
	const ratingQuestions = (answer, text) => {
		return (
			<div
				className={"action_div category " + (answer ? "bounty" : "post")}
				style={{ float: "none" }}
			>
				<strong>{text}</strong>
			</div>
		);
	};

	return (
		<div className="hub_card">
			<div className="hub_post_details">
				{author} ⋅ {date_posted}
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

			<div className="hub_tag_div">
				{tags.map((tag) => (
					<div className="tag" key={tag}>
						{tag}
					</div>
				))}
			</div>
			<div className="hub_card_line"></div>
			<div className="hub_card_links multiple post">
				<div>
					<div className="action_div post">
						<strong>Helpful ⋅ {helpful}</strong>
					</div>
					<div className="action_div post">
						<strong>Not Helpful ⋅ {unhelpful}</strong>
					</div>
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

export { AvgReviewCard, ReviewCard };
