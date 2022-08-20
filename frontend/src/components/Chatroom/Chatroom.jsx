import {useEffect, useState} from 'react'
import { StreamChat } from 'stream-chat';
import { Chat, Channel, ChannelHeader, MessageInput, MessageList, Thread, Window, LoadingIndicator } from 'stream-chat-react';

import './chatroom.css'

function Chatroom ({user}) {

    const apiKey = process.env.REACT_APP_STREAM_API_KEY
    const user = {
        // we will get user from the database and it must include the user id for the chat use effect async function to work
        id: 'john',
        name: 'John',
        image: 'https://getstream.imgix.net/images/random_svf/FS.png',
    }

    const getToken = async function () {
        const response = await axios.get('/chattoken')
        return response.data.token
    }
    const [client, setClient] = useState(null)
    const [channel, setChannel] = useState(null)

    useEffect(()=> {
        async function init() {
            // do i need to await getToken?
            const userToken = getToken()
            const chatClient = StreamChat.getInstance(apiKey)
            //need to get this userToken from the backend
            await chatClient.connectUser(user, userToken)
            // instead of "custom_channel_id" we probably want to put something like groupChat_<group_id> or eventChat_<event_id>
            const channel = chatClient.channel('messaging', 'custom_channel_id', {
                // add as many custom fields as you'd like
                image: 'https://www.drupal.org/files/project-images/react.png',
                // instead of name probably want something like group_name Chatroom or Event_name Chatroom
                name: 'Talk about React',
                members: [user.id]
              })
            
            await channel.watch()
            setChannel(channel)
            setClient(chatClient)

        }
        init()
        if (client) return () => client.disconnectUser()
    }, [])

    // if the channel or client hasn't been updated yet show a loading image
    if (!channel || !client) return <LoadingIndicator />

    return (
        <Chat client = {client} theme = "messaging light">
            <Channel channel = {channel}>
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