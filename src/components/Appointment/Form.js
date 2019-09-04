import React, { useState } from "react";
import "./styles.scss";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form (props) {
  const [name, setName] = useState("");
  console.log("inside form --->", props);
  
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            value={name}
            placeholder="Enter Student Name"
            onChange={(event) => setName(event.target.value)}
            /*
              This must be a controlled component
            */
          />{name && (
            <h1>Hello, {name}.</h1>
        )}
        </form>
        <InterviewerList 
          interviewers={props.interviewers} 
          value={props.interviewer} 
          setInterviewer={props.setInterviewer} 
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger>Cancel</Button>
          <Button confirm>Save</Button>
        </section>
      </section>
    </main>
  )
}