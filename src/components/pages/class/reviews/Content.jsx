import React, { useState, useEffect } from "react";
import { CardSearch, CardCreate } from "../../../cards/CenterCards";
import { AvgReviews, ReviewCard } from "../../../cards/ReviewPage";
import ContentTitle from "../../../header/ContentTitle";

export default function SchoolMajorsContent({
	classRef,
	avgReviews,
	reviewsLoading,
}) {
	const [reviews, setReviews] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				let fetchReviews = await classRef.get();
				console.log("All reviews fetched!");
				setReviews(fetchReviews.docs);
			} catch (error) {
				console.error(error);
			}

			setLoading(false);
		};

		fetchData();
	}, []);
	return (
		<div className="hub_content">
			<AvgReviews {...avgReviews} loading={reviewsLoading} />

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

			{reviews.map((review) => {
				let { date_posted, ...restOfReview } = review.data();
				return (
					<ReviewCard
						{...restOfReview}
						date_posted={date_posted.toDate().toString()}
					/>
				);
			})}
		</div>
	);
}
