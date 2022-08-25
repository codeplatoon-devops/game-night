import React, { Component, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { ColumnGroup } from "primereact/columngroup";
import { Row } from "primereact/row";
import { Container, Col } from "react-bootstrap";
import { Row as myRow } from "react-bootstrap";
import "./PendingInvitesGroups.css";

export const PendingInvitesGroups = (props) => {
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
				groupName: invitation,
				details: <Button onClick={showDetails}>Show Details</Button>,
			};

			invites.push(tempInvite);
		}
	}
	const noInvites = [
		{
			groupName: "None",
		},
	];
	const dialogFooter = (
		<Container as={myRow} className="flex justify-content-center">
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
				{/* TODO: add decline logic */}
				<Button
					label="Decline"
					icon="pi pi-times"
					className="p-button-outlined"
					onClick={hideDetails}
				/>
			</Col>
		</Container>
	);

	const tableHeader = (
		<ColumnGroup>
			<Row>
				<Column header="Pending Group Invitations" colSpan={2} />
			</Row>
		</ColumnGroup>
	);

	return (
		<Container
			as={myRow}
			className="container-table-pending-invites-groups"
		>
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
					<p style={{ lineHeight: 1.5 }}>Group info here</p>
				</div>
			</Dialog>
			<DataTable
				value={props.data ? invites : noInvites}
				headerColumnGroup={tableHeader}
			>
				<Column field="groupName" />
				<Column field="details" />
			</DataTable>
		</Container>
	);
};
