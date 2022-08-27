import React, { useState, useEffect, useRef } from "react";
import { Accordion, AccordionTab } from "primereact/accordion";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "./GroupsTable.css";

export default function GroupsTable(props) {
	const [activeIndex, setActiveIndex] = useState(null);
	let groups = [];
	// props.groups now has group name and code
	if (props.groups) {
		for (let group of props.groups) {
			let tempGroup = {
				groupName: <Button className="p-button-text">{group[0]}</Button>,
			};

			groups.push(tempGroup);
		}
	}
	const noGroups = [
		{
			groupName: "None",
		},
	];
	return (
		<Accordion
			activeIndex={activeIndex}
			onTabChange={(e) => setActiveIndex(e.index)}
			className="table-groups-list"
		>
			<AccordionTab header="Your Groups">
				{/* <ul>{props.groups ? formatGroup() : "None"}</ul> */}
				<DataTable value={props.groups ? groups : noGroups}>
					<Column field="groupName" />
				</DataTable>
			</AccordionTab>
		</Accordion>
	);
}
