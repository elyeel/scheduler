import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss";
import PropTypes from "prop-types";

InterviewerList.propTypes = {
	interviewer: PropTypes.number,
	setInterviewer: PropTypes.func.isRequired
};

export default function InterviewerList(props) {
	const interviewers = props.interviewers.map(interviewer => {
		return (
			<InterviewerListItem
				key={interviewer.id}
				name={interviewer.name}
				avatar={interviewer.avatar}
				selected={interviewer.id === props.interviewer}
				setInterviewer={() => props.setInterviewer(interviewer.id)}
			/>
		);
	});

	return (
		<section className="interviewers">
			<h4 className="interviewers__header text--light">Interviewer</h4>
			<ul className="interviewers__list">{interviewers}</ul>
		</section>
	);
}
