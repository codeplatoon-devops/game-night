import { EventsTable } from "../components/Tables/EventsTable/EventsTable";
import Calendar from "../components/Calendar/Calendar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import PendingInvitesEvents from "../components/Tables/PendingInvitesEvents/PendingInvitesEvents";

export default function EventPage({ data }) {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate("/events/create");
	};
	return (
		<Container>
			<h1 style={{ margin: "20px" }}>Scheduled Events</h1>
			<hr />
			<Row>
				<Col md={4}>
					<div>
						<EventsTable />
						<Button
							onClick={handleClick}
							icon="pi pi-plus"
							label="Create Event"
							className="btn-create-event"
						/>
						{/* TODO: add data for table */}
						<PendingInvitesEvents data={null} />
					</div>
				</Col>
				<Col md={8}>
					<div>
						<Calendar data={data} />
					</div>
				</Col>
			</Row>
		</Container>
	);
}
