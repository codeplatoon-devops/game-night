import React, { Component, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { Container, Row } from "react-bootstrap";
import "./PendingInvitesGroups.css";

export const PendingInvitesGroups = () => {
	const [showMessage, setShowMessage] = useState(false);
	const showDetails = () => {
		setShowMessage(true);
	};
	const hideDetails = () => {
		setShowMessage(false);
	};
	const invites = [
		{
			groupName: "group one",
			members: "whoever",
			details: <Button onClick={showDetails}>Show Details</Button>,
		},
	];
	const dialogFooter = (
		<div className="flex justify-content-center">
			<Button
				label="Hide Details"
				className="p-button-text"
				autoFocus
				onClick={hideDetails}
			/>
		</div>
	);

	return (
		<Container as={Row} className="container-table-pending-invites">
			<Dialog
				visible={showMessage}
				onHide={hideDetails}
				footer={dialogFooter}
				showHeader={false}
				breakpoints={{ "960px": "80vw" }}
				style={{ width: "30vw" }}
			>
				<div className="flex align-items-center flex-column pt-6 px-3 field">
					<h5>Invite Details</h5>
					<p style={{ lineHeight: 1.5 }}>Group info here</p>
				</div>
			</Dialog>
			<h4>Pending Group Invitations</h4>
			<DataTable value={invites}>
				<Column field="groupName" header="Group Name" />
				<Column field="details" header="Details" />
			</DataTable>
		</Container>
	);
};
