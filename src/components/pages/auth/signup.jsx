import React, { useState } from "react";
import { signinWithGoogle, signup } from "../../../firebase/auth";
import { Redirect, Link } from "react-router-dom";

export default function Signup() {
	document.title = "Sign Up | Blueberries";
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [loginError, setLoginError] = useState("");
	const [signedUp, setSignedUp] = useState(false);

	async function handleSubmit(e) {
		e.preventDefault();

		setLoginError(await signup(email, password));
		setEmail("");
		setPassword("");
		setSignedUp(true);
	}

	async function handleThirdPartyLogin(auth) {
		try {
			await auth();
			setEmail("");
			setPassword("");
			setSignedUp(true);
		} catch (error) {
			console.error(error);
			setLoginError("An unexpected error has occured, please try again later");
		}
	}

	if (signedUp) return <Redirect to="/onboarding" />;

	return (
		<div className="section content">
			<div className="w-container hub_card modal">
				<h2 className="main_color">Welcome to Blueberries!</h2>
				<div className="signup_button_div">
					<button
						onClick={() => handleThirdPartyLogin(signinWithGoogle)}
						className="button no_margin w-button"
					>
						Sign up with Google
					</button>
				</div>

				<form className="w-form" onSubmit={handleSubmit}>
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
					<Link to="/login">
						<strong className="text_link main_color">Login here</strong>
					</Link>
				</p>
				{/*<p>
					By signing up to Blueberries, you're agreeing to our
					<br />‍<strong className="main_color">
						Terms of Service{" "}
					</strong>and <strong className="main_color">Privacy Policy</strong>
				</p>*/}
			</div>
		</div>
	);
}
