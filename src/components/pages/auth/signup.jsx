import React, { useState } from "react";
import { signup } from "../../../firebase/auth";

export default function Signup() {
	document.title = "Sign Up | Blueberries"

	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [loginError, setLoginError] = useState("");

	async function handleSubmit(e) {
		e.preventDefault();

		setLoginError(await signup(email, password));
		setUsername("");
		setEmail("");
		setPassword("");
	}

	return (
		<div className="section content">
			<div className="w-container hub_card modal">
				<h2 className="main_color">Welcome to Blueberries!</h2>
				<div className="signup_button_div">
					<a href="www.google.com" className="button no_margin w-button">
						Sign up with Google
					</a>
					<a href="www.google.com" className="button w-button">
						Sign up with Facebook
					</a>
				</div>

				<form className="w-form" onSubmit={handleSubmit}>
					<label>Username</label>
					<input
						type="text"
						className="hub_card input w-input"
						maxLength="256"
						placeholder="Enter your username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
					<label>Email Address</label>
					<input
						type="email"
						className="hub_card input w-input"
						maxLength="256"
						placeholder="Enter your email address"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<label>Password</label>
					<input
						type="password"
						className="hub_card input w-input"
						maxLength="256"
						placeholder="Enter your password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<input
						type="submit"
						value="Sign up for free"
						data-wait="Please wait..."
						className="button no_margin w-button"
					/>
				</form>

				{loginError && <p className="alert">{loginError}</p>}

				<div className="line"></div>
				<p>
					Already have an account? 
					<strong className="main_color">Log in</strong>
				</p>
				<p>
					By signing up to Blueberries, you're agreeing to our
					<br />‍<strong className="main_color">
						Terms of Service{" "}
					</strong>and <strong className="main_color">Privacy Policy</strong>
				</p>
			</div>
		</div>
	);
}
