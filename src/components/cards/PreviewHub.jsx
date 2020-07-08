import React from "react";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";

export default function PreviewHub({
	title,
	subtitle,
	elements,
	button,
	loading,
}) {
	return (
		<div className="hub_card bot_padding" onClick={button.onClick}>
			{title && <h3>{loading ? <Skeleton height={24} /> : title}</h3>}
			<h4 className="main_color">
				<strong>{loading ? <Skeleton /> : subtitle}</strong>
			</h4>
			{loading ? (
				<>
					<div className="list_div w-clearfix">
						<Skeleton height={34} />
					</div>
					<div className="list_div w-clearfix">
						<Skeleton height={34} />
					</div>
					<div className="list_div w-clearfix">
						<Skeleton height={34} />
					</div>
				</>
			) : (
				elements.map((element, index) => (
					<Link
						className="list_div"
						key={index}
						to={element.link || "/notfound"}
					>
						{element.image && (
							<img
								{...element.image}
								sizes="100vw"
								alt=""
								className="hub_notes_image small"
							/>
						)}
						<p className="list_date">{element.right}</p>
						<strong>{element.header}</strong>
						<p className="list_subtitle">{element.content}</p>
					</Link>
				))
			)}
			{loading ? (
				<Skeleton height={37} width={125} />
			) : (
				<Link className="button no_margin w-button select" style={{borderStyle: "solid"}} to={button.link}>
					{button.content}
				</Link>
			)}
		</div>
	);
}
