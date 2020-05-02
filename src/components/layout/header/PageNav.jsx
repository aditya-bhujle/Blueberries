import React from "react"
import {Link} from "react-router-dom"

export default function PageNav({ links }) {
	return (
		<div className="hub_nav">
			{links.map((link) => {
				return (
					<Link to={link.path} className = "nav_link" key={link.path}>{/* Active should be nav_link current */}
						<svg className={"nav_svg" + (isActive ? " active" : "")}>{/* TO DO Change styling so nav_link current changes svg color too, remove nav_svg active */}
							<use xlinkHref={`#${link.icon}`} />
						</svg>
						<div className="menu_link post">{link.content}</div>
					</Link>
				);
			})}
		</div>
	);
}
