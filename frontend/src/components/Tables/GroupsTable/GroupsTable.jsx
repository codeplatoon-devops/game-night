import React, { useState, useEffect, useRef } from "react";
import { Button } from "primereact/button";
import { ListBox } from "primereact/listbox";
import { Panel } from "primereact/panel";
import "./GroupsTable.css";

export default function GroupsTable(props) {
	const [selectedGroup, setSelectedGroup] = useState(null);
	let groups = [];
	// props.groups now has group name and code
	if (props.groups) {
		for (let group of props.groups) {
			let tempGroup = {
				groupName: group[0],
			};

			groups.push(tempGroup);
		}
	} else {
		groups = [{ groupName: "None" }];
	}
	const handleChange = () => {
		// console.log("clicked group");
	};

	return (
		<Panel header="Your Groups">
			<ListBox
				value={selectedGroup}
				options={groups}
				onChange={handleChange}
				optionLabel="groupName"
				style={{ width: "100%" }}
				// itemTemplate={eventsTemplate}
				listStyle={{ maxHeight: "250px" }}
			/>
		</Panel>
	);
}
