import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
	const signedinLinks = (
		<>
			<button className="button select no_margin">Messages</button>
			<div className="button_div margin">
				<button className="button no_margin">TestName2</button>
				<div className="dropdown_div">
					<div className="list_div dropdown">Settings</div>
					<div className="list_div dropdown">Log Out</div>
				</div>
			</div>
		</>
	);

	const signedoutLinks = (
		<>
			<button className="button no_margin">Create an Account</button>
			<button className="button select">Log In</button>
		</>
	);

	return (
		<div className="navbar">
			<Link to="/">
				<h3 className="logo">Blueberries</h3>
			</Link>
			<form className="form_block nav w-form">
				<input
					className="search_input nav w-input"
					placeholder="Type something here..."
				/>
			</form>
			{signedinLinks}
			{signedoutLinks}
		</div>
	);
}
