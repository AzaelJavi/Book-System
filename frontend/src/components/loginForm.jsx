import React, { useState } from "react";
import Joi from "joi-browser";
import { useLocation, Navigate } from "react-router-dom";
import useForm from "./widgets/useForm";
import Button from "./widgets/button";
import auth from "../services/authService";

function LoginForm(props) {
	const location = useLocation();

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

			const state = location.state;
			window.location = state ? state.from : "/"; //This is connected to Protected Route
		} catch (ex) {
			if (ex.response && ex.response.status === 400) {
				const errors = { ...error };
				errors.email = ex.response.data;
				errors.password = ex.response.data;
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
			<h1 className="text-4xl font-medium mb-5">Login Form</h1>
			<form onSubmit={handleSubmit}>
				{renderInput("email", "Email")}
				{renderInput("password", "Password", false, "password")}
				<Button className={btnClassName}>Login</Button>
			</form>
		</div>
	);
}

export default LoginForm;
