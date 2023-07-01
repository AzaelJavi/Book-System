import React, { useState, useEffect } from "react";
import { getBooks } from "./../services/bookService";
import { getCustomers } from "./../services/customerService";
import SearchBarBorrowReturn from "./widgets/searchBarBorrowReturn";
import BorrowListGroup from "./BorrowListGroup";
import List from "./widgets/list";
import BorrowerListGroup from "./BorrowerListGroup";
import { toast } from "react-toastify";
import Button from "./widgets/button";

function Borrow(props) {
	const [customers, setCustomers] = useState([]);
	const [books, setBooks] = useState([]);

	const [searchBook, setSearchBook] = useState("");
	const [searchCustomer, setSearchCustomer] = useState("");

	const [selectedCustomer, setSelectedCustomer] = useState([]);
	const [selectedBook, setSelectedBook] = useState([]);

	// Hold Value
	const [holdCustomer, setHoldCustomer] = useState(null);
	const [holdBook, setHoldBook] = useState(null);

	useEffect(() => {
		async function fetchCustomers() {
			const { data: customers } = await getCustomers();
			setCustomers(customers);
		} // Get by its ID

		async function fetchBooks() {
			const { data: books } = await getBooks();
			setBooks(books);
		}
		fetchCustomers();
		fetchBooks();
	}, [selectedCustomer, selectedBook]);

	// console.log("Bookos", books);
	const getSearchedData = () => {
		let filteredBooks = books;
		let filteredCustomer = customers;

		filteredBooks = books
			.filter((book) => {
				const title = book.title.toLowerCase();
				const searchTerm = searchBook.toLowerCase();

				return (
					searchBook && title.startsWith(searchTerm) && title !== searchTerm
				);
			})
			.slice(0, 5);

		filteredCustomer = customers
			.filter((customer) => {
				return (
					searchCustomer &&
					customer.studentNumber.startsWith(searchCustomer) &&
					customer.studentNumber !== searchCustomer
				);
			})
			.slice(0, 5);

		return { filteredBooks, filteredCustomer };
	};

	const handleInputChangeForBook = (e) => {
		setSearchBook(e.currentTarget.value);
	};

	const handleClickBook = (book) => {
		setSearchBook(book.title);
		setHoldBook(book);
		console.log("Book: ", book);
	};

	const handleBorrowedBook = () => {
		const bookExists = selectedBook.find((book) => book._id === holdBook._id);

		if (bookExists) return toast("You cannot borrow the same book!");

		const addBook = [...selectedBook, holdBook];
		setSelectedBook(addBook);
	};

	const handleInputChangeForCustomer = (e) => {
		console.log("Input changed: ", e.currentTarget.value);
		setSearchCustomer(e.currentTarget.value);
	};

	const handleClickCustomer = (customer) => {
		setSearchCustomer(customer.studentNumber);
		setHoldCustomer(customer);
		console.log("Customer: ", customer);
	};

	const handleBorrower = () => {
		const borrower = [...selectedCustomer, holdCustomer];
		setSelectedCustomer(borrower);
	};

	const handleRemoveBook = (removeItem) => {
		const removeBook = selectedBook.filter(
			(book) => book._id !== removeItem._id
		);

		setSelectedBook(removeBook);
	};

	const handleRemoveCustomer = (removeItem) => {
		const removeCustomer = selectedCustomer.filter(
			(customer) => customer._id !== removeItem._id
		);

		setSelectedCustomer(removeCustomer);
	};
	// console.log("Borrowed Books", borrowBooks);
	const { filteredBooks, filteredCustomer } = getSearchedData();

	return (
		<>
			<div className="flex flex-col items-center justify-center h-96">
				<SearchBarBorrowReturn
					label={"Search for Customer"}
					data={filteredCustomer}
					value={searchCustomer}
					onClickItem={handleClickCustomer}
					onEnterItem={handleBorrower}
					onInputChange={handleInputChangeForCustomer}
					setValue={setSearchCustomer}
					itemProperty={"studentNumber"}
					borrower={selectedCustomer}
				/>
				<SearchBarBorrowReturn
					label={"Search for Book"}
					data={filteredBooks}
					value={searchBook}
					onClickItem={handleClickBook}
					onEnterItem={handleBorrowedBook}
					onInputChange={handleInputChangeForBook}
					setValue={setSearchBook}
					itemProperty={"title"}
					borrowBooks={selectedBook}
				/>
			</div>
			<div className="flex flex-row justify-center items-center h-80 mt-32 lg:mt-20">
				<div className="flex flex-col lg:flex-row">
					<div className="lg:mr-7">
						<h2 className="mt-5 mb-2 font-semibold">Borrower:</h2>
						{selectedCustomer.length > 0 ? (
							<BorrowerListGroup
								borrower={selectedCustomer}
								onRemoveItem={handleRemoveCustomer}
							/>
						) : (
							<p>No borrower yet.</p>
						)}
					</div>
					<div className="mt-5 flex flex-col">
						<h2 className="mb-2 font-semibold">Book(s):</h2>
						{selectedBook.length > 0 ? (
							<BorrowListGroup
								borrowBooks={selectedBook}
								onRemoveItem={handleRemoveBook}
							/>
						) : (
							<p>No books borrowed yet.</p>
						)}
						<Button
							className={
								"bg-blue-500 px-7 text-white font-medium py-2.5 hover:bg-blue-700 rounded-lg mt-10 self-end"
							}>
							Borrow
						</Button>
					</div>
				</div>
			</div>
			<div></div>
		</>
	);
}

export default Borrow;
