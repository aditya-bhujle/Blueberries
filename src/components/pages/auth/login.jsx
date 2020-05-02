import React, { useState } from "react";

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	function handleSubmit(e) {
		e.preventDefault();
		console.log(email);
		console.log(password);
	}

	return (
		<div className="section content">
			<div className="w-container hub_card modal">
				<h2 className="main_color">Welcome Back!</h2>
				<div className="signup_button_div">
					<a href="#" className="button no_margin w-button">
						Sign in with Google
					</a>
					<a href="#" className="button w-button">
						Sign in with Facebook
					</a>
				</div>

				<form className="w-form" onSubmit={handleSubmit}>
					<label>Email Address</label>
					<input
						type="email"
						className="hub_card input w-input"
						maxLength="256"
						placeholder="Enter your email address"
						onChange={(e) => setEmail(e.target.value)}
					/>
					<label>Password</label>
					<input
						type="password"
						className="hub_card input w-input"
						maxLength="256"
						placeholder="Enter your password"
						onChange={(e) => setPassword(e.target.value)}
					/>
					<input
						type="submit"
						value="Login"
						data-wait="Please wait..."
						className="button no_margin w-button"
					/>
				</form>

				<div className="line"></div>
				<p>
					Don't have an account? 
					<strong className="main_color">Sign up</strong>
				</p>
			</div>
		</div>
	);
}
