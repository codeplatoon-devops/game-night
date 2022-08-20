import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Field } from "react-final-form";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { classNames } from "primereact/utils";
import { Divider } from "primereact/divider";
import "./LogInForm.css";

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
		setFormData(data);
		// navigate to home on login
		navigate("/");
		// clear form
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

	const passwordHeader = <h6>Pick a password</h6>;
	const passwordFooter = (
		<React.Fragment>
			<Divider />
			<p className="mt-2">Suggestions</p>
			<ul className="pl-2 ml-2 mt-0" style={{ lineHeight: "1.5" }}>
				<li>At least one lowercase</li>
				<li>At least one uppercase</li>
				<li>At least one numeric</li>
				<li>Minimum 8 characters</li>
			</ul>
		</React.Fragment>
	);

	return (
		<div className="form-signup">
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
							<form onSubmit={handleSubmit} className="p-fluid">
								<Field
									name="email"
									render={({ input, meta }) => (
										<div className="field">
											<span className="p-float-label p-input-icon-right">
												<i className="pi pi-envelope" />
												<InputText
													id="email"
													{...input}
													className={classNames({
														"p-invalid":
															isFormFieldValid(
																meta
															),
													})}
												/>
												<label
													htmlFor="email"
													className={classNames({
														"p-error":
															isFormFieldValid(
																meta
															),
													})}
												>
													Email*
												</label>
											</span>
											{getFormErrorMessage(meta)}
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
													className={classNames({
														"p-invalid":
															isFormFieldValid(
																meta
															),
													})}
													header={passwordHeader}
													footer={passwordFooter}
												/>
												<label
													htmlFor="password"
													className={classNames({
														"p-error":
															isFormFieldValid(
																meta
															),
													})}
												>
													Password*
												</label>
											</span>
											{getFormErrorMessage(meta)}
										</div>
									)}
								/>
								<Button
									type="submit"
									label="Continue"
									className="mt-2"
								/>
							</form>
						)}
					/>
				</div>
			</div>
		</div>
	);
};
