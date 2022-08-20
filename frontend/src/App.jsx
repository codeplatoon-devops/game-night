import "primereact/resources/themes/mdc-dark-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { useParams } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import CalendarPage from "./pages/CalendarPage";
import AccountPage from "./pages/AccountPage";
import EventPage from "./pages/EventPage";
import EventDetailPage from "./pages/EventDetailPage";
import "./App.css";

export default function App() {
	let { eventId } = useParams();
	return (
		<div className="App">
			<Router>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/signup" element={<SignUpPage />} />
					<Route path="/calendar" element={<CalendarPage />} />
					<Route path="/account" element={<AccountPage />} />
					<Route path="/events" element={<EventPage />} />
					<Route
						path="/events/:eventId"
						element={<EventDetailPage />}
					/>
				</Routes>
			</Router>
		</div>
	);
}
