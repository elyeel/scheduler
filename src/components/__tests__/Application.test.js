import React from "react";

import { render, cleanup, getByText } from "@testing-library/react";

import Application from "components/Application";
import Appointment from "components/Appointment";

import {waitForElement, fireEvent} from "@testing-library/react";

// const { container, debug } = render(<Application />);

afterEach(cleanup);

describe("Application", () => {

  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);
    
    return waitForElement(() => getByText("Monday")).then(() => {
      fireEvent.click(getByText("Tuesday"));
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });
  });
})

describe("Appointment", () => {
  xit("always renders with create mode, never directly show mode", () => {
    expect(getByText(Appointment, "Saving")).toBeInTheDocument();
  })
});

