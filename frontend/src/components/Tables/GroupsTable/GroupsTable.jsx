import React, { useState, useEffect, useRef } from "react";
import { Accordion, AccordionTab } from "primereact/accordion";
import { Button } from "primereact/button";
import "./GroupsTable.css";

export default function GroupsTable(props) {
	const [activeIndex, setActiveIndex] = useState(null);
	const formatGroup = () => {
		let returnGroups = "";
		for (let group of props.groups) {
			returnGroups += group + "\n";
		}
		return returnGroups;
	};
	return (
		<Accordion
			activeIndex={activeIndex}
			onTabChange={(e) => setActiveIndex(e.index)}
			className="table-groups-list"
		>
			<AccordionTab header="Your Groups">
				<ul>{props.groups ? formatGroup() : "None"}</ul>
			</AccordionTab>
		</Accordion>
	);
}
