import React, { useState, useEffect } from "react";
import { getBooks } from "./../services/bookService";
import { getCustomers } from "./../services/customerService";
import SearchBarBorrowReturn from "./widgets/searchBarBorrowReturn";
import BorrowListGroup from "./BorrowListGroup";
import List from "./widgets/list";
import BorrowerListGroup from "./BorrowerListGroup";
import { toast } from "react-toastify";
import Button from "./widgets/button";
import { borrow } from "../services/borrowService";
import Modal from "./widgets/modal";
import Backdrop from "./widgets/backdrop";

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

	// Data
	const [data, setData] = useState({
		customerId: null,
		bookIds: [],
	});

	// Modal
	const [isModalOpen, setCloseModal] = useState(false);

	const modalStatus = (isModalTrue) => {
		setCloseModal(isModalTrue);
	};

	useEffect(() => {
		async function fetchCustomers() {
			const { data: customers } = await getCustomers();
			setCustomers(customers);
		}

		async function fetchBooks() {
			const { data: books } = await getBooks();
			setBooks(books);
		}
		fetchCustomers();
		fetchBooks();
	}, [selectedCustomer, selectedBook]);

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
		const { value } = e.currentTarget;

		const foundBook = books.find((b) => b.title === value);

		setSearchBook(value);
		setHoldBook(foundBook);
	};

	const handleClickBook = (book) => {
		setSearchBook(book.title);
		setHoldBook(book);
	};

	const handleBorrowedBook = () => {
		if (!holdBook) return toast("Book was not found!");

		const bookExists = selectedBook.find((book) => book._id === holdBook._id);

		if (bookExists) return toast("You cannot borrow the same book!");

		const addBook = [...selectedBook, holdBook];
		const bookIds = addBook.map((book) => book._id.toString());
		setData({ ...data, bookIds });
		setSelectedBook(addBook);
	};

	const handleInputChangeForCustomer = (e) => {
		const { value } = e.currentTarget;

		const foundCustomer = customers.find((c) => c.studentNumber === value);

		setSearchCustomer(value);
		setHoldCustomer(foundCustomer);
	};

	const handleClickCustomer = (customer) => {
		setSearchCustomer(customer.studentNumber);
		setHoldCustomer(customer);
	};

	const handleBorrower = () => {
		if (!holdCustomer) return toast("Customer was not found!");

		const borrower = [...selectedCustomer, holdCustomer];
		const customerId = borrower
			.map((customer) => customer._id.toString())
			.join();
		setData({ ...data, customerId });
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

	const resetFields = () => {
		setSearchBook("");
		setSearchCustomer("");
		setSelectedBook([]);
		setSelectedCustomer([]);
		setData({ customerId: null, bookIds: [] });
	};

	const handleBorrow = async () => {
		try {
			await borrow(data.customerId, data.bookIds);
			resetFields();
			setCloseModal(true);
		} catch (ex) {
			if (ex.response && ex.response.status === 400) {
				const errorMessage = ex.response.data;
				toast(errorMessage);
			}
		}
	};

	const { filteredBooks, filteredCustomer } = getSearchedData();

	const isSelectionEmpty =
		selectedBook.length === 0 || selectedCustomer.length === 0;
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
							onClick={handleBorrow}
							disabled={isSelectionEmpty}
							className={
								isSelectionEmpty
									? "bg-blue-500 px-7 text-white font-medium py-3 hover:bg-blue-700 rounded-lg mt-10 self-end cursor-not-allowed"
									: "bg-blue-500 px-7 text-white font-medium py-3 hover:bg-blue-700 rounded-lg mt-10 self-end"
							}>
							Borrow
						</Button>
						{isModalOpen && (
							<>
								<Modal
									paragraph={"Successfully borrowed"}
									modalStatus={() => modalStatus(false)}
								/>
								<Backdrop />
							</>
						)}
					</div>
				</div>
			</div>
			<div></div>
		</>
	);
}

export default Borrow;
