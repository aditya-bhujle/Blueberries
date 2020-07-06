import React from "react";
import { Link } from "react-router-dom";

export default function ButtonCombo() {
	return (
		<>
			<Link className="button landing no_margin" to="/signup">
				Create an Account
			</Link>
			<Link
				className="button landing select"
				style={{ marginLeft: "20px" }}
				to="/login"
			>
				Log In
			</Link>
		</>
	);
}
