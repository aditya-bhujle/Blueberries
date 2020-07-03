import React from "react";

export default function NavigationCard() {
	return (
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
	);
}
