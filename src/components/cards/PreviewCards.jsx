import React from "react";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";

function CardPreviewInfo({
	title,
	subtitle,
	members,
	description,
	loading,
	linkUrl,
	onClick,
	teacherLink,
}) {
	const content = (
		<>
			<h3>{loading ? <Skeleton height={24} /> : title}</h3>
			{subtitle && (
				<h4 className="main_color">
					<strong>{loading ? <Skeleton width={200} /> : subtitle}</strong>
				</h4>
			)}
			<div className="hub_about_count">
				{loading ? <Skeleton width={50} /> : members + " Joined"}
				{teacherLink ? (
					<>
						{" ⋅ "}
						<Link className="text_link" to={".."}>
							Go to Hub
						</Link>
					</>
				) : (
					""
				)}
			</div>
			{description && <p>{loading ? <Skeleton count={3} /> : description}</p>}
		</>
	);
	return linkUrl ? (
		<a href="." className="hub_card bot_padding">
			{content}
		</a>
	) : (
		<div
			className="hub_card bot_padding"
			style={onClick ? { cursor: "pointer" } : {}}
			onClick={onClick}
		>
			{content}
		</div>
	);
}

function CardPreviewList({
	title,
	subtitle,
	elements,
	link,
	isDouble,
	bot_padding,
	children,
	titleLoading,
	loading,
}) {
	const listContent = (element) => (
		<>
			{element.image && (
				<img
					{...element.image}
					sizes="100vw"
					alt="Preview Card"
					className="hub_notes_image small"
				/>
			)}
			<p className="list_date">{element.right}</p>
			<strong>{element.header}</strong>
			<p className="list_subtitle">
				{loading ? <Skeleton width={50} /> : element.content}
			</p>
		</>
	);

	return (
		<div className={"hub_card" + (bot_padding ? " bot_padding" : "")}>
			{title && (
				<h3>{titleLoading && loading ? <Skeleton height={24} /> : title}</h3>
			)}
			{subtitle && (
				<h4 className="main_color">
					<strong>{subtitle}</strong>
				</h4>
			)}

			<div className={isDouble ? "list_grid_div" : ""}>
				{elements.map((element, index) =>
					element.link ? (
						<Link
							className="list_div"
							key={index}
							to={element.link || "/notfound"}
						>
							{listContent(element)}
						</Link>
					) : (
						<div className="list_div w-clearfix" key={index}>
							{listContent(element)}
						</div>
					)
				)}
			</div>
			{children}
			{link && (
				<>
					<div className="hub_card_line" />
					{Array.isArray(link) ? (
						<div className="hub_card_links multiple">
							{link.map((link) => (
								<a href="www.google.com" className="link" key={link}>
									{link}
								</a>
							))}
						</div>
					) : (
						<div className="hub_card_links">
							<a href="www.google.com" className="link">
								{link}
							</a>
						</div>
					)}
				</>
			)}
		</div>
	);
}

function CardPreviewListSkeleton({ title, isDouble, link }) {
	return (
		<div className="hub_card">
			<h3>{title}</h3>

			<div className={isDouble ? "list_grid_div" : ""}>
				{Array(isDouble ? 6 : 3)
					.fill()
					.map((i, index) => (
						<div className="list_div w-clearfix" key={index}>
							<strong>
								<Skeleton width={isDouble ? 125 : 200} />
							</strong>
							<p className="list_subtitle">
								<Skeleton width={isDouble ? 100 : 150} />
							</p>
						</div>
					))}
			</div>
			<div className="hub_card_line" />
			<div className="hub_card_links">
				<div className="link">{link}</div>
			</div>
		</div>
	);
}

function CardPreviewPictures({ title, subtitle, pictures, link }) {
	return (
		<div className="hub_card">
			<h3 className="main_color">{title}</h3>
			<div>
				<strong>{subtitle}</strong>
				<div className="hub_chat_photos_div">
					{pictures.map((picture, index) => (
						<img
							src={picture}
							sizes="100vw"
							className="hub_chat_photo"
							key={index}
							alt="Card Preview"
						/>
					))}
				</div>
			</div>
			<div className="hub_card_line" />
			<div className="hub_card_links">
				<a href="www.google.com" className="link">
					{link}
				</a>
			</div>
		</div>
	);
}

function CardPreviewReview(props) {
	const { loading, title } = props;

	const calculate = (num) => Math.round((num / props.counter) * 100) / 100;

	const overall = calculate(props.overall);
	const difficulty = calculate(props.difficulty);
	const take_again_perc = calculate(props.take_again) * 100;
	const textbook_perc = calculate(props.textbook) * 100;
	const attendance_perc = calculate(props.attendance) * 100;

	return (
		<CardPreviewList
			title={title}
			elements={[
				{ header: "Overall Rating", content: (overall || 0) + " / 5" },
				{ header: "Average Difficulty", content: (difficulty || 0) + " / 5" },
				{
					header: "Attendance Mandatory",
					content: (attendance_perc || 0) + "%",
				},
				{ header: "Textbook Use", content: (textbook_perc || 0) + "%" },
			]}
			isDouble
			link={["Add Review", "See All Reviews"]}
			loading={loading}
			titleLoading={props.titleLoading}
		>
			<div className="list_div w-clearfix">
				<strong>Would Take Professor Again</strong>
				<p className="list_subtitle">
					{loading ? <Skeleton width={50} /> : (take_again_perc || 0) + "%"}
				</p>
			</div>
			<div className="list_div w-clearfix">
				<strong>Featured Quote</strong>
				<p className="list_subtitle">
					{loading ? <Skeleton width={200} /> : props.quote}
				</p>
			</div>
			<div className="list_div w-clearfix">
				<strong>Common Tags</strong>
				<div>
					{loading
						? Array(4)
								.fill()
								.map((i, index) => (
									<div
										style={{ marginRight: "5px", display: "inline-block" }}
										key={index}
									>
										<Skeleton width={120} height={30} />
									</div>
								))
						: props.tags &&
						  props.tags.map((tag) => (
								<div className="tag preview" key={tag}>
									{tag}
								</div>
						  ))}
				</div>
			</div>
		</CardPreviewList>
	);
}

export {
	CardPreviewInfo,
	CardPreviewList,
	CardPreviewListSkeleton,
	CardPreviewPictures,
	CardPreviewReview,
};
