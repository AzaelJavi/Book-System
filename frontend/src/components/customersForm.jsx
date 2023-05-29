import React, { useEffect, useState } from "react";
import useForm from "./common/useForm";
import { getCustomer, saveCustomer } from "../services/customerService";
import { useNavigate, useParams } from "react-router-dom";
import Joi from "joi-browser";

function CustomersForm(props) {
	const { id } = useParams();
	const navigate = useNavigate();

	const [data, setData] = useState({
		name: "",
		studentNumber: "",
		address: "",
		email: "",
		phone: "",
	});

	if (data.studentNumber.length === 4) {
		data.studentNumber += "-";
	}
	useEffect(() => {
		async function populateCustomers() {
			try {
				if (id === "new") return;

				const { data: customer } = await getCustomer(id);
				setData(mapToViewModel(customer));
			} catch (ex) {
				if (ex.response && ex.response.status === 404)
					return navigate("/not-found");
			}
		}

		populateCustomers();
	}, [id, navigate]);

	const mapToViewModel = (customer) => {
		return {
			_id: customer._id,
			name: customer.name,
			studentNumber: customer.studentNumber,
			address: customer.address,
			email: customer.email,
			phone: customer.phone,
		};
	};

	const schemaJoi = {
		_id: Joi.string(),
		name: Joi.string().required().min(3).max(100).label("Name"),
		studentNumber: Joi.string().length(9).required().label("Student Number"),
		address: Joi.string().min(3).max(100).required().label("Address"),
		email: Joi.string().required().email().label("Email"),
		phone: Joi.string().required().min(3).max(11).label("Phone Number"),
	};

	const doSubmit = async () => {
		await saveCustomer(data);

		navigate("/customers");
	};
	const { renderInput, renderButton, handleSubmit } = useForm({
		data,
		setData,
		doSubmit,
		schemaJoi,
	});

	return (
		<div className="m-10 w-auto">
			<h1 className="text-4xl font-medium mb-5">Customer Form</h1>
			<form onSubmit={handleSubmit}>
				{renderInput("name", "Name")}
				{renderInput("studentNumber", "Student Number", "text", true)}
				{renderInput("address", "Address")}
				{renderInput("email", "Email", "text", true)}
				{renderInput("phone", "Phone Number")}
				{renderButton("Save")}
			</form>
		</div>
	);
}

export default CustomersForm;
