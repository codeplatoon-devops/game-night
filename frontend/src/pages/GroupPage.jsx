import Chatroom from "../components/Chatroom/Chatroom";
import axios from "axios";
import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { PendingInvitesGroups } from "../components/Tables/PendingInvitesGroups/PendingInvitesGroups";
import GroupCreationForm from "../components/Forms/GroupCreationForm/GroupCreationForm";
import GroupsTable from "../components/Tables/GroupsTable/GroupsTable";
import GroupRequestForm from "../components/Forms/GroupRequestForm/GroupRequestForm";
// import CreateChannel from "../components/Chatroom/CreateChannel";
// import { useChatContext } from "stream-chat-react"

export default function GroupPage({
	user,
	token,
	stream,
	whoAmI,
	client,
	setClient,
	setDeleteChannelInformation,
	deleteChannelInformation,
}) {
	// const {client, setActiveChannel} = useChatContext()
	const nav = useNavigate();
	const [createGroupInformation, setCreateGroupInformation] = useState(null);
	const [joinGroupInformation, setJoinGroupInformation] = useState(null);
	const [leaveGroupInformation, setLeaveGroupInformation] = useState(null);
	const [groups, setGroups] = useState(null);
	const [groupInvitations, setGroupInvitations] = useState(null);
	const [showChat, setShowChat] = useState(false);
	// const [groupCreated, setGroupCreated] = useState(false)

	const viewGroups = function () {
		axios.get("/groups/view").then((response) => {
			// console.log("view groups response.data", response.data);
			if (response.data.success == "True") {
				let new_groups =
					response && response.data && response.data.groups;
				setGroups(new_groups);
			} else {
			}
		});
	};

	const viewGroupInvitations = function () {
		axios.get("/group/request/view").then((response) => {
			// console.log("view group invitations response.data", response.data);
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

	useEffect(() => {
		viewGroups();
		viewGroupInvitations();
		whoAmI();

		setTimeout(() => {
			setShowChat(true);
			// console.log("TIMEOUT");
		}, 300);
	}, []);

	if (!user) {
		return <h3>Loading</h3>;
	} else {
		return (
			<Container>
				<h1>Group Page</h1>
				<Row>
					<Col md={4}>
						<GroupsTable groups={groups} setLeaveGroupInformation={setLeaveGroupInformation} setDeleteChannelInformation={setDeleteChannelInformation}/>
						{/* Group creation */}
						<GroupCreationForm
							viewGroups={viewGroups}
							setCreateGroupInformation={
								setCreateGroupInformation
							}
						/>
						{/* Group invite */}
						<GroupRequestForm groups={groups} />
						<Row>
							<Col>
								{groupInvitations ? (
									<PendingInvitesGroups
										data={groupInvitations}
										setJoinGroupInformation={
											setJoinGroupInformation
										}
									/>
								) : (
									<PendingInvitesGroups
										data={null}
										// join={user.email}
										// need sender email, group name, group code
									/>
								)}
							</Col>
						</Row>
					</Col>
					<Col md={8}>
						{/* {groups || groupInformation
						? */}
						{showChat && (
							<Chatroom
								user={user}
								token={token}
								stream={stream}
								createGroupInformation={createGroupInformation}
								joinGroupInformation={joinGroupInformation}
								client={client}
								setClient={setClient}
								whoAmI={whoAmI}
								leaveGroupInformation={leaveGroupInformation}
								deleteChannelInformation={deleteChannelInformation}
							/>
						)}

						{/* : null
						} */}
					</Col>
				</Row>
			</Container>
		);
	}
}
