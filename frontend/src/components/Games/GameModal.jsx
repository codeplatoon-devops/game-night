import React, { useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import axios from 'axios';
import "./GameModal.css"

export default function GameModal({displayGame, setDisplayGame, gameName}) {

    const [gameInfo, setGameInfo] = useState(null)

    const getGame = () => {
        axios.get('/games', {
            params: {
                name:gameName
            }
        }).then((response) =>{
            // console.log('receiving info', response.data.games[0])
            setGameInfo(response.data.games[0])
        })
    }
    const renderFooter = (name) => {
        return (
            <div>
                <Button label="Back" icon="pi pi-check" onClick={() => onHide()} autoFocus />
            </div>
        );
    }
    const onHide = (name) => {
        setDisplayGame(false);
    }

    useEffect(()=>{
        getGame()
    },[])
    
    return (
            <Dialog visible={displayGame} header={gameInfo && gameInfo.name} onHide={() => onHide('displayGame')} breakpoints={{'960px': '75vw'}} style={{width: '50vw'}} footer={renderFooter('displayGame')}>
                {gameInfo &&
                <div>
                    <img src={gameInfo.thumb_url} alt="img" id='gameImg'/>
                    <h3>{gameInfo.price}</h3>
                    <p>{gameInfo.description_preview}</p>

                </div> }
                
            </Dialog>

    )
} 