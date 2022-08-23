import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Field } from "react-final-form";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { classNames } from "primereact/utils";
import { Divider } from "primereact/divider";
import "./LogInForm.css";
import { Container, Row, Col } from "react-bootstrap";
// regular axios gave me an error: https://stackoverflow.com/questions/65900822/import-axios-causes-problems-in-vue-v3-and-vite
import axios from 'axios'

export const LoginForm = () => {
	const [formData, setFormData] = useState({});
	const navigate = useNavigate();

	const validate = (data) => {
		let errors = {};
		if (!data.email) {
			errors.email = "Email is required.";
		} else if (
			!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)
		) {
			errors.email = "Invalid email address. E.g. example@email.com";
		}
		if (!data.password) {
			errors.password = "Password is required.";
		}
		return errors;
	};

	const onSubmit = (data, form) => {
		// do we need to set the formdata or just send it to the server? can we pass in event to prevent default?
		setFormData(data);
		// event.preventDefault();
		axios.put('/login',data).then((response) => {
			console.log('YOU ARE IN THE REACT .THEN RESPONSE FROM LOGIN', response)
			if (response.data.success==='False') {
				window.alert(response.data.reason)
			}
			else {
				
				// navigate to home on login
				navigate("/");
				// clear form
				form.restart();
			}
			})
	};

	const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
	const getFormErrorMessage = (meta) => {
		return (
			isFormFieldValid(meta) && (
				<small className="p-error">{meta.error}</small>
			)
		);
	};

	const handleClick = () => {
		navigate("/signup");
	};

	return (
		<Container as={Row}>
			<Col></Col>
			<Col xs={5}>
				<Row>
					<div className="form-login">
						<div className="flex justify-content-center">
							<div className="card">
								<h2 className="text-center">Log in</h2>
								<Form
									onSubmit={onSubmit}
									initialValues={{
										email: "",
										password: "",
									}}
									validate={validate}
									render={({ handleSubmit }) => (
										<form
											onSubmit={handleSubmit}
											className="p-fluid"
										>
											<Field
												name="email"
												render={({ input, meta }) => (
													<div className="field">
														<span className="p-float-label p-input-icon-right">
															<i className="pi pi-envelope" />
															<InputText
																id="email"
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
																htmlFor="email"
																className={classNames(
																	{
																		"p-error":
																			isFormFieldValid(
																				meta
																			),
																	}
																)}
															>
																Email*
															</label>
														</span>
														{getFormErrorMessage(
															meta
														)}
													</div>
												)}
											/>
											<Field
												name="password"
												render={({ input, meta }) => (
													<div className="field">
														<span className="p-float-label">
															<Password
																id="password"
																{...input}
																toggleMask
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
																htmlFor="password"
																className={classNames(
																	{
																		"p-error":
																			isFormFieldValid(
																				meta
																			),
																	}
																)}
															>
																Password*
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
												label="Log In"
												className="mt-2 btn-continue"
											/>
										</form>
									)}
								/>
								<Divider
									className="form-login-divider"
									align="center"
								>
									Or
								</Divider>
								<Button
									onClick={handleClick}
									className="text-center"
									label="Sign Up"
								/>
							</div>
						</div>
					</div>
				</Row>
			</Col>
			<Col></Col>
		</Container>
	);
};
