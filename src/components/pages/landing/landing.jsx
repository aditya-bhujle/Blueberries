import React from "react";
import ButtonCombo from "./ButtonCombo";
import { ReactComponent as TalkSVG } from "./resources/home_talk.svg";
import { ReactComponent as StudySVG } from "./resources/home_study.svg";
import { ReactComponent as SecuritySVG } from "./resources/security.svg";
import { ReactComponent as JoinSVG } from "./resources/bottom_cta.svg";

import MajorsImage from "./resources/majors.PNG";
import MenuImage from "./resources/menu.PNG";
import FallPlanImage from "./resources/fall_plan.PNG";
import NotesImage from "./resources/notes.PNG";

export default function LandingPage() {
	const SectionLanding = ({ className, children }) => (
		<div className={"section landing " + (className ? className : "")}>
			{children}
		</div>
	);

	const LandingLeft = ({ className, children }) => (
		<div
			className={"flex_stretch landing_left " + (className ? className : "")}
		>
			{children}
		</div>
	);

	const LandingRight = ({ left, title, children }) => (
		<div className={"landing_right" + (left ? " switch" : "")}>
			<h1 className="landing_content_title">{title}</h1>
			<div className="landing_subtitle content">{children}</div>
		</div>
	);

	return (
		<>
			<SectionLanding className="main">
				<TalkSVG className="landing_home_svg_2" width="400px" height="245px" />
				<StudySVG className="landing_home_svg" width="400px" height="298px" />
				<div className="w-container">
					<h1 className="landing_title">
						The perfect class
						<br />
						<strong style={{ fontWeight: 700, color: "#1a73e8" }}>
							communication hub
						</strong>
					</h1>

					<div className="landing_subtitle">
						Share notes, send messages, and ask questions
					</div>

					<ButtonCombo />
				</div>
			</SectionLanding>

			<SectionLanding className="blue">
				<LandingLeft className="apart">
					<img
						alt="Major Hub"
						src={MajorsImage}
						className="landing_image"
						width="500px"
					/>
					<img alt="Different Hubs" src={MenuImage} className="landing_image" />
				</LandingLeft>
				<LandingRight
					title={
						<>
							Hubs for every
							<br />
							class, club, and
							<br />
							major
						</>
					}
				>
					Your Blueberries college page is arranged
					<br />
					into classes, clubs, and majors so that you
					<br />
					can join specific hubs that uniquely match
					<br />
					you
				</LandingRight>
			</SectionLanding>

			<SectionLanding className="grey">
				<LandingRight
					title={
						<>
							Completely safe
							<br />
							and secure
						</>
					}
					left
				>
					You are completely anonymous when
					<br />
					using Blueberries. There's nothing tying you
					<br />
					to your student profile and other students
					<br />
					will only be able to see your username.
				</LandingRight>
				<LandingLeft>
					<SecuritySVG width="642px" height="430px" />
				</LandingLeft>
			</SectionLanding>

			<SectionLanding>
				<LandingLeft className="left">
					<img
						alt="Post and Comments"
						src={FallPlanImage}
						className="landing_image curved"
					/>
				</LandingLeft>
				<LandingRight
					title={
						<>
							Talk about what
							<br />
							matters
						</>
					}
				>
					Share concerns, express issues, and make
					<br />
					your voice heard. Let others know how
					<br />
					you feel about certain topics and hear other
					<br />
					students opinions.
				</LandingRight>
			</SectionLanding>

			<SectionLanding className="center">
				<h1 className="landing_content_title">Connect with your class</h1>
				<div className="landing_subtitle content">
					Send notes, send messages and ask questions to help and grow your
					learning experience
				</div>
				<img
					alt="Notes for Data Structures"
					src={NotesImage}
					className="landing_image curved"
				/>
			</SectionLanding>

			<SectionLanding className="end">
				<JoinSVG className="landing_home_svg" width="365px" height="217px" />
				<div>
					<h2 style={{ marginBottom: "25px" }}>Ready to join Blueberries?</h2>
					<ButtonCombo />
				</div>
			</SectionLanding>
		</>
	);
}
