import React, { Component } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

export const EventsTable = () => {
	const events = [
		{
			eventName: "session zero",
			category: "DnD",
			location: "city state",
			date: "24 Aug 2022",
			description: "fun game night",
		},
	];

	return (
		<DataTable value={events} paginator rows={15} filterDisplay="menu">
			<Column field="eventName" header="Event Name" filter />
			<Column field="category" header="Category" filter />
			<Column field="description" header="Description" filter />
			<Column field="location" header="Location" filter />
			<Column field="date" header="Date" filter dataType="date" />
		</DataTable>
	);
};
