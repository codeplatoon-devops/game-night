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
				groupName: group[0]
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
		// return(
		// <Button onClick={leaveGroup}>Leave Group</Button>
		// )
		// console.log("clicked group");
	};

	const leaveGroup= function (name, code) {
		axios.put('/group/leave', {code:code})
			.then((response)=> {
				console.log('leave group response.data', response.data)
				let channelId = "GroupChatroom";
				let channelName = name
				channelName += " Chatroom";
				channelId += code.toString();
				props.setLeaveChannelInformation([channelId,channelName])
				if (response.data.group_deleted) {
					props.setDeleteChannelInformation([channelId,channelName])
				}
			})
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
		<Button onClick={()=>{leaveGroup("FourGroup1","57644060")}}>Leave Group</Button>
	</div>
	);
}














// import { Button } from "primereact/button";
// import axios from "axios";


// function EventDetailButtons({user, eventDetail, setDeleteChannelInformation, setLeaveChannelInformation}) {

//     const deleteEvent= function () {
//         let event_id = eventDetail.id
// 		axios.put('/event/delete',{id:event_id})
// 			.then((response)=> {
// 				console.log('delete event response.data', response.data)
//                 let channelId = "EventChatroom";
//                 let channelName = eventDetail.name
//                 channelName += " Chatroom";
//                 channelId += code.toString();
//                 setDeleteChannelInformation([channelId,channelName])
//             })
//     }

//     const leaveEvent= function () {
//         let event_id = eventDetail.id
// 		axios.put('/event/leave', {id:event_id})
// 			.then((response)=> {
// 				console.log('leave event response.data', response.data)
//                 let channelId = "EventChatroom";
//                 let channelName = eventDetail.name
//                 channelName += " Chatroom";
//                 channelId += code.toString();
// 				setLeaveChannelInformation([channelId, channelName])
// 			})
// 	}

//     if (eventDetail.owner_id === user.pk) {
//         return(
//             <>
//             {/* <Button label="Edit" icon="pi pi-pencil" className="p-button-text" /> */}
//             <Button label="Delete" icon="pi pi-trash" className="p-button-text" onClick={deleteEvent}/>
//             </>
//         )

//     }
//     else {
//         return(
//             <Button label="Leave" icon="pi pi-eject" className="p-button-text" onClick={leaveEvent}/>
//         )
//     }

// }

// export default EventDetailButtons