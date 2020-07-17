import React, { useState, useEffect } from "react";
import { CardSearch } from "../../../cards/CenterCards";
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
	const [sortQuery, setSortQuery] = useState({
		title: "New",
		query: "date_posted",
		desc: true,
	});
	const [reviews, setReviews] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				let fetchReviews = await classRef
					.orderBy(sortQuery.query, sortQuery.desc ? "desc" : "asc")
					.get();
				console.log("All reviews fetched!");
				setReviews(fetchReviews.docs);
			} catch (error) {
				console.error(error);
			}
		};

		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [sortQuery.desc, sortQuery.query]);

	return (
		<div className="hub_content">
			{reviewsLoading && avgReviews}

			{reviewsLoading && (
				<AvgReviews {...avgReviews} loading={reviewsLoading} />
			)}
			{!reviewsLoading && avgReviews ? (
				<AvgReviews {...avgReviews} />
			) : (
				<div style={{ padding: "45px", textAlign: "center" }}>
					<h2>No Reviews Yet!</h2>
				</div>
			)}

			<ContentTitle
				header="All Reviews"
				sortList={[
					{ title: "Old", query: "date_posted" },
					{ title: "New", query: "date_posted", desc: true },
				]}
				sortQuery={sortQuery}
				setSortQuery={(query) => setSortQuery(query)}
				content
			/>
			<CardSearch placeholder="Search Reviews" />
			<ReviewCreate classRef={classRef} />

			{reviews.map((review) => {
				return (
					<ReviewCard
						{...review.data()}
						key={review.id}
						reviewRef={classRef.doc(review.id)}
					/>
				);
			})}
		</div>
	);
}
