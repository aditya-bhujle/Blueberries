import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signOut } from "../../firebase/auth";

import Search from "./Search";
import SignedOutLinks from "./SignedOutLinks";

export default function Navbar({ user, userInfo, toggleMenu, menuVisible }) {
	const [showMobileNavbar, setShowMobileNavbar] = useState(false);

	const signedinLinks = user && (
		<>
			<button
				className="button select no_margin nav_mobile show_mobile"
				onClick={() => setShowMobileNavbar(!showMobileNavbar)}
			>
				<svg width="18px" height="18px">
					<use xlinkHref="#search" />
				</svg>
			</button>

			{userInfo && (
				<div className="button select no_margin hide_mobile">
					{userInfo.username}
				</div>
			)}
			<div className="button_div margin">
				<button
					className="button no_margin nav_mobile"
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
			{user && (
				<svg width="20px" height="20px" onClick={() => toggleMenu()} style={{marginRight: "10px", fill: menuVisible ? "#1a73e8" : "black"}}>
					<use xlinkHref="#menu" />
				</svg>
			)}

			<Link to="/">
				<h3 className="logo">Blueberries</h3>
			</Link>

			<div className="flex_stretch">
				<form
					noValidate
					className="form_block w-form nav user"
					style={{ position: "relative" }}
					role="search"
					onSubmit={(e) => e.preventDefault()}
				>
					{user && <Search />}
				</form>
			</div>

			{signedinLinks || signedoutLinks}

			{showMobileNavbar && (
				<div className="mobile_navbar">
					<Search />
				</div>
			)}
		</div>
	);
}
