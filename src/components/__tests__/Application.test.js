import React from "react";

import {
	render,
	cleanup,
	getByText,
	waitForElement,
	fireEvent,
	prettyDOM,
	getAllByTestId,
	getByAltText,
	getByPlaceholderText,
	queryByText
} from "@testing-library/react";

import Application from "components/Application";
import Appointment from "components/Appointment";

afterEach(cleanup);

describe("Application", () => {
	it("defaults to Monday and changes the schedule when a new day is selected", () => {
		const { getByText } = render(<Application />);

		return waitForElement(() => getByText("Monday")).then(() => {
			fireEvent.click(getByText("Tuesday"));
			expect(getByText("Leopold Silvers")).toBeInTheDocument();
		});
	});

	it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
		const { container } = render(<Application />);

		await waitForElement(() => getByText(container, "Archie Cohen"));

		const appointments = getAllByTestId(container, "appointment");

		const appointment = getAllByTestId(container, "appointment")[0];

		fireEvent.click(getByAltText(appointment, "Add"));

		fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
			target: { value: "Lydia Miller-Jones" }
		});

		fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

		fireEvent.click(getByText(appointment, "Save"));

		expect(getByText(appointment, "Saving")).toBeInTheDocument();

		await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

		const day = getAllByTestId(container, "day").find(day =>
			queryByText(day, "Monday")
		);

		expect(getByText(day, "no spots remaining")).toBeInTheDocument();
	});

	it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
		//to be change after debug test
		const { container, debug } = render(<Application />);

		await waitForElement(() => getByText(container, "Archie Cohen"));

		const appointments = getAllByTestId(container, "appointment");
		const appointment = getAllByTestId(container, "appointment")[0];

		fireEvent.click(getByAltText(appointment, "Add"));

		fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
			target: { value: "Lydia Miller-Jones" }
		});

		fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"));
    
    debug();

		expect(getByText(appointment, "Saving")).toBeInTheDocument();

		await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

		const day = getAllByTestId(container, "day").find(day =>
			queryByText(day, "Monday")
		);

		expect(getByText(day, "no spots remaining")).toBeInTheDocument();
	});
});

describe("Appointment", () => {
	xit("always renders with create mode, never directly show mode", () => {
		expect(getByText(Appointment, "Saving")).toBeInTheDocument();
	});
});
