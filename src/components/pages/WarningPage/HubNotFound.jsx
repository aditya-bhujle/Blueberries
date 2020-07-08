import React from "react";
import WarningPage from "./warningpage";
export default function NotFoundSection({ text }) {
	document.title = "Page Not Found | Blueberries"
	return (
		<WarningPage icon="warning">
			<h3>Unfortunately, this {text} cannot be found</h3>
			<p>If you think this is an error, please contact the owners</p>
		</WarningPage>
	);
}
