import React from "react";
import { CardPreviewList, CardPreviewInfo } from "../../cards/PreviewCards";

export default function DashboardContent() {
	return (
		<div className="hub_column_right">
			<CardPreviewInfo
				title="Data Structures and Algorithms"
				subtitle="Professor Bruce Long"
				members={72}
			/>
			<div className="hub_card bot_padding">
				<h3>Read More</h3>
				<div>
					<button className="button select no_margin">Previous Post</button>
					<button className="button">Previous Post</button>
				</div>
			</div>
			<CardPreviewList
				title="Hot Posts"
				elements={[
					{
						header: "Taking this class with Logic and Algorithms?",
						right: "Yesterday",
						content: [
							<strong className="list_category red" key="red">
								Not In Class
							</strong>,
							" ⋅ Anonymous ⋅ 4 replies",
						],
					},
					{
						header: "Who else has Assignment 3 pushed back",
						right: "Yesterday",
						content: [
							<strong className="list_category" key="blue">
								Hub
							</strong>,
							" ⋅ Anonymous ⋅ 4 replies",
						],
					},
				]}
			/>
		</div>
	);
}
