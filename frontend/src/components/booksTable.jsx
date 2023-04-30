import React from "react";
import Table from "./common/table";

function BooksTable({ books, onDeleteBook }) {
	const columns = [
		{ path: "title", label: "Title" },
		{ path: "author", label: "Author" },
		{ path: "department.name", label: "Department" },
		{ path: "bookNumber", label: "Book Number" },
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
			<Table columns={columns} data={books} />
		</React.Fragment>
	);
}

export default BooksTable;
