import DeleteEventButton from "./DeleteEventButton"
import LeaveEventButton from "./LeaveEventButton"
import JoinEventButton from "./JoinEventButton"
import InviteButton from "./InviteEventButton"


function EventDetailButtons({user, eventDetail, setDeleteChannelInformation, setLeaveChannelInformation, attending}) {

    //const deleteEvent= function () {
      //  let event_id = eventDetail.id
		//axios.put('/event/delete',{id:event_id})
			//.then((response)=> {
				//console.log('delete event response.data', response.data)
          //      let channelId = "EventChatroom";
            //    let channelName = eventDetail.name
              //  channelName += " Chatroom";
                //let code = eventDetail.code
              //  channelId += code.toString();
                //setDeleteChannelInformation([channelId,channelName])
          //  })
   // }

   // const leaveEvent= function () {
      //  let event_id = eventDetail.id
		//axios.put('/event/leave', {id:event_id})
			//.then((response)=> {
				//console.log('leave event response.data', response.data)
                //let channelId = "EventChatroom";
              //  let channelName = eventDetail.name
            //    let code = eventDetail.code
          //      channelName += " Chatroom";
        //        channelId += code.toString();
			//	setLeaveChannelInformation([channelId, channelName])
		//	})
//	}

    if (eventDetail.owner_id === user.pk) {
        return(
            <>
              <DeleteEventButton setDeleteChannelInformation={setDeleteChannelInformation} eventDetail={eventDetail}/>
              <InviteButton eventDetail={eventDetail} />
            </>
        )

    }
    else {
        // if user is not the event onwer they can leave
        if (attending) {
          return(
              <LeaveEventButton setLeaveChannelInformation={setLeaveChannelInformation} eventDetail={eventDetail}/>
          )}
        else {
          return(
              <JoinEventButton eventDetail={eventDetail} />
          )}
    }

}

export default EventDetailButtons