import React from "react";
import Table from "./widgets/table";
import { Link } from "react-router-dom";
import useCurrentUser from "./hooks/useCurrentUser";

function BooksTable({ books, onDeleteBook, onSort, sortColumn }) {
	const columns = [
		{
			path: "title",
			label: "Title",
			sort: true,
			content: (book) => (
				<Link className="underline text-blue-600" to={`/books/${book._id}`}>
					{book.title}
				</Link>
			),
		},
		{ path: "author", label: "Author", sort: true },
		{ path: "department.department", label: "Department" },
		{ path: "bookNumber", label: "Book Number", sort: true },
		{ path: "numberInStock", label: "Stock" },
	];

	const showDeleteButton = {
		key: "delete",
		content: (book) => (
			<button
				className="bg-red-600 text-white uppercase font-medium rounded-md py-3 px-5"
				onClick={() => onDeleteBook(book)}>
				Delete
			</button>
		),
	};

	const user = useCurrentUser();
	if (user && user.isAdmin) columns.push(showDeleteButton);
	return (
		<React.Fragment>
			<Table
				columns={columns}
				sortColumn={sortColumn}
				onSort={onSort}
				data={books}
			/>
		</React.Fragment>
	);
}

export default BooksTable;
