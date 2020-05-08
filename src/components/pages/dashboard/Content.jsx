import React, { useEffect, useState } from "react";
import { CardSearch, CardPost } from "../../cards/CenterCards";
import firebase from "firebase/app";
import { db } from "../../../firebase/config";

export default function DashboardContent() {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);

	const postsCollectionRef = db
		.collection("schools")
		.doc("bjqzPlSzvQZUivxCAFIY")
		.collection("classes")
		.doc("tMDQlZ37elhZdqWK7HTq")
		.collection("posts");

	useEffect(() => {
		const fetchData = async () => {
			try {
				let fetchPosts = await postsCollectionRef.get();
				console.log("Data fetched!");
				setPosts(fetchPosts.docs);
			} catch (error) {
				console.error(error);
			}

			setLoading(false);
		};

		fetchData();
	}, []);

	/*useEffect(() => {
		//db.collection("schools")
			// .doc("bjqzPlSzvQZUivxCAFIY")
			// .collection("classes")
			// .doc("tMDQlZ37elhZdqWK7HTq")
			props.dbPath
			.collection("posts")
			.get()
			.then(function (doc) {
				if (doc.exists) {
					console.log("Document data:", doc.data());
					let { date_posted, ...restOfPost } = doc.data();
					setPost(restOfPost);
				} else {
					// doc.data() will be undefined in this case
					console.log("No such document!");
				}
			})
			.catch(function (error) {
				console.log("Error getting document:", error);
			});
	}, [props.dbPath]);*/

	return (
		<div className="hub_content">
			<CardSearch placeholder="Search Popular Posts" />
			{loading ? (
				<>
					<CardPost loading />
					<CardPost loading />
					<CardPost loading />
					<CardPost loading />
				</>
			) : (
				posts.map((post) => {
					let { date_posted, ...restOfPost } = post.data();
					return (
						<CardPost
							{...restOfPost}
							date_posted={date_posted.toDate().toString()}
							key={post}
							likePost={async () => {
								try {
									await postsCollectionRef.doc(post.id).update({
										likes: firebase.firestore.FieldValue.increment(1),
									});
									console.log("Post Liked!");
								} catch (error) {
									console.error(error);
								}
							}}
						/>
					);
				})
			)}

			{/*<CardPost
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
				source="ITSC 2175 Hub"
				followed
			/>
			<div className="line" />
			<CardPost
				title="Check out this quizlet, its perfect to study for the quiz!"
				author="Anonymous"
				date_posted="Yesterday"
				likes={3}
				comments={4}
				follows={5}
				category="Resource"
				source="ITSC 2214 - Long"
			/>
			<CardPost
				title="Can anyone help me move out?"
				content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere."
				author="Anonymous"
				date_posted="Yesterday"
				likes={3}
				comments={4}
				follows={0}
				source="UNCC"
			/>*/}
		</div>
	);
}
