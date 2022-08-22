import React, { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { Form, Field } from "react-final-form";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { SelectButton } from "primereact/selectbutton";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { Dialog } from "primereact/dialog";
import { classNames } from "primereact/utils";
import { Checkbox } from "primereact/checkbox";
import { Chips } from "primereact/chips";
import "./EventCreationForm.css";
import { useNavigate } from "react-router-dom";

export const EventCreationForm = () => {
	const [showMessage, setShowMessage] = useState(false); // for submission dialog
	const [formData, setFormData] = useState({});
	const [eventName, setEventName] = useState(""); // event name
	const [isPrivate, setIsPrivate] = useState(true); // event privacy
	const [category, setCategory] = useState(null); // category
	const [eventStartDate, setEventStartDate] = useState(null); // start datetime
	const [eventEndDate, setEventEndDate] = useState(null); // end datetime
	const [state, setState] = useState(null); // state for event location
	const [maxAttendees, setMaxAttendees] = useState(null); // max attendees
	const [createChat, setCreateChat] = useState(false); // create a chat for the event?
	const [games, setGames] = useState([]); // what games will be there?
	const [isAllDay, setIsAllDay] = useState(false); // is it an all-day event
	const [description, setDescription] = useState("");
	const [aLineOne, setALineOne] = useState("");
	const [aLineTwo, setALineTwo] = useState("");
	const [city, setCity] = useState("");
	const [zip, setZip] = useState("");
	const navigate = useNavigate();
	const isPrivateSelect = [
		{ label: "Private", value: true },
		{ label: "Public", value: false },
	];
	const categorySelectItems = [
		{ label: "Board Games", value: "BG" },
		{ label: "DnD", value: "DND" },
		{ label: "Tabletop Games", value: "TG" },
		{ label: "Card Games", value: "CG" },
		{ label: "Other", value: "OTH" },
	];
	const stateSelectItems = [
		{ label: "Alabama", value: "AL" },
		{ label: "Alaska", value: "AK" },
		{ label: "Arizona", value: "AZ" },
		{ label: "Arkansas", value: "AR" },
		{ label: "California", value: "CA" },
		{ label: "Colorado", value: "CO" },
		{ label: "Connecticut", value: "CT" },
		{ label: "Delaware", value: "DE" },
		{ label: "DC", value: "DC" },
		{ label: "Florida", value: "FL" },
		{ label: "Georgia", value: "GA" },
		{ label: "Guam", value: "GU" },
		{ label: "Hawaii", value: "HI" },
		{ label: "Idaho", value: "ID" },
		{ label: "Illinois", value: "IL" },
		{ label: "Indiana", value: "IN" },
		{ label: "Iowa", value: "IA" },
		{ label: "Kansas", value: "KS" },
		{ label: "Kentucky", value: "KY" },
		{ label: "Louisiana", value: "LA" },
		{ label: "Maine", value: "ME" },
		{ label: "Maryland", value: "MD" },
		{ label: "Massachusetts", value: "MA" },
		{ label: "Michigan", value: "MI" },
		{ label: "Minnesota", value: "MN" },
		{ label: "Mississippi", value: "MS" },
		{ label: "Missouri", value: "MO" },
		{ label: "Montana", value: "MT" },
		{ label: "Nebraska", value: "NE" },
		{ label: "Nevada", value: "NV" },
		{ label: "New Hampshire", value: "NH" },
		{ label: "New Jersey", value: "NJ" },
		{ label: "New Mexico", value: "NM" },
		{ label: "New York", value: "NY" },
		{ label: "North Carolina", value: "NC" },
		{ label: "North Dakota", value: "ND" },
		{ label: "Ohio", value: "OH" },
		{ label: "Oklahoma", value: "OK" },
		{ label: "Oregon", value: "OR" },
		{ label: "Pennsylvania", value: "PA" },
		{ label: "Puerto Rico", value: "PR" },
		{ label: "Rhode Island", value: "RI" },
		{ label: "South Carolina", value: "SC" },
		{ label: "South Dakota", value: "SD" },
		{ label: "Tennessee", value: "TN" },
		{ label: "Texas", value: "TX" },
		{ label: "Utah", value: "UT" },
		{ label: "Vermont", value: "VT" },
		{ label: "Virgin Islands", value: "VI" },
		{ label: "Virginia", value: "VA" },
		{ label: "Washington", value: "WA" },
		{ label: "West Virginia", value: "WV" },
		{ label: "Wisconsin", value: "WI" },
		{ label: "Wyoming", value: "WY" },
	];

	const validate = (data, form) => {
		let errors = {};

		if (!eventName) {
			errors.eventname = "Event name is required.";
		}
		if (!aLineOne) {
			errors.addressline1 = "Address Line 1 is required.";
		}
		if (!eventStartDate) {
			errors.eventstartdate = "Start date is required.";
		}
		if (!eventEndDate) {
			errors.eventenddate = "End date is required.";
		}
		if (!city) {
			errors.city = "City is required.";
		}
		if (!zip) {
			errors.zipcode = "Zipcode is required.";
		}
		console.log(errors);
		return errors;
	};

	const onSubmit = (data, form) => {
		setFormData(data);
		setShowMessage(true);
		form.restart;
	};

	// hardcoded to event '1' for now
	// TODO: update to event code when generated
	const onAck = () => {
		setShowMessage(false);
		navigate("/events/1");
	};

	const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
	const getFormErrorMessage = (meta) => {
		return (
			isFormFieldValid(meta) && (
				<small className="p-error">{meta.error}</small>
			)
		);
	};

	const dialogFooter = (
		<div className="flex justify-content-center">
			<Button
				label="OK"
				className="p-button-text"
				autoFocus
				onClick={onAck}
			/>
		</div>
	);

	return (
		<Container as={Row}>
			<Dialog
				visible={showMessage}
				onHide={() => setShowMessage(false)}
				position="top"
				footer={dialogFooter}
				showHeader={false}
				breakpoints={{ "960px": "80vw" }}
				style={{ width: "30vw" }}
			>
				<div className="flex align-items-center flex-column pt-6 px-3 field">
					<h5>Event Creation Successful!</h5>
					<p style={{ lineHeight: 1.5 }}>
						Your event has been saved under the code{" "}
						<b>{formData.eventname}</b>. Please proceed to the next
						page for more details.
					</p>
				</div>
			</Dialog>
			<Col></Col>
			<Col>
				<div className="flex justify-content-center">
					<div className="card">
						<h2 className="text-center">Create Event</h2>
						<Form
							onSubmit={onSubmit}
							initialValues={{
								eventname: "",
								category: null,
								maxattendees: 1,
								isprivate: true,
								chatcreation: true,
								boardGames: [],
								eventstartdate: null,
								eventenddate: null,
								allday: false,
								description: "",
								addressline1: "",
								addressline2: "",
								city: "",
								state: null,
								zipcode: "",
							}}
							validate={validate}
							render={({ handleSubmit }) => (
								<form
									onSubmit={handleSubmit}
									className="p-fluid"
								>
									<Row>
										<Col xs={7}>
											<div className="field">
												<span className="p-float-label">
													<InputText
														name="eventname"
														id="eventname"
														autoFocus
														value={eventName}
														onChange={(e) =>
															setEventName(
																e.value
															)
														}
													/>
													<label htmlFor="eventname">
														Event name*
													</label>
												</span>
											</div>
										</Col>
										<Col xs={5}>
											<div className="field">
												<Dropdown
													name="category"
													value={category}
													options={
														categorySelectItems
													}
													onChange={(e) =>
														setCategory(e.value)
													}
													placeholder="Event category"
												/>
											</div>
										</Col>
									</Row>
									<Row>
										<Col>
											<div className="field">
												<span className="p-float-label">
													<Chips
														id="boardgames"
														name="boardgames"
														value={games}
														onChange={(e) =>
															setGames(e.value)
														}
														tooltip="Type in a game then press enter to add it to your game list."
													/>
													<label htmlFor="boardgames">
														Games
													</label>
												</span>
											</div>
										</Col>
									</Row>
									<Row>
										<Col xs={4}>
											<div className="field">
												<SelectButton
													value={isPrivate}
													options={isPrivateSelect}
													onChange={(e) =>
														setIsPrivate(e.value)
													}
												></SelectButton>
											</div>
										</Col>
										<Col xs={4}>
											<div className="field">
												<InputNumber
													id="maxattendees"
													showButtons
													value={maxAttendees}
													placeholder="Max attendees"
													onChange={(e) =>
														setMaxAttendees(
															maxAttendees
														)
													}
													min={1}
													max={500}
												/>
											</div>
										</Col>
										<Col>
											<div className="field">
												<Checkbox
													id="chatcreation"
													name="chatcreation"
													onChange={(e) =>
														setCreateChat(
															!createChat
														)
													}
													checked={createChat}
												/>
												<label
													htmlFor="chatcreation"
													className="p-checkbox-label"
												>
													Create event chat
												</label>
											</div>
										</Col>
									</Row>
									<Row>
										<Col xs={5}>
											<div className="field">
												<span className="p-float-label">
													<Calendar
														name="eventstartdate"
														id="eventstartdate"
														dateFormat="mm/dd/yy"
														mask="99/99/9999"
														showIcon
														showTime={!isAllDay}
														hourFormat="12"
														value={eventStartDate}
														maxDate={eventEndDate}
														onChange={(e) =>
															setEventStartDate(
																e.value
															)
														}
														showButtonBar
													/>
													<label htmlFor="eventstartdate">
														Event Start
													</label>
												</span>
											</div>
										</Col>
										<Col xs={5}>
											<div className="field">
												<span className="p-float-label">
													<Calendar
														id="eventenddate"
														name="eventenddate"
														dateFormat="mm/dd/yy"
														mask="99/99/9999"
														showIcon
														showTime={!isAllDay}
														hourFormat="12"
														value={eventEndDate}
														onChange={(e) =>
															setEventEndDate(
																e.value
															)
														}
														minDate={eventStartDate}
														showButtonBar
													/>
													<label htmlFor="eventenddate">
														Event End
													</label>
												</span>
											</div>
										</Col>
										<Col xs={2}>
											<div className="field">
												<Checkbox
													name="allday"
													id="allday"
													checked={isAllDay}
													onChange={(e) =>
														setIsAllDay(!isAllDay)
													}
												/>
												<label
													htmlFor="allday"
													className="p-checkbox-label"
												>
													All day
												</label>
											</div>
										</Col>
									</Row>

									<Row>
										<div className="field">
											<span className="p-float-label">
												<InputTextarea
													name="description"
													id="description"
													value={description}
													onChange={(e) =>
														setDescription(e.value)
													}
												/>
												<label htmlFor="description">
													Description
												</label>
											</span>
										</div>
									</Row>
									<Row>
										<Col>
											<div className="field">
												<span className="p-float-label">
													<InputText
														id="addressline1"
														name="addressline1"
														value={aLineOne}
														onChange={(e) =>
															setALineOne(e.value)
														}
													/>
													<label htmlFor="addressline1">
														Address Line 1*
													</label>
												</span>
											</div>
										</Col>
										<Col>
											<div className="field">
												<span className="p-float-label">
													<InputText
														id="addressline2"
														name="addressline2"
														value={aLineTwo}
														onChange={(e) =>
															setALineTwo(e.value)
														}
													/>
													<label htmlFor="addressline2">
														Address Line 2
													</label>
												</span>
											</div>
										</Col>
									</Row>
									<Row>
										<Col xs={5}>
											<div className="field">
												<span className="p-float-label">
													<InputText
														id="city"
														name="city"
														value={city}
														onChange={(e) =>
															setCity(e.value)
														}
													/>
													<label htmlFor="city">
														City*
													</label>
												</span>
											</div>
										</Col>
										<Col xs={5}>
											<div className="field">
												<Dropdown
													name="state"
													value={state}
													options={stateSelectItems}
													onChange={(e) =>
														setState(e.value)
													}
													placeholder="State*"
												/>
											</div>
										</Col>
										<Col xs={2}>
											<div className="field">
												<span className="p-float-label">
													<InputText
														id="zipcode"
														name="zipcode"
														keyfilter="int"
														value={zip}
														onChange={(e) =>
															setZip(e.value)
														}
													/>
													<label htmlFor="zipcode">
														Zipcode*
													</label>
												</span>
											</div>
										</Col>
									</Row>
									<Button
										type="submit"
										label="Create Event"
										className="mt-2"
									/>
								</form>
							)}
						/>
					</div>
				</div>
			</Col>
			<Col></Col>
		</Container>
	);
};
