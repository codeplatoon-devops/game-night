import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import moment from 'moment';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import { Button } from 'react-bootstrap'
import EventDetailList from "../components/List/EventDetailList"

export default function EventDetailPage() {

	let { eventId } = useParams()

    const [eventDetail, setEventDetail] = useState(null)
	const [games, setGames] = useState(null)
	const [startTime, setStartTime] = useState(null)
	const [endTime, setEndTime] = useState(null)

    useEffect(() => {
		axios
		.get(`/userevents/${eventId}`)
		.then((response) => {
            console.log('response data', response.data[0].fields)
			setGames(Object.values(response.data[0].fields.games))
			setStartTime(moment(response.data[0].fields.start_time).format('MMMM Do YYYY, h:mm a'))
			setEndTime(moment(response.data[0].fields.end_time).format('MMMM Do YYYY, h:mm a'))
			setEventDetail(response.data[0].fields)
		})
	}, [])

    return(
        <div>
		{eventDetail &&
			<EventDetailList eventDetail={eventDetail} games={games} startTime={startTime} endTime={endTime}/>
		}
        </div>
    )
}
