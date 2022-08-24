import Chatroom from "../components/Chatroom/Chatroom";

export default function GroupPage({user, token, stream}) {
	return (
		<>
			<h1>Group Page</h1>
			<Chatroom user={user} token = {token} stream={stream}/>
		</>
	)
}