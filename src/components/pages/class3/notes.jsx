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
			<CardSearch placeholder="Search Notes" />
			<CardCreate
				title="Upload Notes"
				placeholder="Share your notes with Professor Long's Class!"
				createPlaceholder="Unit Name"
			/>
			<CardPost
				title="Unit 2.1"
				author="Anonymous"
				date_posted="Yesterday"
				likes={3}
				comments={4}
				content="Notes from Thursday's class. Didn't get first slide but it's on Canvas."
			/>
		</>
	);

	return (
		<Layout
			title={"Data Structures and Algorithms"}
			short={"ITSC 2214 Professor Long"}
			links={[
				{ content: "Posts", path: "/class" },
				{ content: "Chat", path: "/class/chat" },
				{ content: "Notes", path: "/class/notes" },
				{ content: "Calendar", path: "/class/calendar" },
				{ content: "Thoughts", path: "/class/thoughts" },
				{ content: "Reviews", path: "/class/reviews" },
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
