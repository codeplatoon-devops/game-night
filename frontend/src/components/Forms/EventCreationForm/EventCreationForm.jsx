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
import "./EventCreationForm.css";

export const EventCreationForm = () => {
	const [showMessage, setShowMessage] = useState(false);
	const [formData, setFormData] = useState({});
	const [isPublic, setIsPublic] = useState(false);
	const [category, setCategory] = useState("");
	const [eventDate, setEventDate] = useState(null);
	const [state, setState] = useState(null);
	const [maxAttendees, setMaxAttendees] = useState(null);
	const isPublicSelect = [
		{ label: "Private", value: false },
		{ label: "Public", value: true },
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

	const validate = (data) => {
		let errors = {};

		if (!data.eventname) {
			errors.eventname = "Event name is required.";
		}
		if (!data.addressline1) {
			errors.addressline1 = "Address Line 1 is required.";
		}
		if (!data.city) {
			errors.city = "City is required.";
		}
		if (!data.zipcode) {
			errors.zipcode = "Zipcode is required.";
		}

		return errors;
	};

	const onSubmit = (data, form) => {
		setFormData(data);
		setShowMessage(true);

		form.restart();
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
				onClick={() => setShowMessage(false)}
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
						Your event has been saved under name{" "}
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
								maxattendees: 0,
								ispublic: false,
								date: null,
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
											<Field
												name="eventname"
												render={({ input, meta }) => (
													<div className="field">
														<span className="p-float-label">
															<InputText
																id="eventname"
																{...input}
																autoFocus
																className={classNames(
																	{
																		"p-invalid":
																			isFormFieldValid(
																				meta
																			),
																	}
																)}
															/>
															<label
																htmlFor="eventname"
																className={classNames(
																	{
																		"p-error":
																			isFormFieldValid(
																				meta
																			),
																	}
																)}
															>
																Event name*
															</label>
														</span>
														{getFormErrorMessage(
															meta
														)}
													</div>
												)}
											/>
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
										<Col xs={5}>
											<div className="field">
												<SelectButton
													value={isPublic}
													options={isPublicSelect}
													onChange={(e) =>
														setIsPublic(e.value)
													}
												></SelectButton>
											</div>
										</Col>
										<Col xs={7}>
											<Field
												name="eventdate"
												render={({ input }) => (
													<div className="field">
														<span className="p-float-label">
															<Calendar
																id="eventdate"
																{...input}
																dateFormat="mm/dd/yy"
																mask="99/99/9999"
																showIcon
																showTime
																hourFormat="12"
																value={
																	eventDate
																}
																onChange={(e) =>
																	setEventDate(
																		e.value
																	)
																}
																showButtonBar
															/>
															<label htmlFor="eventdate">
																Event Date
															</label>
														</span>
													</div>
												)}
											/>
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
									</Row>
									<Row>
										<Field
											name="description"
											render={({ input, meta }) => (
												<div className="field">
													<span className="p-float-label">
														<InputTextarea
															id="description"
															{...input}
															className={classNames(
																{
																	"p-invalid":
																		isFormFieldValid(
																			meta
																		),
																}
															)}
														/>
														<label
															htmlFor="description"
															className={classNames(
																{
																	"p-error":
																		isFormFieldValid(
																			meta
																		),
																}
															)}
														>
															Description
														</label>
													</span>
													{getFormErrorMessage(meta)}
												</div>
											)}
										/>
									</Row>
									<Row>
										<Col>
											<Field
												name="addressline1"
												render={({ input, meta }) => (
													<div className="field">
														<span className="p-float-label">
															<InputText
																id="addressline1"
																{...input}
																className={classNames(
																	{
																		"p-invalid":
																			isFormFieldValid(
																				meta
																			),
																	}
																)}
															/>
															<label
																htmlFor="addressline1"
																className={classNames(
																	{
																		"p-error":
																			isFormFieldValid(
																				meta
																			),
																	}
																)}
															>
																Address Line 1*
															</label>
														</span>
														{getFormErrorMessage(
															meta
														)}
													</div>
												)}
											/>
										</Col>
										<Col>
											<Field
												name="addressline2"
												render={({ input, meta }) => (
													<div className="field">
														<span className="p-float-label">
															<InputText
																id="addressline2"
																{...input}
																className={classNames(
																	{
																		"p-invalid":
																			isFormFieldValid(
																				meta
																			),
																	}
																)}
															/>
															<label
																htmlFor="addressline2"
																className={classNames(
																	{
																		"p-error":
																			isFormFieldValid(
																				meta
																			),
																	}
																)}
															>
																Address Line 2
															</label>
														</span>
														{getFormErrorMessage(
															meta
														)}
													</div>
												)}
											/>
										</Col>
									</Row>
									<Row>
										<Col xs={5}>
											<Field
												name="city"
												render={({ input, meta }) => (
													<div className="field">
														<span className="p-float-label">
															<InputText
																id="city"
																{...input}
																className={classNames(
																	{
																		"p-invalid":
																			isFormFieldValid(
																				meta
																			),
																	}
																)}
															/>
															<label
																htmlFor="city"
																className={classNames(
																	{
																		"p-error":
																			isFormFieldValid(
																				meta
																			),
																	}
																)}
															>
																City*
															</label>
														</span>
														{getFormErrorMessage(
															meta
														)}
													</div>
												)}
											/>
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
											<Field
												name="zipcode"
												render={({ input, meta }) => (
													<div className="field">
														<span className="p-float-label">
															<InputText
																id="zipcode"
																{...input}
																className={classNames(
																	{
																		"p-invalid":
																			isFormFieldValid(
																				meta
																			),
																	}
																)}
															/>
															<label
																htmlFor="zipcode"
																className={classNames(
																	{
																		"p-error":
																			isFormFieldValid(
																				meta
																			),
																	}
																)}
															>
																Zipcode*
															</label>
														</span>
														{getFormErrorMessage(
															meta
														)}
													</div>
												)}
											/>
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
