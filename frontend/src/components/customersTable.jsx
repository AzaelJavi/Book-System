import React from "react";
import Table from "./common/table";
import { Link } from "react-router-dom";

function CustomersTable({ customers, sortColumn, onDeleteCustomer, onSort }) {
	const column = [
		{
			path: "name",
			label: "Name",
			content: (customer) => (
				<Link
					className="underline text-blue-600"
					to={`/customers/${customer._id}`}>
					{customer.name}
				</Link>
			),
			sort: true,
		},
		{ path: "studentNumber", label: "Student Number", sort: true },
		{ path: "address", label: "Address", sort: true },
		{ path: "email", label: "Email" },
		{ path: "phone", label: "Phone" },
		{ path: "books", label: "Books Status" },
		{
			key: "delete",
			content: (customer) => (
				<button
					className="bg-red-600 text-white uppercase font-medium rounded-md py-3 px-5"
					onClick={() => onDeleteCustomer(customer)}>
					Delete
				</button>
			),
		},
	];

	return (
		<React.Fragment>
			<Table
				columns={column}
				data={customers}
				sortColumn={sortColumn}
				onSort={onSort}
			/>
		</React.Fragment>
	);
}

export default CustomersTable;
