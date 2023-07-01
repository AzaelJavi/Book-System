import React, { useState } from "react";
import Button from "./button";

function SearchBarBorrowReturn({
	data,
	label,
	value,
	onInputChange,
	onEnterItem,
	onClickItem,
	setValue,
	itemProperty,
	borrower,
	borrowBooks,
}) {
	const btnClassName =
		"p-3 mx-2 text-pink-600 font-semibold hover:text-pink-700 transition ease-in-out uppercase rounded-md";

	const dropdownHeight = data.length > 0 ? `${data.length * 40 + 15}px` : "0";

	const [inputFocused, setInputFocused] = useState(false);

	const handleInputFocus = () => {
		setInputFocused(true);
	};

	const handleInputBlur = () => {
		setInputFocused(false);
	};

	const handleClear = () => {
		setValue("");
	};

	const renderSearchInner = () => {
		let divClassName =
			"flex items-center h-12 text-sm border-2 border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500 z-0 ";

		inputFocused && value && data.length > 0
			? (divClassName += "rounded-t-3xl border-b-0")
			: (divClassName += "rounded-full");

		return divClassName;
	};

	const renderDropDown = () => {
		let divClassName =
			"absolute top-full left-0 w-96 flex flex-col border-2 rounded-b-3xl border-pink-500 bg-white z-10 ";

		inputFocused && value && data.length > 0
			? (divClassName += "block")
			: (divClassName += "opacity-0");

		return divClassName;
	};

	console.log("borrower", borrower);
	console.log("Item Propert", itemProperty);
	return (
		<>
			<div className="m-auto">
				<h1 className="text-center text-2xl mb-2 font-semibold">{label}</h1>
				{/* Search Container */}
				<div className="w-96 flex flex-col relative">
					{/* Search Inner */}
					<div className={renderSearchInner()}>
						<input
							type="text"
							value={value}
							onChange={onInputChange}
							onFocus={handleInputFocus}
							onBlur={handleInputBlur}
							className="p-3 w-full outline-none rounded-full"
						/>
						{value && (
							<svg
								onClick={handleClear}
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-6 h-6 cursor-pointer">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						)}
						<div className="border-l border-gray-400 ml-2 h-4/5"></div>
						<Button
							onClick={onEnterItem}
							className={btnClassName}
							disabled={
								(Array.isArray(borrower) && borrower.length >= 1) ||
								(Array.isArray(borrowBooks) && borrowBooks.length >= 5)
							}>
							Enter
						</Button>
					</div>
					{/* Dropdown  */}
					<div className={renderDropDown()} style={{ height: dropdownHeight }}>
						{data.map((item) => {
							return (
								<div
									onClick={() => onClickItem(item)}
									key={item._id}
									className="flex items-center cursor-pointer mt-2 hover:bg-pink-300">
									<div className="mr-2">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={1.5}
											stroke="currentColor"
											className="w-6 h-6">
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
											/>
										</svg>
									</div>
									<div className="text-start">{item[itemProperty]}</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</>
	);
}

export default SearchBarBorrowReturn;
