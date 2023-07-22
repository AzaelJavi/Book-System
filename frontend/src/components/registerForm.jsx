import React, { useState } from "react";
import Joi from "joi-browser";
import { register } from "../services/userService";
import auth from "../services/authService";
import useForm from "./widgets/useForm";
import Button from "./widgets/button";

function RegisterForm(props) {
	const [data, setData] = useState({
		email: "",
		username: "",
		password: "",
	});

	const schemaJoi = {
		email: Joi.string().email().min(3).max(50).label("Email"),
		username: Joi.string().min(3).max(50).label("Username"),
		password: Joi.string().min(8).max(50).label("Password"),
	};

	const doSubmit = async () => {
		try {
			const { headers } = await register(data);
			auth.loginWithJwt(headers["x-auth-token"]);
			window.location = "/";
		} catch (ex) {
			if (ex.response && ex.response.status === 400) {
				const errors = { ...error };
				errors.email = ex.response.data;
				setError(errors);
			}
		}
	};
	const { renderInput, handleSubmit, error, setError } = useForm({
		schemaJoi,
		doSubmit,
		data,
		setData,
	});

	const btnClassName =
		"bg-blue-500 px-7 text-white font-medium py-2.5 hover:bg-blue-700 rounded-lg mt-2";

	return (
		<div className="m-10 w-auto">
			<h1 className="text-4xl font-medium mb-5">Register Form</h1>
			<form onSubmit={handleSubmit}>
				{renderInput("email", "Email")}
				{renderInput("username", "Username")}
				{renderInput("password", "Password", false, "password")}
				<Button className={btnClassName}>Submit</Button>
			</form>
		</div>
	);
}

export default RegisterForm;
