import MenuLink from "./MenuLink";

export default function Menu() {
	const user = {
		handle: "FirstUser",
		school: "University of North Carolina at Charlotte",
		major: "Computer Science",
		classes: [
			"Data Structures and Algorithms",
			"Logic and Algorithms",
			"Principles of Accounting II",
			"Introduction to Technical Communication",
		],
		clubs: ["Track and Field", "ACM"],
		chats: ["Witherspoon Residence Hall"],
	};

	return (
		<div className="nav_menu">
			<MenuLink content="Your Feed" icon="home" selected />
			<MenuLink content="UNCC" icon="school" />
			<MenuLink content="Community" icon="community" />
			<div className="line even" />
			<MenuLink content={`${user.major} Hub`} icon="hub" />
			<div className="line even" />
			{[
				{ content: user.classes || [], icon: "flask" },
				{ content: user.clubs || [], icon: "football" },
				{ content: user.chats || [], icon: "chat" },
			].map((category) => (
				<div key={category.content}>
					{category.content.map((hub) => (
						<MenuLink key={hub} content={hub} icon={category.icon} />
					))}
					{category.content.length ? <div className="line even" /> : <></>}
				</div>
			))}
			<div className="nav_menu_details">
				<p>Settings</p>
				<p>Download the Android App</p>
				<p>Download the iOS App</p>
				<p>Send Feedback</p>
				<p>About ⋅ Privacy ⋅ Terms</p>
				<p>Blueberries © 2020</p>
			</div>
		</div>
	);
}
