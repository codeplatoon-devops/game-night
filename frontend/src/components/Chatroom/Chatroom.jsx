import {useEffect, useState} from 'react'
import { StreamChat } from 'stream-chat';
import { Chat, Channel, ChannelHeader, MessageInput, MessageList, Thread, Window, LoadingIndicator, ChannelList } from 'stream-chat-react';
import axios from 'axios'
import './chatroom.css'
import 'stream-chat-react/dist/css/index.css'
import { useChatContext } from "stream-chat-react"
// had to change this file: node_modules/stream-chat-react/dist/components/MessageInput/hooks/useEmojiIndex.js

function Chatroom ({user, token, stream, groupInformation}) {
    
    const [client, setClient] = useState(null)
    // const {activeChannel} = useChatContext()
    // const [channel, setChannel] = useState(null)

    // filters only the channels that the user is a member of
    const filters = {type: 'messaging', members: {$in: [user.id]}}
    // puts the channel with the lattest message at the top
    const sort = {last_message_at: -1}

    const createChannel = async () => {
        // instead of this channel ID we probably want to put something like groupChat_<group_id> or eventChat_<event_id>
        // const channelId = name.replace(/\s/g, "-").toLowerCase();
        let channelId = "Chatroom"
        let channelName= groupInformation[0]
        channelName += 'Chatroom'
        channelId+=groupInformation[1].toString()
        console.log('channelID is', channelId, 'channel name is', channelName)


        // let channel = client.channel('messaging', channelId, {
        //     name: channelName,
        //     image: 'https://picsum.photos/200',
        //     // members:[client.user.id],
        //     members:[user_id],
        // })
        // await channel.create()

        // await channel.watch()
        // setActiveChannel(channel)

        const new_channel = chatClient.channel('messaging', channelId, {
            // add as many custom fields as you'd like
            image: 'https://picsum.photos/200',
            // instead of name 
            name: channelName,
            members: [user_id]
        })

        await new_channel.watch()
    }

    useEffect(()=> {
        createChannel()
    },[groupInformation])

    useEffect(()=> {
        //this connects the client to the chat
        if (token && user) {

            console.log('token here', token, 'type', typeof(token))
            async function init() {
                const user_id= (user.id).toString()
                const chatClient = StreamChat.getInstance(stream)
                //need to get this userToken from the backend
                // https://getstream.io/chat/docs/react/tokens_and_authentication/?language=javascript
                await chatClient.connectUser(user, token)
                
    
                //shouldn't need all this channel specific stuff since have channel list
                const first_channel = chatClient.channel('messaging', 'SiteChat', {
                    // add as many custom fields as you'd like
                    image: 'https://picsum.photos/200',
                    // instead of name 
                    name: 'Site-wide Chatroom',
                    members: [user_id]
                })
    
                // await channel.create()
                // setChannel(channel)
                // channel.addMembers(user_id)
                await first_channel.watch()
                setClient(chatClient)
    
            }
            init()
            return () => { if (client) client.disconnectUser()}
        }
    }, [])

    // if the channel or client hasn't been updated yet show a loading image
    // if (!channel || !client) return <LoadingIndicator />
    if (!client) return <LoadingIndicator />

    return (
        <Chat client = {client} theme = "messaging light">
        <ChannelList 
        filters ={filters}
        sort = {sort}/>    
        {/* ChannelList will get all the channels so don't need next line */}
            <Channel>
                <Window>
                    <ChannelHeader />
                    <MessageList />
                    <MessageInput />
                </Window>
                <Thread />
            </Channel>
        </Chat>
    )
}

export default Chatroom



// How to send a message:
// const message = await channel.sendMessage({
//     text: "Did you already see the trailer? https://www.youtube.com/watch?v=wA38GCX4Tb0",
//   });
  
//   return message;


// 17:00: https://www.youtube.com/watch?v=WjvZL0bnbIE&list=PLQ8qxSPP3G8D-qYKE0TnyyPlZ69HGebmM&index=26&t=8s
// https://dashboard.getstream.io/app/1205628/chat/rolespermissions/roles
// 'name': Channel Member permissions
// 'resources': ['UpdateChannelMembers]-> allows channel members to add members to a channel
// 'name: 'Users can create channels'
// resources: ['UpdateChannelMembers] -> allows users to add themselves and other users to a channel
// resources: ['ReadChannel']-> allows users to read public channels