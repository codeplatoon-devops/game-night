import React, { useEffect, useState } from "react";
import { ListBox } from 'primereact/listbox';
import { useNavigate } from "react-router-dom";
import { Panel } from "primereact/panel";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from "axios";
import './EventsTable.css'


export const EventsTable = () => {

	let navigate = useNavigate();

	const [events, setEvents] = useState(null);
	const [selectedEvent, setSelectedEvent] = useState(null);
	const [activeIndex, setActiveIndex] = useState(null);

	useEffect(() => {
		axios
		.get('/userevents')
		.then((response) => {
			let data = []
			for(let item in response.data) {
				data.push(response.data[item])
			}
			setEvents(data)
			console.log(data)
			
		})
		.catch((error) => {console.log('ERROR', error);})
	}, [])

	function convertUTCDateToLocalDate(date) {
        var newDate = new Date(date.getTime()+date.getTimezoneOffset()*60*1000);
    
        var offset = date.getTimezoneOffset() / 60;
        var hours = date.getHours();
    
        newDate.setHours(hours - offset);
    
        return newDate;   
    }

	const eventsTemplate = (option) => {

		let date = convertUTCDateToLocalDate(new Date(option.start_time))
		let dateStr = date.toLocaleString()
		return (
            <Container>
				<Row>
					<Col>
						<div>{option.name}</div>
					</Col>
					<Col>
						<div>{option.category}</div>
					</Col>
					<Col>
						<div>{dateStr}</div>
					</Col>
				</Row>
			</Container>
        );
	}

	const handleChange = (event) => {
		navigate(`/events/${event.value.code}`)
	}

	return (
		<Panel header="Upcoming events">
			<ListBox 
			value={selectedEvent} 
			options={events} 
			onChange={handleChange} 
			optionLabel="name" 
			style={{ width: '100%' }} 
			itemTemplate={eventsTemplate}
			listStyle={{ maxHeight: '250px' }}
			/>
		</Panel>
	);
};
