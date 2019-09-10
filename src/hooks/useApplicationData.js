import { useEffect, useReducer } from "react";
import axios from "axios";

export default function useApplicationData() {
	const SET_DAY = "SET_DAY";
	const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
	const SET_INTERVIEW = "SET_INTERVIEW";

	const [state, dispatch] = useReducer(reducer, {
		day: "Monday",
		days: [],
		appointments: {},
		interviewers: {}
	});

	function reducer(states, action) {
		let state = { ...states };
		switch (action.type) {
			case SET_DAY:
				state.day = action.value;
				break;
			case SET_APPLICATION_DATA:
				state.days = action.value.days;
				state.appointments = action.value.appointments;
				state.interviewers = action.value.interviewers;
				break;
			case SET_INTERVIEW:
				state.appointments = action.value;
				break;
			default:
				throw new Error(
					`Tried to reduce with unsupported action type: ${action.type}`
				);
		}
		return state;
	}

	// const [state, setState] = useState({
	// 	day: "Monday",
	// 	days: [],
	// 	appointments: {},
	// 	interviewers: {}
	// });

	const setDay = day => dispatch({ type: SET_DAY, value: day });
	//setState({ ...state, day });

	useEffect(() => {
		Promise.all([
			Promise.resolve(axios.get("/api/days")),
			Promise.resolve(axios.get("/api/appointments")),
			Promise.resolve(axios.get("/api/interviewers"))
		]).then(all => {
			// console.log("got here", all[1].data);
			const [days, appointments, interviewers] = all;
			dispatch({
				type: SET_APPLICATION_DATA,
				value: {
					days: Object.values(days.data),
					appointments: Object.values(appointments.data),
					interviewers: Object.values(interviewers.data)
				}
			});
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
				// setState({
				// 	...state,
				// 	appointments
				// });
				dispatch({ type: SET_INTERVIEW, value: appointments });
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
			// setState({ ...state, appointments });
			dispatch({ type: SET_INTERVIEW, value: appointments });
		});
	}

	return {
		state,
		setDay,
		bookInterview,
		cancelInterview
	};
}
