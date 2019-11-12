export const SET_DAY = "SET_DAY";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const SET_INTERVIEW = "SET_INTERVIEW";

export default function reducer(state, action) {
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
