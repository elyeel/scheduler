import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
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

	return {
		state,
		setDay,
		bookInterview,
		cancelInterview
	};
}
