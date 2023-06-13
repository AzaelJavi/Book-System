import React, { useState } from "react";
import Joi from "joi-browser";
import useForm from "./common/useForm";
import { useNavigate } from "react-router-dom";
import auth from "../services/authService";

function LoginForm(props) {
	const navigate = useNavigate();

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

			const { state } = props.location;
			window.location = state ? state.from.pathname : "/";
			console.log("state", state);
			console.log("Props", props);
		} catch (ex) {
			if (ex.response && ex.reponse.data === 400) {
				const errors = { ...error };
				errors.email = ex.response.data;
				setError({ errors });
			}
		}
		// navigate("/books");
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
