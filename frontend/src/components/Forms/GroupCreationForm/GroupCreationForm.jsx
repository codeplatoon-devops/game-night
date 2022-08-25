import { Field } from "react-final-form";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { classNames } from "primereact/utils";
import { Form } from "react-final-form";
import { Row, Col, Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./GroupCreationForm.css";

export default function GroupCreationForm() {
	const [showMessage, setShowMessage] = useState(false);
	const [showForm, setShowForm] = useState(false);
	const [groupName, setGroupName] = useState("");
	const [groupInformation, setGroupInformation] = useState(null);
	const [groupCode, setGroupCode] = useState(null);
	const navigate = useNavigate();
	const validate = () => {
		let errors = {};
		if (!groupName) {
			errors.groupname = "Event name is required.";
		}
		return errors;
	};
	const onSubmit = (form) => {
		setShowForm(false);
		createGroup(groupName);
		setShowMessage(true);
	};

	// hardcoded to group '1' for now
	// TODO: update redirect to group code when generated
	const onAck = () => {
		setShowMessage(false);
		// navigate("/groups/1");
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

	const createGroup = function (name) {
		let code = groupCode;
		axios
			.post("/group/create", { name: name, code: code })
			.then((response) => {
				console.log("create group response.data", response.data);
				if (response.data.success == "True") {
					window.alert(
						`Group created! Your group code has been assigned ${groupCode}`
					);
					// CreateChannel(name, code)
					setGroupInformation([name, code]);
					viewGroups();
					// nav('/groups')
					// window.location.reload()
					// the reload is messing with the chatrooms
				} else {
					window.alert(`${response.data.reason}`);
				}
			});
	};
	const viewGroups = function () {
		axios.get("/groups/view").then((response) => {
			console.log("view groups response.data", response.data);
			if (response.data.success == "True") {
				let new_groups =
					response && response.data && response.data.groups;
				setGroups(new_groups);
			} else {
			}
		});
	};
	const getGroupCode = function () {
		axios.get("/group/code").then((response) => {
			console.log(
				"get group code response.data.group_code",
				response.data.group_code
			);
			let code = response && response.data && response.data.group_code;
			setGroupCode(code);
		});
	};
	useEffect(() => {
		getGroupCode();
		viewGroups();
	}, []);
	return (
		<Container>
			<Button
				label="Create Group"
				onClick={() => setShowForm(true)}
				icon="pi pi-plus"
				style={{ margin: "15px" }}
			/>
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
			<Dialog
				visible={showForm}
				onHide={() => setShowForm(false)}
				showHeader={true}
			>
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
															value={groupName}
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
													{getFormErrorMessage(meta)}
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
			</Dialog>
		</Container>
	);
}
