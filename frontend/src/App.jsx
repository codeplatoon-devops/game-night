import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState } from "react";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import CalendarPage from "./pages/CalendarPage";
import AccountPage from "./pages/AccountPage";
import GroupPage from "./pages/GroupPage";
import EventPage from "./pages/EventPage";
import EventDetailPage from "./pages/EventDetailPage";

import LogoutNavBar from './components/NavBar/LogoutNavBar'
import LoginNavBar from "./components/NavBar/LoginNavBar";

import "./App.css";

export default function App() {
	let { eventId } = useParams();

  const [user, setUser] = useState(null) //setting to true will set LoginNavbar


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
          <Route path="/groups" element={<GroupPage />} />
					<Route
						path="/events/:eventId"
						element={<EventDetailPage />}
					/>
				</Routes>
			</Router>
		</div>
	);
}
