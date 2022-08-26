import {useEffect, useState} from 'react'
import { StreamChat } from 'stream-chat';
import { Chat, Channel, ChannelHeader, MessageInput, MessageList, Thread, Window, LoadingIndicator, ChannelList } from 'stream-chat-react';
import axios from 'axios'
import './chatroom.css'
import 'stream-chat-react/dist/css/index.css'
import { useChatContext } from "stream-chat-react"
// had to change this file: node_modules/stream-chat-react/dist/components/MessageInput/hooks/useEmojiIndex.js

function Chatroom ({user, token, stream, createGroupInformation, joinGroupInformation}) {
    
    const [client, setClient] = useState(null)
    const [userId, setUserId] = useState(null)
    const [image, setImage] = useState('https://picsum.photos/200')
    // filters only the channels that the user is a member of
    const filters = {type: 'messaging', members: {$in: [user.id]}}
    const user_id = user.id.toString()
    // puts the channel with the lattest message at the top
    const sort = {last_message_at: -1}

    const createGroupChannel = async () => {
        if (client) {
            let channelId = "GroupChatroom"
            let channelName= createGroupInformation[0]
            channelName += ' Chatroom'
            channelId+=createGroupInformation[1].toString()
            console.log('userId', userId, 'type', typeof(userId), 'channelID is', channelId, 'channel name is', channelName)
            let user_id = user.id.toString()
            console.log('user_id', user_id, 'type', typeof(user_id), 'channelID is', channelId, 'channel name is', channelName)
            const new_channel = client.channel('messaging', channelId, {
                // want to change this up so I get a diff photo each time https://picsum.photos/id/237/200
                image: "https://picsum.photos/200",
                name: channelName,
                members: [user_id]
            })
            console.log('new channel', new_channel)
    
            await new_channel.watch()
        }
        else {
            setTimeout(createGroupChannel, 3000)
        }
    }

    useEffect(()=> {
        createGroupChannel()
    },[createGroupInformation])

    useEffect(()=> {
        joinGroupChannel()
    },[joinGroupInformation])

    const joinGroupChannel = async () => {
        if (client) {
            let channelId = "GroupChatroom"
            let channelName= joinGroupInformation[0]
            channelName += ' Chatroom'
            channelId+=joinGroupInformation[1].toString()
            console.log('user_id', user_id, 'type', typeof(user_id), 'channelID is', channelId, 'channel name is', channelName)
            // const response = await client.queryChannels();
            // const filteredChannel = response.filter((c)=> c.name === channelName);
            // filteredChannel.addMembers([user_id])
            // await new_channel.watch()
            const join_channel = client.channel('messaging', channelId, {
                // want to change this up so I get a diff photo each time https://picsum.photos/id/237/200
                image: 'https://picsum.photos/200',
                name: channelName,
                members: [user_id]
            })
            console.log('joinchannel', join_channel)
            await join_channel.addMembers([user_id])
            await join_channel.watch()
        }
        else {
            setTimeout(joinGroupChannel, 3000)
        }
    }


    useEffect(()=> {
        //this connects the client to the chat
        if (token && user) {
            // setUserId((user.username).toString())
            console.log('token here', token, 'type', typeof(token))
            if (!client) {
                async function init() {
                    const user_id= (user.id).toString()
                    console.log('USER ID HERE LINE 58', user_id, 'type here', typeof(user_id))
                    const chatClient = StreamChat.getInstance(stream)
                    // https://getstream.io/chat/docs/react/tokens_and_authentication/?language=javascript
                    await chatClient.connectUser(user, token)
                    // const site_channel = chatClient.channel('messaging', 'TotalSiteChat', {
                    //     image: 'https://picsum.photos/id/381/200',
                    //     name: 'GameNight All-Members-Chatroom',
                    //     members: [user_id]
                    // })

                    // await site_channel.watch()
                    setClient(chatClient)
                    // shouldn't need all this channel specific stuff since have channel list
                    // 1 is for kyndall, 2 for alisha
                    const first_channel = chatClient.channel('messaging', 'SiteChat-1', {
                        // add as many custom fields as you'd like
                        image: 'https://picsum.photos/200',
                        // instead of name 
                        name: 'Site-wide Chatroom1',
                        // members: [user.id]
                        members: [user_id]
                    })
                    // await channel.create()
                    // setChannel(channel)
                    // channel.addMembers(user_id)
                    // await first_channel.watch()
                    // setClient(chatClient)
        
                }
                init()
            }
            return () => { if (client) client.disconnectUser()}
        }
    }, [])

    // if the channel or client hasn't been updated yet show a loading image
    // if (!channel || !client) return <LoadingIndicator />
    if (!client) return <LoadingIndicator />

    return (
        <Chat client = {client} theme = "messaging dark">
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