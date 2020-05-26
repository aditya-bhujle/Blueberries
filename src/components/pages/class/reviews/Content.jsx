import React, { useState, useEffect } from "react";
import { CardSearch, CardCreate } from "../../../cards/CenterCards";
import {
	AvgReviews,
	ReviewCard,
	ReviewCreate,
} from "../../../cards/ReviewPage";
import ContentTitle from "../../../header/ContentTitle";

export default function SchoolMajorsContent({
	classRef,
	avgReviews,
	reviewsLoading,
}) {
	const [reviews, setReviews] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				let fetchReviews = await classRef.get();
				console.log("All reviews fetched!");
				setReviews(fetchReviews.docs);
			} catch (error) {
				console.error(error);
			}
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
			<ReviewCreate classRef={classRef} />

			{reviews.map((review) => {
				return <ReviewCard {...review.data()} key={review.id} reviewRef={classRef.doc(review.id)}/>;
			})}
		</div>
	);
}
