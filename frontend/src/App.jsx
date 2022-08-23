import "primereact/resources/themes/saga-purple/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState , useEffect} from "react";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import CalendarPage from "./pages/CalendarPage";
import AccountPage from "./pages/AccountPage";
import GroupPage from "./pages/GroupPage";
import EventPage from "./pages/EventPage";
import EventCreatePage from "./pages/EventCreatePage";
import EventDetailPage from "./pages/EventDetailPage";

import LogoutNavBar from "./components/NavBar/LogoutNavBar";
import LoginNavBar from "./components/NavBar/LoginNavBar";

import "./App.css";
import React from "react";
import axios from "axios";

export default function App() {
	let { eventId } = useParams();

	const [user, setUser] = useState(null); //setting to true will set LoginNavbar

	const whoAmI = async () => {
		const response = await axios.get('/whoami')
		const newUser = {'username':response.data.username, 'email': response.data.email}
		if (response.data[0].fields.username) {
		  setUser(newUser)
		} else {
		  setUser(false)
		}
		
	  }
  
	useEffect(()=> {
	  whoAmI()
	},[]) 

	return (
		<div className="App">
			<Router>
				{user ? <LoginNavBar /> : <LogoutNavBar />}
				<div className="separator"></div>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/signup" element={<SignUpPage />} />
					<Route path="/calendar" element={<CalendarPage />} />
					<Route path="/account" element={<AccountPage />} />
					<Route path="/events" element={<EventPage />} />
					<Route
						path="/events/create"
						element={<EventCreatePage />}
					/>
					<Route path="/groups" element={<GroupPage user={user} />} />
					<Route
						path="/events/:eventId"
						element={<EventDetailPage />}
					/>
				</Routes>
			</Router>
		</div>
	);
}
