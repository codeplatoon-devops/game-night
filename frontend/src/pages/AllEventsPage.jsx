import { AllEventsTable } from "../components/Tables/EventsTable/AllEventsTable";

export default function EventPage() {
	return (
		<>
			<h1>Up for an adventure?</h1>
			<h2 style={{ "margin-bottom": "25px", color: "#6ABD6E" }}>
				Check out our community events!
			</h2>

			<AllEventsTable />
		</>
	);
}
