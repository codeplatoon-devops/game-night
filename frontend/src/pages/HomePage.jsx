import { useState } from "react";
import GameModal from "../components/Games/GameModal";
import { Button } from 'primereact/button'
import React from "react";

export default function HomePage() {
	const [displayGame, setDisplayGame] = useState(false)
	const [gameName, setGameName] = useState('Catan')
	const onClick = () => {
		setDisplayGame(true);
	}

	return (
	<div>
		<h1>Homepage</h1>
		<Button label="Show" icon="pi pi-external-link" onClick={() => onClick()} />
		<GameModal displayGame={displayGame} setDisplayGame={setDisplayGame} gameName={gameName}/>
	</div>
	)
}
