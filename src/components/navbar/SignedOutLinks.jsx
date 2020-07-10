import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function SignedOutLinks() {
	const location = useLocation();

	return (
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
}
