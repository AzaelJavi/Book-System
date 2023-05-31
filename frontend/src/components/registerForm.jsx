import React, { useState } from "react";
import Joi from "joi-browser";
import useForm from "./common/useForm";
import { useNavigate } from "react-router-dom";
function RegisterForm(props) {
	const navigate = useNavigate();

	const [data, setData] = useState({
		email: "",
		name: "",
		password: "",
	});

	const schemaJoi = {
		email: Joi.string().email().min(3).max(50).label("Email"),
		name: Joi.string().min(3).max(50).label("Name"),
		password: Joi.string().min(8).max(50).label("Password"),
	};

	const doSubmit = () => {
		navigate("/");
	};
	const { renderInput, handleSubmit, renderButton } = useForm({
		schemaJoi,
		doSubmit,
		data,
		setData,
	});
	return (
		<div className="m-10 w-auto">
			<h1 className="text-4xl font-medium mb-5">Register Form</h1>
			<form onSubmit={handleSubmit}>
				{renderInput("email", "Email")}
				{renderInput("name", "Name")}
				{renderInput("password", "Password", false, "password")}
				{renderButton("Submit")}
			</form>
		</div>
	);
}

export default RegisterForm;
