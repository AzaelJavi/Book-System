import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./widgets/searchBarBookCustomer";
import Pagination from "./widgets/pagination";
import { deleteCustomer, getCustomers } from "../services/customerService";
import CustomersTable from "./customersTable";
import { paginate } from "../utils/paginate";
import _ from "lodash";
import { toast } from "react-toastify";

function Customer({ user }) {
	const [allCustomers, setCustomers] = useState([]);

	// Sorting
	const [sortColumn, setSortColumn] = useState({
		path: "name",
		order: "asc",
	});

	// Search
	const [searchQuery, setSearchQuery] = useState("");

	// Pagination
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(5);
	const [pageNumberLimit, setPageNumberLimit] = useState(5);
	const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
	const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

	useEffect(() => {
		async function fetchCustomer() {
			const { data } = await getCustomers();
			setCustomers(data);
		}

		fetchCustomer();
	}, []);

	const getPageData = () => {
		let filtered = allCustomers;
		if (searchQuery) {
			filtered = allCustomers.filter((v) =>
				v.name.toLowerCase().includes(searchQuery.toLowerCase())
			);
		}
		const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
		const customers = paginate(sorted, currentPage, itemsPerPage);

		return { totalCount: filtered.length, data: customers };
	};

	const handleDeleteCustomer = async (customer) => {
		let originalCustomer = [...allCustomers];

		const customersFiltered = allCustomers.filter(
			(v) => v._id !== customer._id
		);
		setCustomers(customersFiltered);

		try {
			await deleteCustomer(customer._id);
		} catch (error) {
			if (error.response && error.response.status === 404)
				toast("This customer ID has already been deleted.");

			setCustomers(originalCustomer);
		}
	};

	const handleSort = (sortColumn) => {
		setSortColumn(sortColumn);
	};

	const handleSearch = (query) => {
		setSearchQuery(query);
		setCurrentPage(1);
		setMaxPageNumberLimit(5);
		setMinPageNumberLimit(0);
	};

	const handlePage = (page) => {
		setCurrentPage(page);
	};
	const { totalCount, data: customers } = getPageData();
	return (
		<React.Fragment>
			<div className="flex flex-col gap-8 mt-10 xl:flex-row items-center ">
				<div className="w-full flex-col">
					{user && user.isAdmin ? (
						<div>
							<Link
								to="/customers/new"
								className="bg-blue-500 sm:mx-6 inline-block hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
								New Customer
							</Link>
						</div>
					) : null}
					<div>
						{totalCount === 0 ? (
							<p className="my-2 sm:mx-6">
								{" "}
								There are no books in the database
							</p>
						) : (
							<p className="my-2 sm:mx-6">
								Showing {totalCount} customers in database
							</p>
						)}
					</div>

					<SearchBar
						value={searchQuery}
						setValue={setSearchQuery}
						onSearch={handleSearch}
					/>

					<div className="inline-block w-full py-2 sm:px-6 lg:px-6 overflow-x-auto">
						<div className="md:inline-block min-w-full">
							<CustomersTable
								onDeleteCustomer={handleDeleteCustomer}
								customers={customers}
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

export default Customer;
