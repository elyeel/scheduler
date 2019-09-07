import React, { useState, useEffect } from "react";
import axios from "axios";
import DayList from "./DayList";
import Appointment from "components/Appointment";
import "components/Application.scss";
import getAppointmentsForDay from "components/helpers/selectors";
let days = [
	// {
	// 	id: 1,
	// 	name: "Monday",
	// 	spots: 2
	// },
	// {
	// 	id: 2,
	// 	name: "Tuesday",
	// 	spots: 5
	// },
	// {
	// 	id: 3,
	// 	name: "Wednesday",
	// 	spots: 0
	// }
];
let appointments = [
	// {
	// 	id: 1,
	// 	time: "12pm"
	// },
	// {
	// 	id: 2,
	// 	time: "1pm",
	// 	interview: {
	// 		student: "Lydia Miller-Jones",
	// 		interviewer: {
	// 			id: 1,
	// 			name: "Sylvia Palmer",
	// 			avatar: "https://i.imgur.com/LpaY82x.png"
	// 		}
	// 	}
	// },
	// {
	// 	id: 3,
	// 	time: "2pm",
	// 	interview: {
	// 		student: "Svada Kirchner",
	// 		interviewer: {
	// 			id: 4,
	// 			name: "Cohana Roy",
	// 			avatar: "https://i.imgur.com/FK8V841.jpg"
	// 		}
	// 	}
	// },
	// {
	// 	id: 4,
	// 	time: "3pm",
	// 	interview: {
	// 		student: "Martin Jones",
	// 		interviewer: {
	// 			id: 5,
	// 			name: "Sven Jones",
	// 			avatar: "https://i.imgur.com/twYrpay.jpg"
	// 		}
	// 	}
	// },
	// {
	// 	id: 5,
	// 	time: "4pm"
	// }
];

export default function Application(props) {
	// const [day, setDay] = useState("Monday");
	// const setDay = day => setState({ ...state, day });
	// const setDays = days => setState(prev => ({ ...prev, days }));
	const [state, setState] = useState({
		day: "Monday",
		days: [],
		appointments: []
	});

	// useEffect(() => {
	// 	axios.get("http://localhost:8001/api/days").then(response => {
	// 		// console.log("Axios response", response);
	// 		// setDays(response.data);
	// 		// days = response.data;
	// 		console.log("days =", response.data);
	// 	});
	// }, []);

	// useEffect(() => {
	// 	axios.get("http://localhost:8001/api/appointments").then(response => {
	// 		// console.log("Axios response", response);
	// 		appointments = response.data;
	// 		console.log("appointments =", appointments);
	// 	});
	// }, []);

	useEffect(() => {
		Promise.all([
			Promise.resolve(axios.get("/api/days")),
			Promise.resolve(axios.get("/api/appointments"))
		]).then(all => {
			setState(prev => ({
				...prev,
				days: all[0].data,
				appointments: [all[1].data]
			}));
		});
	}, []);

	console.log(state.appointments[0]); // -> it's an object now
	let list = state.appointments.map(appt => {
		return (
			<Appointment key={appt.id} {...appt} />
			// <Appointment

			//   time={appt.time}
			//   id={appt.id}
			//   interview={appt.interview}
			// />
		);
	});
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
					<DayList days={state.days} day={state.day} setDay={state.setDay} />
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
