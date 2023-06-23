import React, { useState, useEffect } from "react";
import { getCustomers } from "../services/customerService";

function Borrow(props) {
	const [customers, setCustomers] = useState([]);

	useEffect(() => {
		async function fetchCustomer() {
			const { data: customers } = await getCustomers();
			setCustomers(customers);
		}

		fetchCustomer();
	}, []);

	return (
		<table>
			<thead>
				<tr>
					<th>Customer Name</th>
					<th>Title</th>
					<th>Author</th>
					<th>Number in Stock</th>
				</tr>
			</thead>
			<tbody>
				{customers.map((customer) =>
					customer.books.map((book) => (
						<tr key={book._id}>
							<td>{customer.name}</td>
							<td>{book.title}</td>
							<td>{book.author}</td>
							<td>{book.numberInStock}</td>
						</tr>
					))
				)}
			</tbody>
		</table>
	);
}

export default Borrow;
