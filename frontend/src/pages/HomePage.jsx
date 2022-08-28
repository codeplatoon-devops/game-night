// import CarouselHome from '../components/Carousel/CarouselHome'
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { LoginForm } from "../components/Forms/LogInForm/LogInForm";
import CardHome from "../components/Card/CardHome";
import { Button } from "primereact/button";
import "../App.css";
import { useNavigate } from "react-router-dom";
import homeImage from "../assets/Images/board_games.svg";

export default function HomePage({ user }) {
	const navigate = useNavigate();
	const handleLogInClick = () => {
		navigate("/login");
	};
	const handleSignUpClick = () => {
		navigate("/signup");
	};
	return (
		<div className="w-100">
			<Container as={Row} className="ms-auto w-100">
				<Row style={{ "margin-bottom": "30px" }}>
					<Col xs={5}>
						<Row xs={4}></Row>
						<Row>
							<span style={{ "padding-top": "125px" }}>
								<h1>Planning game nights</h1>
								<h1 style={{ color: "#6ABD6E" }}>
									has never been easier
								</h1>
								<hr />

								<Button
									label="Log In"
									type="button"
									className="mr-3 p-button"
									style={{ margin: "15px" }}
									onClick={handleLogInClick}
								/>
								<Button
									label="Sign Up"
									type="button"
									className="p-button-outlined"
									style={{ margin: "15px" }}
									onClick={handleSignUpClick}
								/>
							</span>
						</Row>
						<Row xs={4}></Row>
					</Col>
					<Col xs={7} className="overflow-hidden">
						<img
							src="https://assets.dicebreaker.com/board-game-friends-playing-table-sofa.jpeg/BROK/resize/1200x1200%3E/format/jpg/quality/70/board-game-friends-playing-table-sofa.jpeg"
							alt="hero-1"
							className="md:ml-auto block md:h-full"
							style={{
								clipPath:
									"polygon(8% 0, 100% 0%, 100% 100%, 0 100%)",
							}}
						/>
					</Col>
				</Row>

				<Row style={{ "margin-top": "30px", "margin-bottom": "30px" }}>
					<Container as={Row}>
						<Row>
							<Col></Col>
							<Col>
								<hr />
								<h4
									style={{
										margin: "20px",
										width: "700px",
										lineHeight: "1.5",
									}}
								>
									GameNight welcomes all board game, card
									game, dice, DnD, and other game enthusiasts!
									Our site makes it easy to plan the perfect
									game night! Create a private game night with
									just your close-knit friends, or create and
									search for public games in your area. Use
									the calendar and chatroom to make
									communication and scheduling a piece of
									cake! Lets play!
								</h4>
								<hr />
								<h4
									style={{
										"margin-top": "30px",
										width: "700px",
									}}
								>
									Why Choose Us?
								</h4>
							</Col>
							<Col></Col>
						</Row>
						<Row
							style={{
								"margin-top": "30px",
								"margin-bottom": "30px",
							}}
						>
							<Col className=" mb-4 px-5">
								<span
									className="p-3 shadow-2 mb-3 inline-block"
									style={{ borderRadius: "10px" }}
								>
									<i className="pi pi-calendar"></i>
								</span>
								<h5 style={{ "margin-bottom": "20px" }}>
									Reason #1 (calendar/personal events?)
								</h5>
								<span className=" text-sm line-height-3">
									Fermentum et sollicitudin ac orci phasellus
									egestas tellus rutrum tellus.
								</span>
							</Col>
							<Col className=" mb-4 px-5">
								<span
									className="p-3 shadow-2 mb-3 inline-block"
									style={{ borderRadius: "10px" }}
								>
									<i className="pi pi-check"></i>
								</span>
								<h5 style={{ "margin-bottom": "20px" }}>
									A Huge Games Selection
								</h5>
								<img src={homeImage} />
							</Col>
							<Col className=" mb-0 px-3">
								<span
									className="p-3 shadow-2 mb-3 inline-block"
									style={{ borderRadius: "10px" }}
								>
									<i className="pi pi-comments"></i>
								</span>
								<h5 style={{ "margin-bottom": "20px" }}>
									Something Else (chat?)
								</h5>
								<span className="text-sm line-height-3">
									Mattis rhoncus urna neque viverra justo nec
									ultrices. Id cursus metus aliquam eleifend.
								</span>
							</Col>
						</Row>
					</Container>
				</Row>
				<hr />
				<Row style={{ "margin-top": "30px", "margin-bottom": "30px" }}>
					<div className=" text-center">
						<h2 className="mb-3">Join Our Community</h2>
						<h5 className="mb-5">
							Lorem ipsum dolor sit, amet consectetur adipisicing
							elit. Velit numquam eligendi quos.
						</h5>
						<Button
							label="Sign Up Now"
							icon="pi pi-user"
							className="font-bold px-5 py-3 p-button-raised p-button-rounded white-space-nowrap"
							onClick={handleSignUpClick}
						/>
					</div>
				</Row>
			</Container>
		</div>
	);
}
{
	/* <br></br>
		<Container>
		<Row>
			<Col md={7}>
			<img
			src='https://assets.dicebreaker.com/board-game-friends-playing-table-sofa.jpeg/BROK/resize/1200x1200%3E/format/jpg/quality/70/board-game-friends-playing-table-sofa.jpeg'
			/>
			</Col>
			<Col md={5}>
				<CardHome />
				<Row>
					<Col>
					{user ? 
						null
					: <LoginForm />}
					</Col>
				</Row>
			</Col>
		</Row>

		</Container> */
}
