import React from "react";
import Table from "./common/table";

function BooksTable({ books, onDeleteBook, onSort, sortColumn }) {
	const columns = [
		{ path: "title", label: "Title", sort: true },
		{ path: "author", label: "Author", sort: true },
		{ path: "department.name", label: "Department" },
		{ path: "bookNumber", label: "Book Number", sort: true },
		{ path: "numberInStock", label: "Stock" },
		{
			key: "delete",
			content: (book) => (
				<button
					className="bg-red-600 text-white uppercase font-medium rounded-md py-3 px-5"
					onClick={() => onDeleteBook(book)}>
					Delete
				</button>
			),
		},
	];

	// const showDeleteButton = {
	// 	key: "delete",
	// 	content: (book) => <button onClick={() => onDeleteBook(book)}></button>,
	// };

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
