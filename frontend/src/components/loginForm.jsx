import React, { useState } from "react";
import Joi from "joi-browser";
import useForm from "./common/useForm";
import { useNavigate } from "react-router-dom";

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

	const doSubmit = () => {
		navigate("/books");
	};

	const { renderInput, renderButton, handleSubmit } = useForm({
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
