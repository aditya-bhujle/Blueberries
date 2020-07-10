import React from "react";
import { Link } from "react-router-dom";
import { signOut } from "../../firebase/auth";

import Search from "./Search";
import SignedOutLinks from "./SignedOutLinks";

export default function Navbar({ user, userInfo }) {
	const signedinLinks = user && (
		<>
			{userInfo && (
				<div className="button select no_margin">{userInfo.username}</div>
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

	const signedoutLinks = !user && <SignedOutLinks />;

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
