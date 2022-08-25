import Chatroom from "../components/Chatroom/Chatroom";
import axios from "axios";
import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { PendingInvitesGroups } from "../components/Tables/PendingInvitesGroups/PendingInvitesGroups";
// import CreateChannel from "../components/Chatroom/CreateChannel";
// import { useChatContext } from "stream-chat-react"

export default function GroupPage({ user, token, stream }) {
	// const {client, setActiveChannel} = useChatContext()
	const nav = useNavigate();
	// const [image, setImage] = useState('https://picsum.photos/200')
	const [groupCode, setGroupCode] = useState(null)
	const [createGroupInformation,setCreateGroupInformation] = useState(null)
	const [joinGroupInformation,setJoinGroupInformation] = useState(null)
	const [groups, setGroups] = useState(null)
	const [groupInvitations,setGroupInvitations] = useState(null)
	// const [groupCreated, setGroupCreated] = useState(false)

	const getGroupCode = function () {
		axios.get("/group/code").then((response) => {
			console.log(
				"get group code response.data.group_code",
				response.data.group_code
			);
			let code = response && response.data && response.data.group_code;
			setGroupCode(code);
		});
	};

	const viewGroups = function () {
		axios.get("/groups/view").then((response) => {
			console.log("view groups response.data", response.data);
			if (response.data.success == "True") {
				let new_groups =
					response && response.data && response.data.groups;
				setGroups(new_groups);
			} else {
			}
		});
	};

	const createGroup = function (name) {
		let code = groupCode;
		axios
			.post("/group/create", { name: name, code: code })
			.then((response) => {
				console.log("create group response.data", response.data);
				if (response.data.success == "True") {
					window.alert(
						`Group created! Your group code has been assigned ${groupCode}`
					);
					// CreateChannel(name, code)
					setCreateGroupInformation([name,code])
					viewGroups()
					// nav('/groups')
					// window.location.reload()
					// the reload is messing with the chatrooms
				} else {
					window.alert(`${response.data.reason}`);
				}
			});
	};

	// const createGroupRequest = function (friend_email, code) {
	// axios.post("/group/request/create", {friend_email: friend_email, code:code})
	// just for test I'm putting in the group code because I know I'll be creating this group, but normally we would run the lines above
	const createGroupRequest = function (friend_email) {
		axios
			.post("/group/request/create", {
				friend_email: friend_email,
				group_code: groupCode,
			})
			.then((response) => {
				console.log(
					"create group request response.data",
					response.data
				);
				if (response.data.success == "True") {
					window.alert("Group invitation sent!");
				} else {
					window.alert(`${response.data.reason}`);
				}
			});
	};

	const viewGroupInvitations = function () {
		axios.get("/group/request/view").then((response) => {
			console.log("view group invitations response.data", response.data);
			if (response.data.success == "True") {
				let new_invitations =
					response && response.data && response.data.group_requests;
				setGroupInvitations(new_invitations);
			}
			// else{
			// 	console.log('')
			// }
		});
	};

	const joinGroup = function (email, name, code) {
		axios.put("/group/join", {friend_email: email, code:code})
			.then((response) => {
				console.log("join group response.data", response.data);
				if (response.data.success == "True") {
					window.alert('Group joined!')
					setJoinGroupInformation([name,code])
				} else {
					window.alert(`${response.data.reason}`);
				}
			});
	};

	useEffect(() => {
		getGroupCode();
		viewGroups();
		viewGroupInvitations();
	}, []);

	// this part is just necessary for the create group form
	if (!groupCode) {
		return <h3>Loading</h3>;
	} else {
		return (
			<Container>
				<h1>Group Page</h1>
				<Row>
					<Col md={4}>
						<h2> Groups table</h2>
						{groups
						? 
						<div>
						{groups.map((group) => (
							<h4>{group}</h4>
						))}
						</div>
						: null
						}
						<Button onClick={()=>createGroup("TestGroup6")}>Create Group</Button>
						{/* sending invite to alisha */}
						<Button onClick={()=>createGroupRequest("alisha@gmail.com")}>Send Group Invite</Button>
						<Row>
							<Col>
								<h2> Pending Group invitations table</h2>
								{groupInvitations
									? 
									<div>
									{groupInvitations.map((invitation) => (
										<div>
											<h4>{invitation[0]} invited you to join the group {invitation[1]}</h4>
											{/* accepting invite from kydnall */}
											<Button onClick={()=>joinGroup("kyndall@email.com", invitation[1], invitation[2])}>Join Group</Button>
										</div>
									))}
									</div>
									: <h4> No pending invitations</h4>
								}
							</Col>
						</Row>
					</Col>
					<Col md={8}>
						{/* {groups || groupInformation
						? */}
						<Chatroom user={user} token = {token} stream={stream} createGroupInformation={createGroupInformation} joinGroupInformation={joinGroupInformation}/>
						{/* : null
						} */}
					</Col>
				</Row>
			</Container>
		);
	}
}
