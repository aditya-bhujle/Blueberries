import React, { useState, useEffect } from "react";
import OnboardingNavigation from "../Navigation";
import { db } from "../../../../firebase/config";

export default function UsernameOnboarding({ username, setUsername }) {
	const [validUsername, setValidUsername] = useState(false);

	const [usernameAvailable, setUsernameAvailable] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const checkAvailability = async () => {
			setLoading(true);
			try {
				const fetchUsers = await db
					.collection("users")
					.where("lowercase_username", "==", username)
					.limit(1)
					.get();

				setUsernameAvailable(fetchUsers.empty);
			} catch (error) {
				console.error(error);
			}

			setLoading(false);
		};

		const usernameRegex = /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;

		if (usernameRegex.test(username)) {
			setValidUsername(true);
			checkAvailability();
		} else setValidUsername(false);
	}, [username]);

	const alertText = () => {
		if (!username) return "";
		else if (username.length < 8) return "Must be over 8 characters";
		else if (username.length > 20) return "Must be between 8 and 20 characters";
		else if (!validUsername) return "Invalid characters!";
		else if (!loading) {
			if (usernameAvailable) return "That username is available!";
			else return "Unfortunately, that username is taken";
		} else return "Loading...";
	};

	return (
		<>
			<h1>
				Welcome to{" "}
				<strong style={{ fontWeight: 700, color: "#1a73e8" }}>
					Blueberries!
				</strong>
			</h1>
			<div
				className="landing_subtitle"
				style={{ fontSize: "22px", lineHeight: "26px" }}
			>
				Before you begin, choose a username
			</div>

			<p>{alertText()}</p>

			<form
				noValidate
				className="form_block w-form"
				style={{ position: "relative" }}
				role="search"
				onSubmit={(e) => e.preventDefault()}
			>
				<div className="hub_card search username">
					<svg className="nav_search_icon">
						<use xlinkHref="#user_add" />
					</svg>
					<input
						type="search"
						className="search_input w-input"
						placeholder="Type something here..."
						style={{ padding: "4px" }}
						value={username}
						onChange={(e) => setUsername(e.currentTarget.value)}
					/>
				</div>
			</form>

			<div className="flex_stretch"></div>
			<OnboardingNavigation page="welcome" hideNext={!usernameAvailable} />
		</>
	);
}
