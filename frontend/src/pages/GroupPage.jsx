import Chatroom from "../components/Chatroom/Chatroom";
import axios from 'axios'
import {useEffect, useState} from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

export default function GroupPage({user, token, stream}) {
	const [groupCode, setGroupCode] = useState(null)
	const [groups, setGroups] = useState(null)

	const getGroupCode = function () {
		axios.get("/group/code")
			.then((response) => {
				console.log(
					"get group code response.data.group_code", response.data.group_code)
				let code = response && response.data && response.data.group_code
				setGroupCode(code)
			});
	}

	const viewGroups = function () {
		axios.get("/groups/view")
			.then((response) => {
				console.log(
					"view groups response.data", response.data)
				// if (response.data.success == "True") {
				// 	let new_groups = response && response.data && response.data.groups
				// 	// setGroups(new_groups)
				// }
				// else{
				// }
			});
	}
	

	const createGroup = function (name) {
		axios.post("/group/create", {name: name, code:groupCode})
			.then((response) => {
				console.log(
					"create group response.data", response.data)
				if (response.data.success == "True") {
					window.alert(`Group created! Your group code has been assigned ${groupCode}`)
				}
				else {
					window.alert(`${response.data.reason}`)
				}

			});
	}

	const createGroupRequest = function (friend_email, code) {
		axios.post("/group/request/create", {friend_email: friend_email, code:code})
			.then((response) => {
				console.log(
					"create group request response.data", response.data)
				if (response.data.success == "True") {
					window.alert('Group invitation sent!')
				}
				else {
					window.alert(`${response.data.reason}`)
				}

			});
	}

	const joinGroup = function (email) {
		axios.post("/group/join", {friend_email: email, code:groupCode})
			.then((response) => {
				console.log(
					"join group response.data", response.data)
				if (response.data.success == "True") {
					window.alert('Group joined!')
				}
				else {
					window.alert(`${response.data.reason}`)
				}

			});
	}

	useEffect(()=> {
		getGroupCode()
		viewGroups()
	},[]) 

	// this part is just necessary for the create group form
	if (!groupCode) {
		return <h3>Loading</h3>
	}
	else {
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
							<h4>{group.name}</h4>
						))}
						</div>
						: null
						}
						<Button onClick={()=>createGroup("TestGroup1")}>Create Group</Button>
						<Row>
							<Col>
								<h2> Pending Group invitations table</h2>
							</Col>
						</Row>
					</Col>
					<Col md={8}>
						<Chatroom user={user} token = {token} stream={stream}/>
					</Col>
				</Row>
			</Container>
		)
	}

}