import React, { Component, useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import axios from "axios";
import './EventsTable.css'


export const EventsTable = () => {

	const [event, setEvent] = useState(null)


	useEffect(() => {
		axios
		.get('/userevents/table')
		.then((response) => {
			console.log('EVENTS RESPONSE', response.data);
			let data = []
			for(let item in response.data) {
				data.push(response.data[item].fields)
			}
			setEvent(data)
			
		})
		.catch((error) => {console.log('ERROR', error);})
	}, [])


	return (
		<DataTable value={event} paginator rows={15} filterDisplay="menu">
			<Column field="name" header="Event Name" filter />
			<Column field="category" header="Category" filter />
			<Column field="description" header="Description" filter />
			<Column field="address_1" header="Location" filter />
			<Column field="start_time" header="Date" sortable dataType="date" />
		</DataTable>
	);
};
