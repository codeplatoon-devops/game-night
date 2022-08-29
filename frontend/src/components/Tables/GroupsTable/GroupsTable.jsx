import React, { useState, useEffect, useRef } from "react";
import { Button } from "primereact/button";
import { ListBox } from "primereact/listbox";
import { Panel } from "primereact/panel";
// import { TabView, TabPanel } from 'primereact/tabview';
// import './TabViewDemo.css';
import "./GroupsTable.css";
import axios from "axios";

export default function GroupsTable(props) {
	// const [activeIndex2, setActiveIndex2] = useState(0)
	// const scrollableTabs = Array.from({ length: 50 }, (_, i) => ({ title: `Tab ${i + 1}`, content: `Tab ${i + 1} Content` }));
	const [selectedGroup, setSelectedGroup] = useState(null);
	let groups = [];
	// let scrollGroups=[]
	// props.groups now has group name and code
	if (props.groups) {
		for (let group of props.groups) {
			let tempGroup = {
				groupName: group[0],
				// group[2] = all the other members
			};
			// let singleGroup= {
			// 	title: group[0],
			// 	content: `Other Members: ${group[2]}`
			// }
			// console.log('singleGroup:',singleGroup)
			groups.push(tempGroup);
			// scrollGroups.push(singleGroup);
		}
	} else {
		groups = [{ groupName: "None" }];
	}
	const handleChange = () => {
		console.log("clicked group");
		// get members of the group
		return(
		<Button onClick={leaveGroup}>Leave Group</Button>
		)
	};

	const leaveGroup= function () {
		axios.put()
	}

	return (
		<div>
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
		{/* <div className="card">
		<h5>Your Groups</h5>
		<TabView activeIndex={activeIndex2} onTabChange={(e) => setActiveIndex2(e.index)} scrollable>
			{scrollGroups.map((tab) => {
				return (
					<TabPanel key={tab.title} header={tab.title}>
						<p>{tab.content}</p>
					</TabPanel>
				)
			})}
		</TabView>
	</div> */}
	</div>
	);
}
