export default function Navbar() {
	return (
		<div className="navbar">
			<h3 className="logo">Blueberries</h3>
			<form className="form_block nav w-form">
				<input
					className="search_input nav w-input"
					placeholder="Type something here..."
				/>
			</form>
			<button className="button select no_margin">Messages</button>
			<div className="button_div margin">
				<button className="button no_margin">
					TestName2
				</button>
				<div className="dropdown_div">
					<div className="list_div dropdown">
						Settings
					</div>
					<div className="list_div dropdown">
						Log Out
					</div>
				</div>
			</div>
		</div>
	);
}
