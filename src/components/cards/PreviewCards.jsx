import React from "react";

function CardPreviewInfo({ title, subtitle, members, description }) {
	return (
		<div className="hub_card">
			<h3>{title}</h3>
			{subtitle && (
				<h4 className="main_color">
					<strong>{subtitle}</strong>
				</h4>
			)}
			<div className="hub_about_count">{members} Joined</div>
			<p>{description}</p>
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
}) {
	return (
		<div className={"hub_card" + (bot_padding ? " bot_padding" : "")}>
			{title && <h3>{title}</h3>}
			{subtitle && (
				<h4 className="main_color">
					<strong>{subtitle}</strong>
				</h4>
			)}

			<div className={isDouble ? "list_grid_div" : ""}>
				{elements.map((element, index) => (
					<div className="list_div w-clearfix" key={index}>
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
					</div>
				))}
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
	const { take_again, quote, tags, ...list_props } = props;

	return (
		<CardPreviewList
			{...list_props}
			title="Professor Bruce Long"
			elements={[
				{ header: "Overall Rating", content: "4.6 / 5" },
				{ header: "Average Difficulty", content: "2.3 / 5" },
				{ header: "Attendance Mandatory", content: "71%" },
				{ header: "Textbook Use", content: "42%" },
			]}
			isDouble
			link={["Add Review", "See All Reviews"]}
		>
			<div className="list_div w-clearfix">
				<strong>Would Take Professor Again</strong>
				<p className="list_subtitle">{take_again}%</p>
			</div>
			<div className="list_div w-clearfix">
				<strong>Featured Quote</strong>
				<p className="list_subtitle">"{quote}"</p>
			</div>
			<div className="list_div w-clearfix">
				<strong>Common Tags</strong>
				<div>
					{tags.map((tag) => (
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
	CardPreviewPictures,
	CardPreviewReview,
};
