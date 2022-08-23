import Chatroom from "../components/Chatroom/Chatroom";

export default function GroupPage({user}) {
	return (
		<>
			<h1>Group Page</h1>
			<Chatroom user={user} />
		</>
	)
}