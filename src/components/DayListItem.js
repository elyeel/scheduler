import React from "react";
import "components/DayListItem.scss";
import classname from "classnames";

export default function DayListItem(props) {
	const dayClass = classname(
		"day-list__item",
		{ "day-list__item--selected": props.selected },
		{ "day-list__item--full": props.spots === 0 }
	);
	const formatSpots = function(spot) {
		if (spot > 1) {
			return `${spot} spots remaining`;
		} else if (spot > 0) {
			return `${spot} spot remaining`;
		} else {
			return `no spots remaining`;
		}
	};
	const spt = formatSpots(props.spots);

	return (
		<li
			className={dayClass}
			// key={props.key}
			onClick={() => props.setDay(props.name)}
			data-testid="day"
		>
			<h2 className="text--regular">{props.name}</h2>
			<h3 className="text--light">{spt}</h3>
		</li>
	);
}
