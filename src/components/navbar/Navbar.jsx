import React from "react";
import { Link, useLocation } from "react-router-dom";
import { signOut } from "../../firebase/auth";

import Search from "./Search";

export default function Navbar({ user, userInfo }) {
	const location = useLocation();

	const signedinLinks = user && (
		<>
			<button className="button select no_margin">Messages</button>
			{userInfo && (
				<button className="button select">{userInfo.username}</button>
			)}
			<div className="button_div margin">
				<button
					className="button no_margin"
					onClick={async () => await signOut()}
				>
					Log Out
				</button>
				<div className="dropdown_div">
					<div className="list_div dropdown">Settings</div>
					<div className="list_div dropdown">Log Out</div>
				</div>
			</div>
		</>
	);

	const signedoutLinks = !user && (
		<>
			<Link to="/signup" className="button no_margin">
				Create an Account
			</Link>
			<Link
				to={{ pathname: "/login", state: location.pathname }}
				className="button select"
			>
				Log In
			</Link>
		</>
	);

	return (
		<div className="navbar">
			<Link to="/">
				<h3 className="logo">Blueberries</h3>
			</Link>

			<form
				noValidate
				className="form_block w-form nav user"
				style={{ position: "relative" }}
				role="search"
			>
				{user && <Search />}
			</form>

			{signedinLinks || signedoutLinks}
		</div>
	);
}
