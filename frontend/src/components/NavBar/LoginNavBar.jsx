import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import "./NavBar.css"

export default function LoginNavBar() {
  return (
    <Navbar className="fixed-top navbar-color" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#/">[logo here]</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="m-auto width-100">
                <Container>
                    <Row>
                        <Col>
                            <Nav.Link href="#/">Home</Nav.Link>
                        </Col>
                        <Col>
                            <Nav.Link href="#/calendar">Calendar</Nav.Link>
                        </Col>
                        <Col>
                            <Nav.Link href="#/events">Search Events</Nav.Link>
                        </Col>
                        <Col>
                            <Nav.Link href="#/groups">Your Groups</Nav.Link>
                        </Col>
                    </Row>
                </Container>
            </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}