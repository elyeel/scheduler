import React from "react";
import DayList from "./DayList";
import Appointment from "components/Appointment";
import "components/Application.scss";
import {
	getAppointmentsForDay,
	getInterview,
	getInterviewersForDay
} from "components/helpers/selectors";
import useApplicationData from "hooks/useApplicationData";

export default function Application(props) {
	const {
		state,
		setDay,
		bookInterview,
		cancelInterview
	} = useApplicationData();

	//get interviewers props
	const interviewers = getInterviewersForDay(state, state.day);

	//renders appointment by day
	let list = getAppointmentsForDay(state, state.day).map(appt => {
		const interview = getInterview(state, appt.interview);

		return (
			<Appointment
				key={appt.id}
				{...appt}
				interview={interview}
				bookInterview={bookInterview}
				cancelInterview={cancelInterview}
				interviewers={interviewers}
			/>
		);
	});

	//renders sidebar
	return (
		<main className="layout">
			<section className="sidebar">
				<img
					className="sidebar--centered"
					src="images/logo.png"
					alt="Interview Scheduler"
				/>
				<hr className="sidebar__separator sidebar--centered" />
				<nav className="sidebar__menu">
					<DayList days={state.days} day={state.day} setDay={setDay} />
				</nav>
				<img
					className="sidebar__lhl sidebar--centered"
					src="images/lhl.png"
					alt="Lighthouse Labs"
				/>
			</section>
			<section className="schedule">
				{list}
				<Appointment key="last" time="5pm" />
			</section>
		</main>
	);
}
