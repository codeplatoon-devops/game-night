import { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import axios from "axios";
import './EventsTable.css'


export const AllEventsTable = () => {

	const [event, setEvent] = useState(null)


	useEffect(() => {
		axios
		.get('/events')
		.then((response) => {
			console.log('EVENTS RESPONSE', response.data);
			let data = []
			for(let item in response.data) {
                //only show public events
                if(response.data[item].fields.private === false){
                    data.push(response.data[item].fields)
                }
			}
			setEvent(data)
			
		})
		.catch((error) => {console.log('ERROR', error);})
	}, [])

    const addressBodyTemplate = (rowData) => {
        return rowData.address_1 + " " + rowData.address_2;
    }


	return (
		<DataTable value={event} paginator rows={15} filterDisplay="menu">
			<Column field="name" header="Event Name" filter />
			<Column field="category" header="Category" filter />
			<Column field="description" header="Description" filter />
            <Column body={addressBodyTemplate} header="Address" filter />
            <Column field="city" header="City" filter />
            <Column field="state" header="State" filter />
            <Column field="zip_code" header="Zip" filter />
			<Column field="start_time" header="Date" sortable dataType="date" />
		</DataTable>
	);
};