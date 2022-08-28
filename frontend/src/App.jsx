import "primereact/resources/themes/vela-green/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import AccountPage from "./pages/AccountPage";
import GroupPage from "./pages/GroupPage";
import EventPage from "./pages/EventPage";
import ChatroomPage from "./pages/ChatroomPage";
import AllEventsPage from "./pages/AllEventsPage";
import EventCreatePage from "./pages/EventCreatePage";
import EventDetailPage from "./pages/EventDetailPage";
import getCSRFToken from "../utils";

import LogoutNavBar from "./components/NavBar/LogoutNavBar";
import LoginNavBar from "./components/NavBar/LoginNavBar";

import "./App.css";
import React from "react";
import axios from "axios";

export default function App() {
	let { eventId } = useParams();

	axios.defaults.headers.common["X-CSRFToken"] = getCSRFToken();

	const [user, setUser] = useState(null); //setting to true will set LoginNavbar
	const [token, setToken] = useState(null);
	const [stream, setStream] = useState(null);
	const [userEvent, setUserEvent] = useState([]);
	const [createEventInformation, setCreateEventInformation] = useState(null);
	const [joinEventInformation, setJoinEventInformation] = useState(null);
	const [client, setClient] = useState(null)

	const whoAmI = async () => {
		const response = await axios.get("/whoami");
		const user =
			response.data && response.data[0] && response.data[0].fields;
		// user.id = (response.data[0].pk).toString()
		user.id = response.data[0].fields.username.toString();
		console.log("user from whoami?", user, response);
		setUser(user);
	};

	useEffect(() => {
		axios.get("/chattoken").then((response) => {
			let newtoken = response && response.data && response.data.token;
			console.log("newtoken", newtoken);
			setToken(newtoken);
		});

		axios.get("/streamapi").then((response) => {
			// console.log(
			// 	"getstream api response.data",
			// 	response.data.api,
			// )
			let newStream = response.data.api;
			setStream(newStream);
		});

		axios.get("/userevents").then((response) => {
			console.log("user events", response.data);
			setUserEvent(response.data);
		});
		whoAmI();
	}, []);

	return (
		<div className="App">
			<Router>
				{user ? <LoginNavBar client={client}/> : <LogoutNavBar />}
				<div className="separator"></div>
				<Routes>
					<Route path="/" element={<HomePage user={user} />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/signup" element={<SignUpPage />} />
					<Route path="/account" element={<AccountPage />} />
					<Route path="/chatroom" element={<ChatroomPage 
							user={user}
							token={token}
							stream={stream}
							setUser={setUser}
							whoAmI={whoAmI}
							client = {client}
							setClient={setClient}
							createEventInformation = {createEventInformation}
							joinEventInformation = {joinEventInformation}
							/>} />
					<Route path="/events" element={<EventPage data={userEvent}/>} />
					<Route path="/allevents" element={<AllEventsPage />} />
					<Route
						path="/events/create"
						element={<EventCreatePage 
							setCreateEventInformation = {setCreateEventInformation}
						/>}
					/>
					<Route
						path="/groups"
						element={
							<GroupPage
								user={user}
								token={token}
								stream={stream}
								whoAmI={whoAmI}
								client = {client}
								setClient={setClient}
							/>
						}
					/>
					<Route
						path="/events/:eventId"
						element={<EventDetailPage 
							setJoinEventInformation = {setJoinEventInformation}/>}
					/>
				</Routes>
			</Router>
		</div>
	);
}
