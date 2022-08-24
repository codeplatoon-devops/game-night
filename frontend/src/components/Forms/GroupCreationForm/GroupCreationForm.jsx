import { Field } from "react-final-form";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { classNames } from "primereact/utils";
import { Form } from "react-final-form";
import { Row, Col, Container } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./GroupCreationForm.css";

export default function GroupCreationForm() {
	const [showMessage, setShowMessage] = useState(false);
	const [groupName, setGroupName] = useState("");
	const navigate = useNavigate();
	const validate = () => {
		let errors = {};
		if (!groupName) {
			errors.groupname = "Event name is required.";
		}
		return errors;
	};
	const onSubmit = (form) => {
		setShowMessage(true);
	};

	// hardcoded to group '1' for now
	// TODO: update redirect to group code when generated
	const onAck = () => {
		setShowMessage(false);
		navigate("/groups/1");
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
		<Container>
			<Dialog
				visible={showMessage}
				onHide={() => setShowMessage(false)}
				position="top"
				footer={dialogFooter}
				showHeader={false}
				breakpoints={{ "960px": "80vw" }}
				style={{ width: "30vw" }}
			>
				{/* TODO: get group code for dialog message */}
				<div className="flex align-items-center flex-column pt-6 px-3 field">
					<h5>Group Creation Successful!</h5>
					<p style={{ lineHeight: 1.5 }}>
						Your group has been saved under the code [group code].
						Please proceed to the next page for more details.
					</p>
				</div>
			</Dialog>
			<Col>
				<Row>
					<div className="form-group-create">
						<div className="flex justify-content-center">
							<div className="card card-group-create">
								<h2 className="text-center">Create a Group</h2>
								<Form
									onSubmit={onSubmit}
									initialValues={{
										groupname: "",
									}}
									validate={validate}
									render={({ handleSubmit }) => (
										<form
											onSubmit={handleSubmit}
											className="p-fluid"
										>
											<Field
												name="groupname"
												render={({ input, meta }) => (
													<div className="field">
														<span className="p-float-label">
															<InputText
																id="groupname"
																{...input}
																value={
																	groupName
																}
																onChange={(e) =>
																	setGroupName(
																		e.target
																			.value
																	)
																}
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
																htmlFor="username"
																className={classNames(
																	{
																		"p-error":
																			isFormFieldValid(
																				meta
																			),
																	}
																)}
															>
																Group Name*
															</label>
														</span>
														{getFormErrorMessage(
															meta
														)}
													</div>
												)}
											/>

											<Button
												type="submit"
												label="Create Group"
												className="mt-2 btn-continue"
											/>
										</form>
									)}
								/>
							</div>
						</div>
					</div>
				</Row>
			</Col>
		</Container>
	);
}
