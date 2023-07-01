import React, { useRef } from "react";
import Button from "./button";

function SearchBar({ value, setValue, onSearch }) {
	const searchBoxRef = useRef(null);

	const handleClick = () => {
		searchBoxRef.current.focus();
	}; // Changed This

	const handleClear = () => {
		setValue("");
	};
	const btnClassName = "p-3.5 text-pink-500 cursor-default";

	return (
		<div className="w-full flex relative ml-6">
			<div className="flex items-center w-3/4 border-2 rounded-lg border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500">
				<input
					type="text"
					ref={searchBoxRef}
					className="p-3 w-full rounded-l-lg text-sm outline-none"
					placeholder="Search..."
					id="search-box"
					value={value}
					onChange={(e) => onSearch(e.currentTarget.value)}
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
				<Button onClick={handleClick} className={btnClassName}>
					<svg
						aria-hidden="true"
						className="w-5 h-5"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
					</svg>
				</Button>
			</div>
		</div>
	);
}

export default SearchBar;
