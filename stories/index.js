/* We need to import React because we are using JSX. */
import React from "react";

/* The storiesOf function from the React version of Storybook is used to start a series of stories. */
import { storiesOf } from "@storybook/react";

/* The action function from the Storybook actions addon lets verify that our component triggers event handlers correctly. */
import { action } from "@storybook/addon-actions";

/* Storybook is a test environment. We need to import the component that we are testing. */
import Task from "Task.js";
import Button from "components/Button";

import "index.scss";
// import "index2.scss";
import DayListItem from "components/DayListItem.js";
import DayList from "components/DayList.js";

/* This is fake data that we can pass as a prop to each version of our Task. */
export const task = {
  id: "1",
  title: "Test Task",
  state: "TASK_INBOX",
  updatedAt: new Date(2018, 0, 1, 9, 0)
};

/* We pass these actions below using the spread operator */
export const actions = {
  onPinTask: action("onPinTask"),
  onArchiveTask: action("onArchiveTask")
};

/* We start a sequence of stories, but calling the imported `storiesOf` function. */
storiesOf("Task", module)
  /* Our first story, called 'default', renders a basic Task with both actions. */
  .add("default", () => <Task task={task} {...actions} />)
  /* Our second story, called 'pinned', clones the task, and sets its state to "TASK_PINNED". */
  .add("pinned", () => (
    <Task task={{ ...task, state: "TASK_PINNED" }} {...actions} />
  ))
  /* Our third story, called 'archived', clones the task, and sets its state to "TASK_ARCHIVED". */
  .add("archived", () => (
    <Task task={{ ...task, state: "TASK_ARCHIVED" }} {...actions} />
  ));

storiesOf("Button", module)
  .add("Base", () => <Button>Base</Button>)
  .add("Confirm", () => <Button confirm>Confirm</Button>)
  .add("Danger", ()=> <Button danger>Cancel</Button>)
  .add("Clickable", () => <Button onClick={action("button-clicked")}>Clickable</Button>)
  .add("Disabled", () => <Button disabled onClick={action("button-clicked")}>Disabled</Button>)

storiesOf("DayListItem", module) 
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  }) 
  .add("Unselected", () => <DayListItem name="Monday" spots={5} />) 
  .add("Selected", () => <DayListItem name="Monday" spots={5} selected />) 
  .add("Full", () => <DayListItem name="Monday" spots={0} />) 
  .add("Clickable", () => (
    <DayListItem name="Tuesday" setDay={action("setDay")} spots={5} /> 
  ));

const days = [
  {
    id: 1,
    name: "Monday",
    spots: 2,
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5,
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0,
  },
];
  
storiesOf("DayList", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }],
  })
  .add("Monday", () => (
    <DayList days={days} day={"Monday"} setDay={action("setDay")} />
  ))
  .add("Tuesday", () => (
    <DayList days={days} day={"Tuesday"} setDay={action("setDay")} />
  ));

const interviewer = {
  id: 1,
  name: "Sylvia Palmer",
  avatar: "https://i.imgur.com/LpaY82x.png"
};

storiesOf("InterviewerListItem", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  })
  .add("Unselected", () => (
    <InterviewerListItem
      id={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
    />
  ))
  .add("Selected", () => (
    <InterviewerListItem
      id={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected
    />
  ))
  .add("Clickable", () => (
    <InterviewerListItem
      id={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      setInterviewer={action("setInterviewer")}
    />
  ));