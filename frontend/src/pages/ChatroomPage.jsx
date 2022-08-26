import { useEffect } from "react";
import Chatroom from "../components/Chatroom/Chatroom";
import axios from 'axios'

export default function ChatroomPage ({setUser, user, stream, token}) {

    const whoAmI = async () => {
		const response = await axios.get("/whoami");
		const user =
			response.data && response.data[0] && response.data[0].fields;
		// user.id = (response.data[0].pk).toString()
		user.id = response.data[0].fields.username.toString();
		console.log("user from whoami?", user, response);
		setUser(user);
	};

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
                /> 
            </div>
            :
            null}
        </>
    )
}

