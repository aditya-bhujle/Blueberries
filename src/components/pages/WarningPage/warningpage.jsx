import React, { useContext } from "react";
import { UserContext } from "../../../App";

export default function WarningPage({ icon, children }) {
	const user = useContext(UserContext);

	return (
		<div className={"section center" + (user ? "" : " content")}>
			<div
				className="hub_card"
				style={{ padding: "25px 30px 15px", textAlign: "center" }}
			>
				<div
					className="back_link"
					onClick={() => window.history.back()}
					style={{ textAlign: "left", width: "100%" }}
				>
					<svg className="back_link_svg">
						<use xlinkHref="#left" />
					</svg>
					<h5>Back to Home</h5>
				</div>
				<svg height="48" width="100%" style={{ marginBottom: "10px" }}>
					<use xlinkHref={"#" + icon} />
				</svg>
				{children}
			</div>
		</div>
	);
}
