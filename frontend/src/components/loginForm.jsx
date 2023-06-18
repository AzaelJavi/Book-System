import React, { useState } from "react";
import Joi from "joi-browser";
import useForm from "./common/useForm";
import { useNavigate, useLocation } from "react-router-dom";
import auth from "../services/authService";

function LoginForm(props) {
	const location = useLocation();

	// console.log("Locations", location);
	// const { location } = props;
	// console.log("Props", location);
	const schemaJoi = {
		email: Joi.string().email().min(3).max(50).label("Email"),
		password: Joi.string().min(8).max(50).label("Password"),
	};

	const [data, setData] = useState({
		email: "",
		password: "",
	});

	const doSubmit = async () => {
		try {
			await auth.login(data.email, data.password);

			// const state = locations.state;
			// window.location = state ? state.from.pathname : "/"; //This is connected to Protected Route
		} catch (ex) {
			console.log("Exx", ex);
			if (ex.response && ex.response.status === 400) {
				const errors = { ...error };
				errors.email = ex.response.data;
				errors.password = ex.response.data;
				setError(errors);
				console.log("errors", errors);
			}
		}
	};

	const { renderInput, renderButton, handleSubmit, error, setError } = useForm({
		schemaJoi,
		doSubmit,
		data,
		setData,
	});

	return (
		<div className="m-10 w-auto">
			<h1 className="text-4xl font-medium mb-5">Login Form</h1>
			<form onSubmit={handleSubmit}>
				{renderInput("email", "Email")}
				{renderInput("password", "Password", false, "password")}
				{renderButton("Login")}
			</form>
		</div>
	);
}

export default LoginForm;
