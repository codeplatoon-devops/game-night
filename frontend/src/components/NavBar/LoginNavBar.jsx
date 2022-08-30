import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/Images/logo.png";
import { Badge } from "primereact/badge";

import "./NavBar.css";

export default function LoginNavBar({ client }) {
	let navigate = useNavigate();
	const pendingInvites = 3;

	const logout = function (event) {
		event.preventDefault();
		if (client) {
			console.log("line 19 of logout, client should exist", client);
			client.disconnectUser();
			console.log("line 21 of logout, client should not exist", client);
		}
		axios
			.post("/logout")
			.then((response) => {
				// console.log("response from server: ", response);
				navigate("/");
				window.location.reload();
			})
			.catch((error) => {
				// console.log("error: ", error);
			});
	};

	return (
		<Navbar className="fixed-top navbar-color" variant="dark" expand="lg">
			<Container>
				<Navbar.Brand href="#/">
					<img src={logo} alt="logo" width="300px"></img>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="m-auto width-100">
						<Container>
							<Row style={{ "font-size": "20px" }}>
								<Col>
									<Nav.Link href="#/chatroom">
										Chatroom
									</Nav.Link>
								</Col>
								<Col>
									<Nav.Link href="#/groups">
										Your Groups{" "}
										<Badge value={pendingInvites}></Badge>
									</Nav.Link>
								</Col>
								<Col>
									<NavDropdown
										title="Events"
										id="basic-nav-dropdown"
									>
										<NavDropdown.Item
											className="dropdown-text"
											href="#/events"
										>
											Your Events
										</NavDropdown.Item>
										<NavDropdown.Item
											className="dropdown-text"
											href="#/allevents"
										>
											Search Events
										</NavDropdown.Item>
										<NavDropdown.Item
											className="dropdown-text"
											href="#/events/create"
										>
											Create Event
										</NavDropdown.Item>
									</NavDropdown>
								</Col>
								<Col>
									<NavDropdown
										title="Account"
										id="basic-nav-dropdown"
									>
										<NavDropdown.Item
											className="dropdown-text"
											href="#/account"
										>
											Account Details
										</NavDropdown.Item>
										<NavDropdown.Item
											className="dropdown-text"
											onClick={logout}
										>
											Logout
										</NavDropdown.Item>
									</NavDropdown>
								</Col>
							</Row>
						</Container>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}
