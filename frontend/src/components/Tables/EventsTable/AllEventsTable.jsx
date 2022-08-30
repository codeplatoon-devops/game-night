import { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./EventsTable.css";

export const AllEventsTable = () => {
	let navigate = useNavigate();

	const [event, setEvent] = useState(null);
	const [selectedEvent, setSelectedEvent] = useState(null)

	useEffect(() => {
		axios
			.get("/events")
			.then((response) => {
				let data = [];
				for (let item in response.data) {
					//only show public events
					if (response.data[item].fields.private === false) {
						data.push(response.data[item].fields);
					}
				}
				setEvent(data);
			})
			.catch((error) => {
				// console.log("ERROR", error);
			});
	}, []);
	
	useEffect(() => {
		if(selectedEvent != null) {
			navigate(`/events/${selectedEvent.code}`);
		}
	}, [selectedEvent])

	const addressBodyTemplate = (rowData) => {
		return rowData.address_1 + " " + rowData.address_2;
	};

	function convertUTCDateToLocalDate(date) {
		var newDate = new Date(
			date.getTime() + date.getTimezoneOffset() * 60 * 1000
		);

		var offset = date.getTimezoneOffset() / 60;
		var hours = date.getHours();

		newDate.setHours(hours - offset);

		return newDate;
	}

	const timeBodyTemplate = (rowData) => {
		let date = convertUTCDateToLocalDate(new Date(rowData.start_time));
		return date.toLocaleString();
	};
	
	return (
		<DataTable value={event} paginator rows={15} filterDisplay="menu" selectionMode="single" selection={selectedEvent} onSelectionChange={e => setSelectedEvent(e.value)} >
			<Column field="name" header="Event Name" filter />
			<Column field="category" header="Category" filter />
			{/* <Column field="description" header="Description" filter /> */}
			<Column body={addressBodyTemplate} header="Address" filter />
			<Column field="city" header="City" filter />
			<Column field="state" header="State" filter />
			<Column field="zip_code" header="Zip" filter />
			<Column
				body={timeBodyTemplate}
				header="Date"
				sortable
				dataType="date"
			/>
		</DataTable>
	);
};
