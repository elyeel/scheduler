export function getAppointmentsForDay(state, day) {
	const filteredDay = [];
	let appts = [];
	for (let selectDay of state.days) {
		if (selectDay.name === day) {
			appts = selectDay.appointments;
		}
	}
	for (let app of appts) {
		filteredDay.push(state.appointments[app]);
	}
	// const filteredDay = state.days.filter(appointments => appointments.name === name);
	return filteredDay;
}
