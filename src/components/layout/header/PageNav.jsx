import Link from "next/link";
import { useRouter } from "next/router";

export default function PageNav({ links }) {
	const active = useRouter().pathname;
	return (
		<div className="hub_nav">
			{links.map((link) => {
				const isActive = active == link.path;
				return (
					<Link href={link.path} key={link.path}>
						<a className={isActive ? "nav_link current" : "nav_link"}>
							<svg className={"nav_svg" + (isActive ? " active" : "")}>
								<use xlinkHref={`#${link.icon}`} />
							</svg>
							<div className="menu_link post">{link.content}</div>
						</a>
					</Link>
				);
			})}
		</div>
	);
}
