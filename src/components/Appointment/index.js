import "components/Appointment";
import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import useVisualMode from "hooks/useVisualMode";
import Status from "./Status";

export default function Appointment(props) {
	const EMPTY = "EMPTY";
	const SHOW = "SHOW";
	const CREATE = "CREATE";
	const SAVING = "SAVING";
	const DELETING = "DELETING";
	
	const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
	);
	
	function save(name, interviewer) {
		const interview = {
			student: name,
			interviewer
		};
		transition(SAVING);
		props.bookInterview(props.id, interview);
	}

	console.log(props);
	return (
		<article className="appointment">
			<Header time={props.time} />
			{mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
			{mode === SHOW && (
				<Show
					interviewer={props.interview.interviewer}
					student={props.interview.student}
				/>
			)}
			{mode === CREATE && (<Form 
				interviewers={props.interviewers}
				// name={props.interview.student}
				// interviewer={props.interview.interviewer.id}
				onCancel={() => back()}
				onSave={save}
			/>)}
			{mode === SAVING && <Status message="Saving" />}
			{mode === DELETING && <Status message="Deleting" />}
		</article>
	);
}
