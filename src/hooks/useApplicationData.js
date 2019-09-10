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

	function reducer(state, action) {
		switch (action.type) {
			case SET_DAY:
				return { ...state, day: action.value };
			case SET_APPLICATION_DATA:
				return {
					...state,
					days: action.value.days,
					appointments: action.value.appointments,
					interviewers: action.value.interviewers
				};
			case SET_INTERVIEW:
				const appointment = {
					...state.appointments[action.id],
					interview: action.interview && { ...action.interview }
				};

				//updates appointments with new object {id: appointment}
				const appointments = {
					...state.appointments,
					[action.id]: appointment
				};

				// updating spots, get day from days with interview id
				const findDay = function(days, id) {
					for (let item of days) {
						for (let value of item.appointments) {
							if (value === id) {
								return item;
							}
						}
					}
					return null;
				};
				const foundDay = findDay(state.days, action.id);

				let spots = 0;
				for (let apptId of foundDay.appointments) {
					if (appointments[apptId].interview === null) {
						spots += 1;
					}
				}

				const days = state.days.map(day => {
					if (day.name === foundDay.name) {
						return { ...day, spots };
					} else {
						return day;
					}
				});

				return { ...state, appointments, days };
			default:
				throw new Error(
					`Tried to reduce with unsupported action type: ${action.type}`
				);
		}
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
					days: days.data, //originally used Object.values(days) which create a bug
					appointments: appointments.data,
					interviewers: interviewers.data
				}
			});
		});
	}, []);

	function bookInterview(id, interview) {
		return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
			dispatch({ type: SET_INTERVIEW, id, interview });
		});
	}

	function cancelInterview(id) {
		return axios.delete(`/api/appointments/${id}`).then(response => {
			// setState({ ...state, appointments });
			dispatch({ type: SET_INTERVIEW, id, interview: null });
		});
	}

	return {
		state,
		setDay,
		bookInterview,
		cancelInterview
	};
}
