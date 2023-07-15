import React, { useEffect, useState } from "react";
import Input from "./widgets/input";
import { getCustomer, getCustomers } from "../services/customerService";
import SearchBarBorrowReturn from "./widgets/searchBarBorrowReturn";
import Backdrop from "./widgets/backdrop";
import Modal from "./widgets/modal";
import { toast } from "react-toastify";
import Button from "./widgets/button";
import { returnBook } from "../services/returnService";

function Return(props) {
	const [customers, setCustomers] = useState([]);
	const [customerId, setCustomerId] = useState(null);

	const [searchCustomer, setSearchCustomer] = useState("");
	const [holdData, setHoldData] = useState(null);

	//Modal
	const [isModalOpen, setCloseModal] = useState(false);
	const [modalParagraph, setModalParagraph] = useState("");

	const showModal = (isModalTrue, paragraph) => {
		setCloseModal(isModalTrue);
		setModalParagraph(paragraph);
	};

	useEffect(() => {
		async function fetchCustomers() {
			const { data: customers } = await getCustomers();
			setCustomers(customers);
		}
		fetchCustomers();
	}, []);

	const filteredCustomer = customers.filter((customer) => {
		return (
			searchCustomer &&
			customer.studentNumber.startsWith(searchCustomer) &&
			customer.studentNumber !== searchCustomer
		);
	});

	const handleInputChangeForCustomer = (e) => {
		const { value } = e.currentTarget;

		const foundCustomer = customers.find((c) => c.studentNumber === value);

		setSearchCustomer(value);
		setHoldData(foundCustomer);
	};

	const handleClickCustomer = (customer) => {
		setSearchCustomer(customer.studentNumber);
		setHoldData(customer);
	};

	const handleFetchCustomer = async (customer) => {
		const paragraph = `Successfully retrieved ${
			holdData && holdData.books.length
		} transactions for customer ${customer.name}.`;

		showModal(true, paragraph);

		try {
			const { data } = await getCustomer(customer._id);
			setCustomerId(data);
		} catch (ex) {
			if (ex.response && ex.response.status === 404) {
				const errorMessage = ex.response.data;
				toast(errorMessage);
			}
		}
	};

	const handleReturnBook = async (book) => {
		let copyOriginal = customerId.books;
		const paragraph = `Successfully returned the book "${book.title}"`;
		try {
			copyOriginal = customerId.books.filter((v) => v._id !== book._id);
			await returnBook(customerId._id, book._id);
			showModal(true, paragraph);
			setCustomerId((prevData) => ({
				...prevData,
				books: copyOriginal,
			}));
		} catch (ex) {
			if (ex.response && ex.response.status === 404) {
				setCustomerId(copyOriginal);
				const errorMessage = ex.response.data;
				toast(errorMessage);
			}
		}
	};

	if (!searchCustomer && customerId) {
		setCustomerId(null);
	}
	return (
		<>
			<div className="w-full mt-5 flex flex-col xl:flex-row justify-between items-center">
				<div className="w-auto h-40 my-5 lg:ml-60">
					<SearchBarBorrowReturn
						label={"Search for Customer"}
						data={filteredCustomer}
						value={searchCustomer}
						onClickItem={handleClickCustomer}
						onEnterItem={() => handleFetchCustomer(holdData)}
						onInputChange={handleInputChangeForCustomer}
						setValue={setSearchCustomer}
						itemProperty={"studentNumber"}
					/>
				</div>
				<div className="w-full h-40 my-5 lg:mx-72">
					{customerId ? (
						customerId.books.map((book, index) => {
							return (
								<div className="w-full flex flex-col" key={index}>
									<div className="">
										<h1 className="mb-1 font-semibold text-xl">{`Book No. ${
											index + 1
										}`}</h1>
									</div>
									<div className="flex">
										<Input
											value={book.title}
											isReadOnly={true}
											name={book.title}
											id={book.title}
											label={""}
										/>
										<Button
											onClick={() => handleReturnBook(book)}
											className={`bg-blue-500 px-7 text-white font-medium py-3 ml-3 hover:bg-blue-700 rounded-lg`}>
											Return
										</Button>
									</div>
								</div>
							);
						})
					) : (
						<p className="text-center text-2xl">Loading books...</p>
					)}
				</div>
				{isModalOpen && (
					<>
						<Modal
							paragraph={modalParagraph}
							modalStatus={() => showModal(false)}
						/>
						<Backdrop />
					</>
				)}
			</div>
		</>
	);
}

export default Return;
