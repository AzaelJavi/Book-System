import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDepartments } from "../services/departmentService";
import { getBook } from "../services/bookService";
import { saveBook } from "./../services/bookService";
import useForm from "./widgets/useForm";
import Button from "./widgets/button";
import Joi from "joi-browser";

function BooksForm(props) {
	const { id } = useParams();
	const navigate = useNavigate();

	// Schema
	const schemaJoi = {
		_id: Joi.string(),
		title: Joi.string().required().label("Title"),
		author: Joi.string().required().label("Author"),
		departmentId: Joi.string().required().label("Department"),
		bookNumber: Joi.number().min(0).max(2000).required().label("Book Number"),
		numberInStock: Joi.number()
			.min(0)
			.max(50)
			.required()
			.label("Number in Stock"),
	};

	const [departments, setDepartment] = useState([]);

	// State
	const [data, setData] = useState({
		title: "",
		author: "",
		departmentId: "",
		bookNumber: "",
		numberInStock: "",
	});

	const mapToViewModel = (book) => {
		return {
			_id: book._id,
			title: book.title,
			author: book.author,
			departmentId: book.department._id,
			bookNumber: book.bookNumber,
			numberInStock: book.numberInStock,
		};
	};

	// Populate
	useEffect(() => {
		async function populateDepartments() {
			const { data: departments } = await getDepartments();
			setDepartment(departments);
		}

		async function populateBooks() {
			try {
				if (id === "new") return;

				const { data: book } = await getBook(id);
				// console.log("Book data received: ", book);
				setData(mapToViewModel(book));
			} catch (ex) {
				// console.error("Error in populateBooks(): ", ex);
				if (ex.response && ex.response.status === 404)
					return navigate("/not-found");
			}
		}

		populateDepartments();
		populateBooks();
	}, [id, navigate]);

	const doSubmit = async () => {
		await saveBook(data);

		navigate("/books");
	};

	const { renderInput, renderSelect, handleSubmit } = useForm({
		schemaJoi,
		doSubmit,
		data,
		setData,
	});

	const btnClassName =
		"bg-blue-500 px-7 text-white font-medium py-2.5 hover:bg-blue-700 rounded-lg";

	return (
		<div className="m-10 w-auto">
			<h1 className="text-4xl font-medium mb-5">Book Form</h1>
			<form onSubmit={handleSubmit}>
				{renderInput("title", "Title")}
				{renderInput("author", "Author")}
				{renderSelect("departmentId", "Department", departments)}
				{renderInput("bookNumber", "Book Number", "number")}
				{renderInput("numberInStock", "Number in Stock", "number")}
				<Button className={btnClassName}>Save</Button>
			</form>
		</div>
	);
}

export default BooksForm;
