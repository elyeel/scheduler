export function getAppointmentsForDay(state, day) {
	const filteredDay = [];
	let appts = [];
	for (let selectDay of state.days) {
		if (selectDay.name === day) {
			appts = selectDay.appointments;
		}
	}
	for (let app of appts) {
		state.appointments[app] && filteredDay.push(state.appointments[app]);
	}
	// const filteredDay = state.days.filter(appointments => appointments.name === name);
	// console.log("result of getAppbyday ", "day -", day, filteredDay);
	return filteredDay;
}

export function getInterview(state, interview) {
	let result = {};
	if (!interview) {
		return null;
	}
	result.student = interview.student;
	for (let inter in state.interviewers) {
		if (state.appointments[inter].id === interview.interviewer) {
			result.interviewer = state.interviewers[inter];
		}
	}
	// console.log(result);
	return result;
}

export function getInterviewersForDay(state, day) {
	const interviews = [];
	let intvws = [];
	for (let selectDay of state.days) {
		if (selectDay.name === day) {
			intvws = selectDay.interviewers;
		}
	}
	if (intvws.length < 1) {
		return interviews;
	}
	for (let intv of intvws) {
		state.interviewers[intv] && interviews.push(state.interviewers[intv]);
	}
	return interviews;
}
