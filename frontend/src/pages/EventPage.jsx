import { EventsTable } from "../components/Tables/EventsTable/EventsTable";
import Calendar from '../components/Calendar/Calendar'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function EventPage({data}) {
	return (
	<Container>
		<Row>
			<Col md={8}>
				<div>
					<Calendar data={data}/>
				</div>
			</Col>
			<Col md={4}>
				<div>
					<EventsTable />
				</div>
			</Col>
		</Row>
	</Container>
	);
}
