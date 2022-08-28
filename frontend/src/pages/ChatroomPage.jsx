import { useEffect, useState} from "react";
import Chatroom from "../components/Chatroom/Chatroom";
import axios from 'axios'
import { StreamChat } from 'stream-chat';

export default function ChatroomPage ({setUser, user, stream, token, whoAmI, client, setClient, createEventInformation, joinEventInformation}) {

    const [showChatroom, setShowChatroom] = useState(false)

    useEffect(()=> {
        whoAmI()
        setTimeout(() => {
            setShowChatroom(true)
        },300)
    },[])

    useEffect(()=> {
        //this connects the client to the chat
        if (token && user) {
            // setUserId((user.username).toString())
            console.log('token here', token, 'type', typeof(token))
            if (!client) {
                async function init() {
                    const user_id= (user.id).toString()
                    const channelName = 'This is your personal Notes/Reminders/Chat Space'
                    let channelId = user_id
                    channelId += "PersonalChat"
                    console.log('USER ID HERE LINE 95', user_id, 'type here', typeof(user_id), 'channelName', channelName, 'channelID', channelId)
                    const chatClient = StreamChat.getInstance(stream)
                    await chatClient.connectUser(user, token)
                    setClient(chatClient)
                    const first_channel = chatClient.channel('messaging', channelId, {
                        name: channelName,
                        members: [user_id]
                    })
                    await first_channel.watch()
                }
                init()
            }
            // return () => { if (client) client.disconnectUser()}
        }
    }, [])

    return (
        <>
        {user
            ?
            <div>
                {showChatroom &&
                <Chatroom 
                    user={user}
                    token={token}
                    stream={stream}
                    whoAmI={whoAmI}
                    client = {client}
					setClient={setClient}
                    createEventInformation={createEventInformation}
                    joinEventInformation={joinEventInformation}
                /> 
                }   
            </div>
            :
            null}
        </>
    )
}

