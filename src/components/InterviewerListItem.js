import React from "react";
import classname from "classnames";

import "components/InterviewerListItem.scss";


export default function InterviewerListItem(props) {
  const interviewerClass = classname(
    "interviewers__item",
    {"interviewers__item--selected": props.selected},
    {"interviewers__item-image": props.image}
    );


  return (

    <li className={interviewerClass} onClick={() => props.setInterviewer(props.name)
      }>
      <img
        className={interviewerClass}
        src={props.avatar}
        alt={props.name}
      />
      {props.selected ? props.name : ""}
    
    </li>
  );
}