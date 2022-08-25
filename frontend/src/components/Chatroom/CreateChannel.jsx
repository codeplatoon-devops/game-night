// import { useChatContext } from "stream-chat-react"
// import {useEffect, useState} from 'react'

// // could set this up as a form, but most likely would grab the data upon creating group/event
// // https://getstream.io/chat/docs/sdk/react/core-components/chat/


// function CreateChannel ({name,code}) {
//     const {client, setActiveChannel} = useChatContext()

//     // probably want something like group_name Chatroom or Event_name Chatroom
//     // these are fields we COULD get from a form, but probably from event creation
//     // const [name, setName]= useState("")
//     const [image, setImage] = useState('https://picsum.photos/200')
//     // const [desc, setDesc] = useState("")

//     useEffect(()=> {
//         createChannel()
//     },[])

//     const createChannel = (event, name, code) => {
//         event.preventDefault()
//         // instead of this channel ID we probably want to put something like groupChat_<group_id> or eventChat_<event_id>
//         // const channelId = name.replace(/\s/g, "-").toLowerCase();
//         let channelId = "Chatroom"
//         channelId+=code.toString()
//         const channel = client.channel('messaging', channelId, {
//             name,
//             image,
//             members:[client.user.id],
//         })
//             // await channel.create()
//             // await channel.watch()
//         setActiveChannel(channel)

//     }
// }

// export default CreateChannel



