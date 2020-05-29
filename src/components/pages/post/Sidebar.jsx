import React from "react";
import { CardPreviewList, CardPreviewInfo } from "../../cards/PreviewCards";

export default function PostSidebar({ info, close }) {
	return (
		<div className="hub_column_right">
			{info ? (
				<CardPreviewInfo
					title={info.name}
					subtitle={
						info.professor_last
							? `Professor ${info.professor_first} ${info.professor_last}`
							: false
					}
					members={info.members}
					onClick={close}
					linkUrl={!close}
				/>
			) : (
				<CardPreviewInfo loading subtitle />
			)}
			<div className="hub_card bot_padding">
				<h3>Read More</h3>
				<div className="flex">
					<button
						className="button select no_margin inside"
						style={{
							flexGrow: 1,
							flexShrink: 1,
							flexBasis: "0%",
							borderStyle: "solid",
						}}
					>
						Previous Post
					</button>
					<button
						className="button"
						style={{ flexGrow: 1, flexShrink: 1, flexBasis: "0%" }}
					>
						Next Post
					</button>
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
