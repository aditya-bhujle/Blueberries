import React from "react";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";

export default function Header({ name, short, shortLink, subShort, loading, children }) {
	return (
		<div className="hub_header">
			<div>
				<div className="hub_parent_title">
					{loading ? <Skeleton width={40} /> : <Link to={shortLink}>{short}</Link>}
				</div>
				{subShort && (
					<>
						<div className="hub_parent_title">/</div>
						<div className="hub_teacher_title">
							{loading ? <Skeleton width={70} /> : subShort}
						</div>
					</>
				)}
				<h2>{loading ? <Skeleton width={500} /> : name}</h2>
			</div>
			<div>
				{children || (
					<>
						<button className="button w-button">Join Class</button>
						<button className="button select w-button">Leave Class</button>
					</>
				)}
			</div>
		</div>
	);
}
