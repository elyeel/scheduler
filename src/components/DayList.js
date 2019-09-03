import React from "react";
import DayListItem from "DayListItem.js";

export default function DayList(props) {
  props.days.map(day => {
    return (
    <ul><DayListItem 
      id={day.id}
      name={day.name} 
      spots={day.spots} 
      selected={day.name === props.day}
      setDay={props.setDay}
    />
    </ul>
  )
  })
  
}