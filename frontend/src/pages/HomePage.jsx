// import CarouselHome from '../components/Carousel/CarouselHome'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { LoginForm } from "../components/Forms/LogInForm/LogInForm";
import CardHome from "../components/Card/CardHome";
import '../App.css'


export default function HomePage({user}) {
	
	return (
		<div>
		<br></br>
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

		</Container>

		</div>
	// <>
	// 	<div className="wrapper">
	// 		<div className="carousel-z-index">
	// 			<CarouselHome />
	// 		</div>
	// 	<Container>
	// 		<Row>
	// 			<Col className="card-z-index">
	// 				<Card title="About Us">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</Card>
	// 			</Col>
	// 			<Col className="signup-z-index">
	// 				<LoginForm />
	// 			</Col>
	// 		</Row>
	// 	</Container>
	// 	</div>
	// </>
	
	);
}

//import { useState } from "react";
//import GameModal from "../components/Games/GameModal";
//import { Button } from 'primereact/button'
//import React from "react";

//export default function HomePage() {
	//const [displayGame, setDisplayGame] = useState(false)
	//const [gameName, setGameName] = useState('Catan')
	//const onClick = () => {
		//setDisplayGame(true);
	//}

	//return (
	//<div>
		//<h1>Homepage</h1>
		//<Button label="Show" icon="pi pi-external-link" onClick={() => onClick()} />
		//<GameModal displayGame={displayGame} setDisplayGame={setDisplayGame} gameName={gameName}/>
	//</div>
	//)

//}
