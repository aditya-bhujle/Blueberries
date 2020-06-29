import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import OnboardingNavigation from "./Navigation";
import { db } from "../../../firebase/config";
import SpinLoad from "../../SpinLoad";

export default function OnboardingOverview({ school, major, classes, userId }) {
	const [sending, setSending] = useState(false);
	const [sent, setSent] = useState(false);

	async function submitSelection() {
		setSending(true);

		const userRef = db.collection("users").doc(userId);
		try {
			await userRef.update({
				school: school,
				major: major,
				classes: classes,
			});

			setSent(true);
		} catch (error) {
			console.error(error);
		}
	}

	if (sent) return <Redirect to="/" />;

	return (
		<>
			<h3>Review Selection</h3>

			{school && (
				<div
					className="hub_card bot_padding"
					style={{ alignSelf: "flex_start" }}
				>
					<Link to="./schools">
						<h3>{school.name}</h3>
					</Link>

					<div style={{ marginBottom: "10px" }}>
						{major && (
							<>
								<h4 className="main_color" style={{ margin: "5px 0px" }}>
									<strong>Your Major</strong>
								</h4>
								<Link to="./major" className={"onboard_card"}>
									<strong>{major.name}</strong>
								</Link>
							</>
						)}

						{!!classes.length && (
							<>
								<h4 className="main_color" style={{ margin: "5px 0px" }}>
									<strong>Your Classes</strong>
								</h4>
								{classes.map((chosenClass, index) => (
									<Link className={"onboard_card"} key={index} to="./classes">
										<strong>{chosenClass.name}</strong>
										<p className="list_subtitle">{chosenClass.short}</p>
									</Link>
								))}
							</>
						)}
					</div>

					<button
						className="button no_margin w-button"
						onClick={submitSelection}
						style={{ height: 38 }}
					>
						{sending ? <SpinLoad small /> : "Go to your feed"}
					</button>
				</div>
			)}

			<div className="flex_stretch"></div>

			<OnboardingNavigation pageNum={3} />
		</>
	);
}
