import React from "react";
import WarningPage from "./warningpage";
import { Link } from "react-router-dom";

export default function ProtectedAccess() {
	const buttonStyle = { width: "100%", borderStyle: "solid" };
	document.title = "Log In Required! | Blueberries"

	return (
		<WarningPage icon="lock" back>
			<h3>You need to be logged in to do that!</h3>
			<p>Create an account or login below!</p>
			<div>
				<Link
					to="/signup"
					className="button no_margin"
					style={{ ...buttonStyle }}
				>
					Create an Account
				</Link>
				<Link
					to="/login"
					className="button no_margin select"
					style={{ marginTop: "10px", ...buttonStyle }}
				>
					Log In
				</Link>
			</div>
		</WarningPage>
	);
}
