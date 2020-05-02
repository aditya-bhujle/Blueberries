import Layout from "../../components/Layout";
import ContentTitle from "../../components/ContentTitle";
import ColumnLayout from "../../components/ColumnLayout";
import SchoolPreview from "../../components/collections/SchoolPreview";
import {
	CardCreate,
	CardSearch,
	CardPost,
} from "../../components/cards/CenterCards";

export default function SchoolHub() {
	const db_import = {
		name: "University of North Carolina at Charlotte",
		short: "UNCC",
		members: 23,
		description:
			"The University of North Carolina at Charlotte is a public research university in Charlotte, North Carolina.",
	};

	const centerContent = (
		<>
			<CardSearch placeholder="Search Popular Posts" />
			<CardCreate
				title="Create Post"
				placeholder="Ask questions, share information, or start a discussion!"
				createPlaceholder="Post Title"
			/>
			<CardPost
				title="Taking this class with Logic and Algorithms"
				author="Anonymous"
				date_posted="Yesterday"
				likes={3}
				comments={4}
				follows={5}
				category="Questions"
				reward="150 Reward"
				alert="This poster is not in this class"
				content="Hi All! I've been signing up for my classes and was wondering if anyone had taken this class and logic at the same time. How hard are they to take together?"
			/>
		</>
	);

	return (
		<Layout
			title={db_import.name}
			short={db_import.short}
			links={[
				{ content: "Posts", path: "/school", icon: "post" },
				{ content: "Majors", path: "/school/majors", icon: "rocket" },
				{ content: "Classes", path: "/school/classes", icon: "flask" },
				{ content: "Clubs", path: "/school/clubs", icon: "football" },
				{ content: "Events", path: "/school/events", icon: "calendar" },
				{ content: "Chats", path: "/school/chats", icon: "chat" },
			]}
		>
			<ContentTitle header="Popular Posts" sortList={["Hot", "Top", "New"]} />
			<ColumnLayout centerContent={centerContent} rightContent={<SchoolPreview/>} />
		</Layout>
	);
}
