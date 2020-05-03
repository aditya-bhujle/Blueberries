import React from "react";
import { CardPost } from "../../cards/CenterCards";
import SortList from "../../SortList";
import PostComment from "./Comment";

export default function PostContent() {
	return (
		<div className="hub_content">
			<CardPost
				title="Taking this class with Logic and Algorithms"
				author="Anonymous"
				date_posted="Yesterday"
				likes={3}
				comments={4}
				follows={5}
				category="Questions"
				reward="150 Reward"
				alert="This poster is not in this class"
				content="Hi All! I've been signing up for my classes and was wondering if anyone had taken this class and logic at the same time. How hard are they to take together?"
				source="ITSC 2175 Hub"
			/>

			<div className="hub_card_links multiple">
				<strong>4 Comments</strong>
				<SortList list={["Hot", "New", "Top"]} />
			</div>

			<form className="hub_card bot_padding">
				<textarea
					placeholder="Write your comment here!"
					maxLength="5000"
					className="search_input w-input"
				/>
				<button href="www.google.com" className="button comment w-button">
					Comment
				</button>
			</form>

			<div className="hub_card bot_padding">
				<PostComment
					top_answer
					author="Anonymous"
					content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere."
					date_posted="Yesterday"
					likes={4}
				>
					<PostComment
						author="Anonymous"
						content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere."
						date_posted="Yesterday"
						likes={4}
					>
						<PostComment
							author="Anonymous"
							content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere."
							date_posted="Yesterday"
							likes={4}
						></PostComment>
					</PostComment>
				</PostComment>
				<PostComment
					author="Anonymous"
					content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere."
					date_posted="Yesterday"
					likes={4}
				>
					<PostComment
						author="Anonymous"
						content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere."
						date_posted="Yesterday"
						likes={4}
					>
						<PostComment
							author="Anonymous"
							content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere."
							date_posted="Yesterday"
							likes={4}
						></PostComment>
					</PostComment>
				</PostComment>
			</div>
		</div>
	);
}
