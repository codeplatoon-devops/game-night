import React, { Component, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { Container, Row, Col } from "react-bootstrap";
import "./PendingInvitesEvents.css";

export const PendingInvitesEvents = () => {
	const [showMessage, setShowMessage] = useState(false);
	const showDetails = () => {
		setShowMessage(true);
	};
	const hideDetails = () => {
		setShowMessage(false);
	};
	const invites = [
		{
			eventName: "session zero",
			category: "DnD",
			location: "city state",
			date: "24 Aug 2022",
			details: <Button onClick={showDetails}>Show Details</Button>,
		},
	];
	const dialogFooter = (
		<div className="flex justify-content-center">
			<Row>
				<Col>
					{/* TODO: add accept logic */}
					<Button
						label="Accept"
						icon="pi pi-check"
						className="p-button-outlined"
						autoFocus
						onClick={hideDetails}
					/>
				</Col>
				<Col></Col>
				<Col>
					{/* TODO: add decline login */}
					<Button
						label="Decline"
						icon="pi pi-times"
						className="p-button-outlined"
						onClick={hideDetails}
					/>
				</Col>
			</Row>
		</div>
	);

	return (
		<Container as={Row} className="container-table-pending-invites">
			<Dialog
				visible={showMessage}
				onHide={hideDetails}
				showHeader={true}
				header="Invite Details"
				footer={dialogFooter}
				breakpoints={{ "960px": "80vw" }}
				style={{ width: "30vw" }}
			>
				<div className="flex align-items-center flex-column pt-6 px-3 field">
					<p style={{ lineHeight: 1.5 }}>Event info here</p>
				</div>
			</Dialog>
			<h4>Event Invitations</h4>
			<DataTable value={invites}>
				<Column field="eventName" header="Event Name" />
				<Column field="details" header="Details" />
			</DataTable>
		</Container>
	);
};
