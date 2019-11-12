import { useEffect, useReducer } from "react";
import axios from "axios";
import reducer, {
	SET_DAY,
	SET_APPLICATION_DATA,
	SET_INTERVIEW
} from "reducers/application";

export default function useApplicationData() {
	const [state, dispatch] = useReducer(reducer, {
		day: "Monday",
		days: [],
		appointments: {},
		interviewers: {}
	});

	const setDay = day => dispatch({ type: SET_DAY, value: day });
	//setState({ ...state, day });

	useEffect(() => {
		Promise.all([
			Promise.resolve(axios.get("/api/days")),
			Promise.resolve(axios.get("/api/appointments")),
			Promise.resolve(axios.get("/api/interviewers"))
		]).then(all => {
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
