import { useEffect} from "react";
import Chatroom from "../components/Chatroom/Chatroom";
import axios from 'axios'

export default function ChatroomPage ({setUser, user, stream, token, whoAmI}) {


    useEffect(()=> {
        whoAmI()
    },[])

    return (
        <>
        {user
            ?
            <div>
                <Chatroom 
                    user={user}
                    token={token}
                    stream={stream}
                    whoAmI={whoAmI}
                /> 
            </div>
            :
            null}
        </>
    )
}

