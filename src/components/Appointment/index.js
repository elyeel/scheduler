import "components/Appointment";
import React from "react";
import Header from "./Header"
import Show from "./Show"
import Empty from "./Empty"

export default function Appointment(props) {
console.log(props);
  return (
    <arcticle className="appointment">
      <Header time={props.time}/>
    
      {props.interview ? <Show interviewer={props.interview.interviewer} student={props.interview.student}/> : <Empty />}
    </arcticle>
  )
}
