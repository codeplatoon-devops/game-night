import React, { Component } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

export const PendingInvitesEvents = () => {
	const invites = [
		{
			eventName: "session zero",
			category: "DnD",
			location: "city state",
			date: "24 Aug 2022",
			description: "fun game night",
		},
	];

	return (
		<DataTable value={invites}>
			<Column field="eventName" header="Event Name" />
			<Column field="category" header="Category" />
			<Column field="description" header="Description" />
			<Column field="location" header="Location" />
			<Column field="date" header="Date" />
		</DataTable>
	);
};
