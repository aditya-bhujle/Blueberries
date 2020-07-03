import React, { useState, useEffect, useContext } from "react";
import { useLocation, Redirect } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { db } from "../../../firebase/config";
import { UserContext } from "../../../App";
import { CardSearch } from "../../cards/CenterCards";
import Section from "../../Section";
import { useToasts } from "react-toast-notifications";
import SchoolResults from "../onboarding/school/SchoolResults";

export default function FindSchools() {
	const [schools, setSchools] = useState([]);
	const [loading, setLoading] = useState(true);

	const [searchQuery, setSearchQuery] = useState("");
	const loc = useLocation();
	const [urlLoading, setUrlLoading] = useState(true);

	const userInfo = useContext(UserContext);
	const { addToast } = useToasts();

	useEffect(() => {
		let searchHash = new URLSearchParams(loc.search).get("search");
		setSearchQuery(searchHash);
		setUrlLoading(false);
	}, [loc.search]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				let fetchInfo = await db.collection("schools").get();
				console.log("School info set!");

				setSchools(fetchInfo.docs);
			} catch (error) {
				console.error(error);
			}

			setLoading(false);
		};

		fetchData();
	}, []);

	async function toggleJoin(schoolInfo, hasJoined) {
		const userRef = db.collection("users").doc(userInfo.id);

		try {
			await userRef.update({
				school: hasJoined ? {} : schoolInfo,
			});
			addToast(
				`Successfully ${hasJoined ? "Left" : "Added to"} ${schoolInfo.name}!`,
				{
					appearance: "success",
					autoDismiss: true,
				}
			);
		} catch (error) {
			console.error(error);
		}
	}

	function SchoolIcon() {
		return (
			<svg
				style={{
					height: "48px",
					width: "48px",
					marginBottom: "10px",
				}}
			>
				<use xlinkHref="#school" />
			</svg>
		);
	}

	function conditionalRender() {
		if (loading)
			return (
				<div className="list_grid_div onboarding_school">
					{new Array(3).fill().map((s, i) => (
						<div
							className="hub_card hoverable"
							style={{ padding: 15, textAlign: "center" }}
							key={i}
						>
							<SchoolIcon />
							<div style={{ fontSize: "16px", lineHeight: "22px" }}>
								<Skeleton width={200} />
								<p className="list_subtitle" style={{ marginTop: "5px" }}>
									<Skeleton width={75} />
								</p>
							</div>
						</div>
					))}
				</div>
			);

		const SchoolCard = ({ schoolInfo }) => {
			const hasJoined = userInfo && schoolInfo.id === userInfo.school.id;
			return (
				<div className="hub_card" style={{ padding: 15, textAlign: "center" }}>
					<SchoolIcon />
					<div
						style={{
							fontSize: "16px",
							lineHeight: "22px",
							marginBottom: "10px",
						}}
					>
						<strong>{schoolInfo.name}</strong>
						<p className="list_subtitle" style={{ marginTop: "5px" }}>
							{schoolInfo.short}
						</p>
					</div>

					<button
						onClick={() =>
							toggleJoin(
								{
									id: schoolInfo.id,
									name: schoolInfo.name,
									short: schoolInfo.short,
								},
								hasJoined
							)
						}
						className={"button no_margin" + (hasJoined ? " select border" : "")}
						style={{ width: "100%" }}
					>
						{(hasJoined ? "Joined " : "Join ") + schoolInfo.short}!
					</button>
				</div>
			);
		};

		if (!searchQuery)
			return (
				<div className="list_grid_div onboarding_school">
					{schools.map((school, index) => (
						<SchoolCard
							schoolInfo={{ id: school.id, ...school.data() }}
							key={index}
						/>
					))}
				</div>
			);

		return (
			<SchoolResults
				searchQuery={searchQuery}
				schoolId={userInfo && userInfo.school.id}
			>
				{(school) => (
					<SchoolCard schoolInfo={{ id: school.objectID, ...school }} />
				)}
			</SchoolResults>
		);
	}

	return (
		<Section>
			{!urlLoading && (
				<Redirect
					to={loc.pathname + (searchQuery ? `?search=${searchQuery}` : "")}
				/>
			)}

			<h3>Choose Your Schools</h3>

			<p>Can't find your school? Request it here</p>
			<CardSearch
				placeholder="Search All Schools"
				searchHub={(query) => setSearchQuery(query)}
				defaultValue={searchQuery}
			/>

			{searchQuery && (
				<strong style={{ marginBottom: "5px" }}>
					Search Results for "{searchQuery}"
				</strong>
			)}

			{conditionalRender()}
		</Section>
	);
}
