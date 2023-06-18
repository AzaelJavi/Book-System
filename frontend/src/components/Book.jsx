import React, { useState, useEffect } from "react";
import BooksTable from "./booksTable";
import { getDepartments } from "../services/departmentService";
import ListGroup from "./common/listGroup";
import { Link } from "react-router-dom";
import { getBooks, deleteBooks } from "../services/bookService";
import { toast } from "react-toastify";
import Pagination from "./common/pagination";
import { paginate } from "./../utils/paginate";
import _ from "lodash";
import SearchBar from "./common/searchBar";

function Books({ user }) {
	const [departments, setDepartment] = useState([]);
	const [allBooks, setBook] = useState([]);

	// List
	const [selectedDepartment, setselectedDepartment] = useState(null);
	const [sortColumn, setSortColumn] = useState({
		path: "title",
		order: "asc",
	});

	//Search
	const [searchQuery, setSearchQuery] = useState("");

	// Pagination
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(5);
	const [pageNumberLimit, setPageNumberLimit] = useState(5);
	const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
	const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

	useEffect(() => {
		async function fetchDepartment() {
			const { data } = await getDepartments();
			const department = [{ _id: "", name: "All Departments" }, ...data];
			setDepartment(department);
		}

		async function fetchBook() {
			const { data } = await getBooks();
			setBook(data);
		}
		fetchDepartment();
		fetchBook();
	}, []);

	// console.log("department", departments);
	const getPageData = () => {
		let filtered = allBooks;

		if (searchQuery)
			filtered = allBooks.filter((v) =>
				v.title.toLowerCase().includes(searchQuery.toLowerCase())
			);
		else if (selectedDepartment && selectedDepartment._id) {
			filtered = allBooks.filter(
				(v) => v.department._id === selectedDepartment._id
			);
		}
		const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
		const books = paginate(sorted, currentPage, itemsPerPage);

		return { totalCount: filtered.length, data: books };
	};

	const handleListClick = (department) => {
		// console.log(department);
		setselectedDepartment(department);
		setCurrentPage(1);
		setMaxPageNumberLimit(5);
		setMinPageNumberLimit(0);
	};

	const handlePage = (page) => {
		setCurrentPage(page);
	};

	const handleDeleteBook = async (book) => {
		const originalBooks = [...allBooks];
		const booksFiltered = allBooks.filter((v) => v._id !== book._id);
		setBook(booksFiltered);

		try {
			await deleteBooks(book._id);
		} catch (error) {
			if (error.response && error.response.status === 404)
				toast("This book ID has already been deleted.");

			setBook(originalBooks);
		}
	};

	const handleSort = (sortColumn) => {
		setSortColumn(sortColumn);
	};

	const handleSearch = (query) => {
		setSearchQuery(query);
		setselectedDepartment(null);
		setCurrentPage(1);
		setMaxPageNumberLimit(5);
		setMinPageNumberLimit(0);
	};
	const { totalCount, data: books } = getPageData();

	return (
		<React.Fragment>
			<div className="flex flex-col gap-8 mt-10 xl:flex-row items-center ">
				<div className="xl:self-start xl:ml-5">
					<ListGroup
						data={departments}
						onSelectedDepartment={handleListClick}
						selectedDepartment={selectedDepartment}
					/>
				</div>
				<div className="w-full flex-col">
					{user && user.isAdmin ? (
						<div>
							<Link
								to="/books/new"
								className="bg-blue-500 sm:mx-6 inline-block hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
								New Book
							</Link>
						</div>
					) : null}
					<div>
						{allBooks.length === 0 ? (
							<p className="my-2 sm:mx-6">
								{" "}
								There are no books in the database
							</p>
						) : (
							<p className="my-2 sm:mx-6">
								Showing {totalCount} books in database
							</p>
						)}
					</div>

					<SearchBar value={searchQuery} onSearch={handleSearch} />

					<div className="inline-block w-full py-2 sm:px-6 lg:px-6 overflow-x-auto">
						<div className="md:inline-block min-w-full">
							<BooksTable
								onDeleteBook={handleDeleteBook}
								books={books}
								onSort={handleSort}
								sortColumn={sortColumn}
							/>
						</div>
					</div>
					<Pagination
						currentPage={currentPage}
						setCurrentPage={setCurrentPage}
						itemCount={totalCount}
						itemsPerPage={itemsPerPage}
						onPageClick={handlePage}
						maxPageNumberLimit={maxPageNumberLimit}
						setMaxPageNumberLimit={setMaxPageNumberLimit}
						pageNumberLimit={pageNumberLimit}
						minPageNumberLimit={minPageNumberLimit}
						setMinPageNumberLimit={setMinPageNumberLimit}
					/>
				</div>
			</div>
		</React.Fragment>
	);
}

export default Books;
