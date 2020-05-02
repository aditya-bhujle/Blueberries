import Layout from "../../components/Layout";
import ContentTitle from "../../components/ContentTitle";
import ColumnLayout from "../../components/ColumnLayout";

import ClassPreview from "../../components/collections/ClassPreview";
import {
	CardCreate,
	CardSearch,
	CardPost,
} from "../../components/cards/CenterCards";

export default function ClassHub() {
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
			<CardPost
				title="Unit 2.1"
				author="Anonymous"
				date_posted="Yesterday"
				likes={3}
				comments={4}
				category="Notes"
				content="Notes from Thursday's class. Didn't get first slide but it's on Canvas."
			/>
		</>
	);

	return (
		<Layout
			title={"Data Structures and Algorithms"}
			short={"ITSC 2214 Professor Long"}
			links={[
				{ content: "Posts", path: "/class", icon: "post" },
				{ content: "Chat", path: "/class/chat", icon: "chat" },
				{ content: "Notes", path: "/class/notes", icon: "notes" },
				{ content: "Calendar", path: "/class/calendar", icon: "calendar" },
				{ content: "Thoughts", path: "/class/thoughts", icon: "thoughts" },
				{ content: "Reviews", path: "/class/reviews", icon: "reviews" },
			]}
		>
			<ContentTitle header="Popular Posts" sortList={["Hot", "Top", "New"]} />
			<ColumnLayout
				centerContent={centerContent}
				rightContent={<ClassPreview />}
			/>
		</Layout>
	);
}
