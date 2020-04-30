import Link from "next/link"

export default function MenuLink({ content, icon, selected }) {
	return (
		<Link href="/school">
			<a className={`list_div category menu ${selected ? "selected" : ""}`}>
				<svg className={"menu_svg" + (selected ? " active" : "")}>
					<use xlinkHref={`#${icon}`} />
				</svg>
				<strong className="menu_link">{content}</strong>
			</a>
		</Link>
	);
}
