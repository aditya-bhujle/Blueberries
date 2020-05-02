import React from "react";
import { CardSearch, CardCreate } from "../../../cards/CenterCards";
import { AvgReviewCard, ReviewCard } from "../../../cards/ReviewPage";
import ContentTitle from "../../../header/ContentTitle";


export default function SchoolMajorsContent() {
	return (
		<div className="hub_content">
			<div className="hub_review_avg_div">
				<AvgReviewCard title="4.6/5" id="review_half">
					Overall Rating
				</AvgReviewCard>
				<AvgReviewCard title="2.3/5" id="review_half">
					Average Difficulty
				</AvgReviewCard>
				<AvgReviewCard title="91%" id="review_third">
					Would Take Again
				</AvgReviewCard>
				<AvgReviewCard title="42%" id="review_third">
					Recommend Textbook
				</AvgReviewCard>
				<AvgReviewCard title="71%" id="review_third">
					Say Come to Class
				</AvgReviewCard>
				<AvgReviewCard
					tags={[
						"Gives Good Feedback",
						"Respected",
						"Lots of Homework",
						"Lots of Writing",
						"Test Heavy",
					]}
					id="review_full"
				>
					Common Tags
				</AvgReviewCard>
				<AvgReviewCard
					title='"An amazingly passionate, enthusiastic teacher!"'
					h3
					id="review_full"
				>
					Featured Quote
				</AvgReviewCard>
			</div>
			<ContentTitle
				header="All Reviews"
				sortList={["Recent", "Most Liked", "Old"]}
				content
			/>
			<CardSearch placeholder="Search Reviews" />
			<CardCreate
				title="Add Review"
				placeholder="Rate how you found Professor Long"
			/>
			{/*TODO Change this to add review*/}
			<ReviewCard
				author="Anonymous"
				date_posted="2 Hours Ago"
				title="Fun Professor"
				rating={{
					overall: 5,
					difficulty: 2,
					take_again: true,
					textbook: false,
					attendance: false,
				}}
				content="Just the best. Homework posted online, no need for textbook. Attendance is worth 5% of the grade, so you could realistically never show up and make an A. Very entertaining lectures. Notes posted online, after class. Just a pristine experience."
				tags={[
					"Gives Good Feedback",
					"Respected",
					"Lots of Homework",
					"Lots of Writing",
					"Test Heavy",
				]}
				helpful={3}
				unhelpful={1}
			/>
		</div>
	);
}
