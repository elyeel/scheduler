import React, { useState, useEffect } from "react";
import axios from "axios";
import DayList from "./DayList";
import Appointment from "components/Appointment";
import "components/Application.scss";
import {
	getAppointmentsForDay,
	getInterview,
	getInterviewersForDay
} from "components/helpers/selectors";

export default function Application(props) {
	// const [day, setDay] = useState("Monday");
	// const setDay = day => setState({ ...state, day });
	// const setDays = days => setState(prev => ({ ...prev, days }));
	const [state, setState] = useState({
		day: "Monday",
		days: [],
		appointments: {},
		interviewers: {}
	});
	const setDay = day => setState({ ...state, day });

	useEffect(() => {
		Promise.all([
			Promise.resolve(axios.get("/api/days")),
			Promise.resolve(axios.get("/api/appointments")),
			Promise.resolve(axios.get("/api/interviewers"))
		]).then(all => {
			// console.log("got here", all[1].data);
			const [days, appointments, interviewers] = all;
			setState(prev => ({
				...prev,
				days: Object.values(days.data),
				appointments: Object.values(appointments.data),
				interviewers: Object.values(interviewers.data)
			}));
		});
	}, []);

	let list = getAppointmentsForDay(state, state.day).map(appt => {
		const interview = getInterview(state, appt.interview);
		const interviewers = getInterviewersForDay(state, state.day);
		function bookInterview(id, interview) {
			const appointment = {
				...state.appointments[id - 1],
				interview: { ...interview }
			};

			const appointments = {
				...state.appointments,
				[id - 1]: appointment
			};
			console.log("appointment value ", appointment, appointments);
			return axios
				.put(`/api/appointments/${id}`, { interview })
				.then(response => {
					console.log(response);
					setState({
						...state,
						appointments
					});
				});
		}

		function cancelInterview(id) {
			const appointment = {
				...state.appointments[id],
				interview: null
			};
			const appointments = {
				...state.appointments,
				[id]: appointment
			};
			return axios.delete(`/api/appointments/${id}`).then(response => {
				setState({ ...state, appointments });
			});
		}

		return (
			<Appointment
				key={appt.id}
				{...appt}
				interview={interview}
				bookInterview={bookInterview}
				cancelInterview={cancelInterview}
				interviewers={interviewers}
			/>
			// <Appointment

			//   time={appt.time}
			//   id={appt.id}
			//   interview={appt.interview}
			// />
		);
	});

	// console.log("result ", state.day, " - ", list);

	// console.log("state passed as props", state);
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
