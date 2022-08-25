import React, { Component, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { ColumnGroup } from "primereact/columngroup";
import { Container, Row, Col } from "react-bootstrap";
import "./PendingInvitesEvents.css";

export const PendingInvitesEvents = (props) => {
	const [showMessage, setShowMessage] = useState(false);
	const showDetails = () => {
		setShowMessage(true);
	};
	const hideDetails = () => {
		setShowMessage(false);
	};
	let invites = [];
	if (props.data) {
		for (let invitation of props.data) {
			// console.log("invitation in props.data: ", invitation);
			let tempInvite = {
				eventName: invitation,
				details: <Button onClick={showDetails}>Show Details</Button>,
			};

			invites.push(tempInvite);
		}
	}
	const noInvites = [
		{
			eventName: "None",
		},
	];
	// const invites = [
	// 	{
	// 		eventName: "session zero",
	// 		category: "DnD",
	// 		location: "city state",
	// 		date: "24 Aug 2022",
	// 		details: <Button onClick={showDetails}>Show Details</Button>,
	// 	},
	// ];
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
	const tableHeader = (
		<ColumnGroup>
			<Row>
				<Column header="Pending Event Invitations" colSpan={2} />
			</Row>
		</ColumnGroup>
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
			{/* TODO: decide whether we want 'no results found' or 'None' */}
			<DataTable value={invites} headerColumnGroup={tableHeader}>
				<Column field="eventName" />
				<Column field="details" />
			</DataTable>
		</Container>
	);
};
