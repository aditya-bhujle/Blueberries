import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SpinLoad from "../../../SpinLoad";

export default function SchoolMajorsContent({
	schoolRef,
	sortQuery,
	sortQueryOrder,
}) {
	const param = useParams(); //schoolId

	const [majors, setMajors] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				let fetchPosts;
				fetchPosts = await schoolRef.orderBy(sortQuery, sortQueryOrder).get();
				setMajors(fetchPosts.docs);
			} catch (error) {
				console.error(error);
			}

			setLoading(false);
		};

		fetchData();
	}, [sortQuery, sortQueryOrder]);

	return !loading ? (
		<div className="list_grid_div space_between">
			{majors.map((major, index) => (
				<Link
					to={`/schools/${param.schoolId}/major/${major.id}`}
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
			<SpinLoad />
		</div>
	);
}
