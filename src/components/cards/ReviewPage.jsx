import React from "react";
import Skeleton from "react-loading-skeleton";

function AvgReviewCard({ title, id, children, tags, h3, loading }) {
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

function AvgReviews({
	overall,
	difficulty,
	take_again_perc,
	textbook_perc,
	attendance_perc,
	tags,
	quote,
	loading,
}) {
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
								<div style={{ marginRight: "5px", display: "inline-block" }} key={index}>
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

export { AvgReviews, ReviewCard };
