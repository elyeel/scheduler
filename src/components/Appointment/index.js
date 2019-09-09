import "components/Appointment";
import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {
	const EMPTY = "EMPTY";
	const SHOW = "SHOW";
	const CREATE = "CREATE";
	
	const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
	);
	
	function save(name, interviewer) {
		const interview = {
			student: name,
			interviewer
		};
	}

	// console.log(props);
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
				interviewers={[]}
				onCancel={() => back()}
				onSave={() => {
					save();
					props.bookInterview();
				}}
			/>)}
		</article>
	);
}
