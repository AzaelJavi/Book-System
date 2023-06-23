import React, { useRef } from "react";

function SearchBar({ value, onSearch }) {
	const searchBoxRef = useRef(null);

	const handleClick = () => {
		searchBoxRef.current.focus();
	};
	return (
		<div className="relative">
			<input
				type="text"
				ref={searchBoxRef}
				className="sm:ml-6 p-3 w-4/6 rounded-l-md text-sm border-2 border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500"
				placeholder="Search..."
				id="search-box"
				value={value}
				onChange={(e) => onSearch(e.currentTarget.value)}
			/>
			<button
				type="submit"
				onClick={handleClick}
				className="absolute top-0 p-3.5 text-white bg-pink-700 rounded-r-lg hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800">
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
			</button>
		</div>
	);
}

export default SearchBar;
