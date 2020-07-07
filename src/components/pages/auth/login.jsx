import React, { useState } from "react";
import {
	signinWithGoogle,
	signin,
} from "../../../firebase/auth";
import { Redirect } from "react-router-dom";

export default function Login({ location }) {
	document.title = "Log In | Blueberries"

	const [loggedIn, setLoggedIn] = useState(false);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [loginError, setLoginError] = useState("");

	async function handleSubmit(e) {
		e.preventDefault();

		try {
			await signin(email, password);
			setEmail("");
			setPassword("");
			setLoggedIn(true);
		} catch (error) {
			if (
				error.code === "auth/user-not-found" ||
				error.code === "auth/invalid-password"
			)
				setLoginError("The user or password was incorrect, please try again");
			else {
				console.log(error);
				setLoginError(error.message);
			}
		}
	}

	async function handleLogin(auth) {
		try {
			await auth();
			setEmail("");
			setPassword("");
			setLoggedIn(true);
		} catch (error) {
			console.error(error);
			setLoginError("An unexpected error has occured, please try again later");
		}
	}

	if (loggedIn) return <Redirect to={location.state} />;

	return (
		<div className="section content">
			<div className="w-container hub_card modal">
				<h2 className="main_color">Welcome Back!</h2>
				<div className="signup_button_div">
					<button
						className="button no_margin w-button"
						onClick={() => handleLogin(signinWithGoogle)}
					>
						Sign in with Google
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
						value="Login"
						data-wait="Please wait..."
						className="button no_margin w-button"
					/>
				</form>

				{loginError && <p className="alert">{loginError}</p>}

				<div className="line"></div>
				<p>
					Don't have an account? 
					<strong className="main_color">Sign up</strong>
				</p>
			</div>
		</div>
	);
}
