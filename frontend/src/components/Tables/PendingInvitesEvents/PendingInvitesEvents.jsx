import React, { Component, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { Container } from "react-bootstrap";

export const PendingInvitesEvents = () => {
	const [showMessage, setShowMessage] = useState(false);
	const onClose = () => {
		setShowMessage(false);
	};
	const invites = [
		{
			eventName: "session zero",
			category: "DnD",
			location: "city state",
			date: "24 Aug 2022",
			details: <Button onClick={onClose}>laksfjwefoi</Button>,
		},
	];
	// const dialogFooter = (
	// 	<div className="flex justify-content-center">
	// 		<Button
	// 			label="OK"
	// 			className="p-button-text"
	// 			autoFocus
	// 			onClick={setShowMessage(false)}
	// 		/>
	// 	</div>
	// );

	return (
		<Container>
			{/* <Dialog
				visible={showMessage}
				onHide={() => setShowMessage(false)}
				footer={dialogFooter}
				showHeader={false}
				breakpoints={{ "960px": "80vw" }}
				style={{ width: "30vw" }}
			>
				<div className="flex align-items-center flex-column pt-6 px-3 field">
					<h5>Invite Details</h5>
					<p style={{ lineHeight: 1.5 }}>Event info here</p>
				</div>
			</Dialog> */}
			<DataTable value={invites}>
				<Column field="eventName" header="Event Name" />
				<Column field="category" header="Category" />
				<Column field="details" header="Description" />
			</DataTable>
		</Container>
	);
};
