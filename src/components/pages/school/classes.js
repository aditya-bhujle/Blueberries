import Layout from "../../components/Layout";
import ContentTitle from "../../components/ContentTitle";
import ColumnLayout from "../../components/ColumnLayout";
import SchoolPreview from "../../components/collections/SchoolPreview";
import { CardPreviewList } from "../../components/cards/PreviewCards";
import { CardSearch } from "../../components/cards/CenterCards";

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
			<p>
				Can't find your major? <a>Add it here.</a>
			</p>
			<CardSearch placeholder="Search All Majors" />
			<CardPreviewList
				isDouble
				elements={[
					{ header: "Psychology", content: "24 Students" },
					{ header: "Psychology", content: "24 Students" },
					{ header: "Psychology", content: "24 Students" },
					{ header: "Psychology", content: "24 Students" },
					{ header: "Psychology", content: "24 Students" },
					{ header: "Psychology", content: "24 Students" },
				]}
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
			<ContentTitle header="All UNCC Majors" />
			<ColumnLayout
				centerContent={centerContent}
				rightContent={<SchoolPreview />}
			/>
		</Layout>
	);
}
