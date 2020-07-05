import React from "react";
import { Link, useLocation } from "react-router-dom";
import { signOut } from "../../firebase/auth";

import Search from "./Search";

export default function Navbar({ user }) {
	const location = useLocation();

	const signedinLinks = user && (
		<>
			<button className="button select no_margin">Messages</button>
			<button className="button select">{user.email}</button>
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
			<Link to="/protected" className="button no_margin">
				Creates an Account
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

			<Search />

			{signedinLinks || signedoutLinks}
		</div>
	);
}
