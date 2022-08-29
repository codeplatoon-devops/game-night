import { Button } from "primereact/button";
import axios from "axios";


function EventDetailButtons({user}) {

    // const leaveGroup= function (name, code) {
	// 	axios.put('/event/delete', {code:code})
	// 		.then((response)=> {
	// 			console.log('leave group response.data', response.data)
	// 			props.setLeaveGroupInformation([name,code])
	// 			if (response.data.group_deleted) {
	// 				let channelId = "GroupChatroom";
	// 				let channelName = name
	// 				channelName += " Chatroom";
	// 				channelId += code.toString();
	// 				setDeleteChannelInformation([channelId,channelName])
	// 			}
	// 		})
	// }


    return(
        <>
        {/* <Button label="Edit" icon="pi pi-pencil" className="p-button-text" /> */}
        <Button label="Edit" icon="pi pi-trash" className="p-button-text" />
        </>
    )
}