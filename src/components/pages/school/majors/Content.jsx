import React, { useEffect, useState } from "react";
import { CardSearch } from "../../../cards/CenterCards";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { Link, useParams } from "react-router-dom";

export default function SchoolMajorsContent({ schoolRef }) {
	const param = useParams(); //schoolId

	const [majors, setMajors] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				let fetchPosts;
				fetchPosts = await schoolRef.orderBy("members", "desc").get();
				setMajors(fetchPosts.docs);
			} catch (error) {
				console.error(error);
			}

			setLoading(false);
		};

		fetchData();
	}, []);

	return (
		<div className="hub_content">
			<p>
				Can't find your major? <a>Add it here.</a>
			</p>
			<CardSearch placeholder="Search All Majors" />
			{!loading ? (
				<div className="list_grid_div space_between">
					{majors.map((major, index) => (
						<Link
							to={`/school/${param.schoolId}/major/${major.id}`}
							className="hub_card bot_padding hoverable"
							key={index}
						>
							<strong>{major.data().name}</strong>
							<p className="list_subtitle">{major.data().members} Members</p>
						</Link>
					))}
				</div>
			) : (
				<div style={{ textAlign: "center" }}>
					<Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
				</div>
			)}
		</div>
	);
}
