import React from "react";
import axios from "axios";

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
	queryByText,
	getAllByAltText,
	getByTestId
} from "@testing-library/react";

import Application from "components/Application";
import Appointment from "components/Appointment";
import { get } from "http";

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

	it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
		//to be change after debug test with this test plan
		// 1. Render the Application.
		const { container, debug } = render(<Application />);
		// 2. Wait until the text "Archie Cohen" is displayed.
		await waitForElement(() => getByText(container, "Archie Cohen"));
		// 3. Click the "Delete" button on the booked appointment.
		const appointment = getAllByTestId(container, "appointment").find(
			appointment => queryByText(appointment, "Archie Cohen")
		);
		fireEvent.click(getByAltText(appointment, "Delete"));
		// 4. Check that the confirmation message is shown.
		expect(
			getByText(appointment, "Are you sure you would like to delete?")
		).toBeInTheDocument();
		// 5. Click the "Confirm" button on the confirmation.
		fireEvent.click(getByText(appointment, "Confirm"));
		// 6. Check that the element with the text "Deleting" is displayed.
		expect(getByText(appointment, "Deleting")).toBeInTheDocument();
		// 7. Wait until the element with the "Add" button is displayed.
		await waitForElement(() => getByAltText(appointment, "Add"));
		// 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
		const day = getAllByTestId(container, "day").find(day =>
			queryByText(day, "Monday")
		);
		expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
		// debug();
	});

	it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
		// We want to start by finding an existing interview.
		const { container, debug } = render(<Application />);
		await waitForElement(() => getByText(container, "Archie Cohen"));
		// With the existing interview we want to find the edit button.
		const appointment = getAllByTestId(container, "appointment").find(
			appointment => queryByText(appointment, "Archie Cohen")
		);
		fireEvent.click(getByAltText(appointment, "Edit"));
		// We change the name and save the interview.
		await waitForElement(() => getByText(appointment, "Save"));
		fireEvent.change(getByTestId(appointment, "student-name-input"), {
			target: {
				value: "Tornado Putar"
			}
		});
		fireEvent.click(getByText(appointment, "Save"));
		expect(getByText(appointment, "Saving")).toBeInTheDocument();
		// We don't want the spots to change for "Monday", since this is an edit.
		await waitForElement(() => getByText(container, "Tornado Putar"));
		const day = getAllByTestId(container, "day").find(day =>
			queryByText(day, "Monday")
		);
		// debug();
		expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
		// Read the errors because sometimes they say that await cannot be outside of an async function.
	});

	it("shows the save error when failing to save an appointment", async () => {
		//Change put value to be rejected
		axios.put.mockRejectedValueOnce();
		//Render application
		const { container, debug } = render(<Application />);
		//Wait for content to load
		await waitForElement(() => getByText(container, "Archie Cohen"));
		//Get first appointment
		const appointment = getAllByTestId(container, "appointment")[0];
		//Add appointment
		fireEvent.click(getByAltText(appointment, "Add"));
		//Input value Lydia Miller-Jones
		fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
			target: { value: "Lydia Miller-Jones" }
		});
		//Select interviewer
		fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
		//Save
		fireEvent.click(getByText(appointment, "Save"));
		//Expect Saving div to show
		expect(getByText(appointment, "Saving")).toBeInTheDocument();
		//Wait for Error
		await waitForElement(() => getByText(appointment, "Error"));
		//Check that slots did not change for day
		const day = getAllByTestId(container, "day").find(day =>
			queryByText(day, "Monday")
		);
		expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
	});

	it("shows the delete error when failing to delete an existing appointment", async () => {
		//Change put value to be rejected
		axios.delete.mockRejectedValueOnce();
		// 1. Render the Application.
		const { container, debug } = render(<Application />);
		// 2. Wait until the text "Archie Cohen" is displayed.
		await waitForElement(() => getByText(container, "Archie Cohen"));
		// 3. Click the "Delete" button on the booked appointment.
		const appointment = getAllByTestId(container, "appointment").find(
			appointment => queryByText(appointment, "Archie Cohen")
		);
		fireEvent.click(getByAltText(appointment, "Delete"));
		// 4. Check that the confirmation message is shown.
		expect(
			getByText(appointment, "Are you sure you would like to delete?")
		).toBeInTheDocument();
		// 5. Click the "Confirm" button on the confirmation.
		fireEvent.click(getByText(appointment, "Confirm"));
		// 6. Check that the element with the text "Deleting" is displayed.
		expect(getByText(appointment, "Deleting")).toBeInTheDocument();
		// 7. Wait until the element with the "Add" button is displayed.
		await waitForElement(() => getByText(appointment, "Error"));
		// 8. Check that the DayListItem with the text "Monday" also has the text "1 spot remaining".
		const day = getAllByTestId(container, "day").find(day =>
			queryByText(day, "Monday")
		);
		expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
		// debug();
	});
});
