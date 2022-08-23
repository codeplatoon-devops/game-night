import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import axios from 'axios'
import { useNavigate } from "react-router-dom";

import "./NavBar.css"

export default function LoginNavBar() {

  let navigate = useNavigate();

    const logout = function(event){
        event.preventDefault()
        axios.post('/logout')
        .then((response) => {
            console.log('response from server: ', response)
            navigate("/");
            window.location.reload();
          })
          .catch((error) => {
              console.log('error: ', error)
          })
      }

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
                        <Col>
                            <Nav.Link onClick={logout}>Logout</Nav.Link>
                        </Col>
                    </Row>
                </Container>
            </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}