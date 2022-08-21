import { useChatContext } from "stream-chat-react"
import {useState} from 'react'

// could set this up as a form, but most likely would grab the data upon creating group/event
// https://getstream.io/chat/docs/sdk/react/core-components/chat/


function CreateChannel () {
    const {client, setActiveChannel} = useChatContext()

    // probably want something like group_name Chatroom or Event_name Chatroom
    // these are fields we COULD get from a form, but probably from event creation
    const [name, setName]= useState("")
    const [image, setImage] = useState('https://picsum.photos/200')
    const [desc, setDesc] = useState("")

    const createChannel = (event) => {
        event.preventDefault()
        // instead of this channel ID we probably want to put something like groupChat_<group_id> or eventChat_<event_id>
        const channelId = name.replace(/\s/g, "-").toLowerCase();
        const channel = client.channel('messaging', channelId, {
            name,
            image,
            desc,
            members:[client.user.id],
        })
            // await channel.create()
            // await channel.watch()
        setActiveChannel(channel)

    }


    return (
        <></>
    )
}

export default CreateChannel



