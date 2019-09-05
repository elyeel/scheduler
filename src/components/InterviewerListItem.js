import React from "react";
import classname from "classnames";

import "components/InterviewerListItem.scss";


export default function InterviewerListItem(props) {
  console.log("ILItems props =", props);
  const interviewerClass = classname(
    "interviewers__item",
    {"interviewers__item--selected": props.selected},
    {"interviewers__item-image": props.image}
    );


  return (

    <li className={interviewerClass} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    
    </li>
  );
}