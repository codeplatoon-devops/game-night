import { Button } from "primereact/button";
import axios from "axios";


function EventDetailButtons({user, eventDetail, setDeleteChannelInformation, setLeaveChannelInformation}) {

    const deleteEvent= function () {
        let event_id = eventDetail.id
		axios.put('/event/delete',{id:event_id})
			.then((response)=> {
				console.log('delete event response.data', response.data)
                let channelId = "EventChatroom";
                let channelName = eventDetail.name
                channelName += " Chatroom";
                channelId += code.toString();
                setDeleteChannelInformation([channelId,channelName])
            })
    }

    const leaveEvent= function () {
        let event_id = eventDetail.id
		axios.put('/event/leave', {id:event_id})
			.then((response)=> {
				console.log('leave event response.data', response.data)
                let channelId = "EventChatroom";
                let channelName = eventDetail.name
                channelName += " Chatroom";
                channelId += code.toString();
				setLeaveChannelInformation([channelId, channelName])
			})
	}

    if (eventDetail.owner_id === user.pk) {
        return(
            <>
            {/* <Button label="Edit" icon="pi pi-pencil" className="p-button-text" /> */}
            <Button label="Delete" icon="pi pi-trash" className="p-button-text" onClick={deleteEvent}/>
            </>
        )

    }
    else {
        return(
            <Button label="Leave" icon="pi pi-eject" className="p-button-text" onClick={leaveEvent}/>
        )
    }

}

export default EventDetailButtons