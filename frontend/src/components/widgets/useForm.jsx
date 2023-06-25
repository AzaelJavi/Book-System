import React, { useState } from "react";
import Joi from "joi-browser";
import Select from "./select";
import Input from "./input";

function useForm({ schemaJoi, doSubmit, data, setData }) {
	const [error, setError] = useState({});

	const validate = () => {
		const option = { abortEarly: false };
		const { error } = Joi.validate(data, schemaJoi, option);
		if (!error) return null;

		const errors = {}; // to map the error into object
		for (let item of error.details) errors[item.path[0]] = item.message;
		return errors;
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const validationErrors = validate();
		setError(validationErrors || {});
		if (validationErrors) return;
		doSubmit();
	};

	const validateProperty = ({ name, value }) => {
		const obj = { [name]: value };
		const schema = { [name]: schemaJoi[name] };
		const { error } = Joi.validate(obj, schema);
		return error ? error.details[0].message : null;
	};

	const handleChange = ({ currentTarget: input }) => {
		const newError = { ...error };
		const errorMessage = validateProperty(input);
		if (errorMessage) newError[input.name] = errorMessage;
		else delete newError[input.name];

		const newData = { ...data };
		newData[input.name] = input.value;
		setData(newData);
		setError(newError);
	};

	const renderInput = (name, label, isReadOnly, type = "text") => {
		return (
			<Input
				type={type}
				name={name}
				label={label}
				isReadOnly={isReadOnly}
				value={data[name]}
				error={error[name]}
				onChange={handleChange}
			/>
		);
	};

	const renderSelect = (name, label, options) => {
		return (
			<Select
				name={name}
				label={label}
				options={options}
				value={data[name]}
				error={error[name]}
				onChange={handleChange}
			/>
		);
	};

	return {
		renderSelect,
		renderInput,
		handleChange,
		validate,
		validateProperty,
		handleSubmit,
		error,
		setError,
	};
}

export default useForm;
