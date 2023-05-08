import React from "react";

function TableHeader({ columns, onSort, sortColumn }) {
	const raiseSort = (path, sort) => {
		const newSortColumn = { ...sortColumn };
		if (sort) {
			if (newSortColumn.path === path) {
				newSortColumn.order = newSortColumn.order === "asc" ? "desc" : "asc";
			} else {
				newSortColumn.path = path;
				newSortColumn.order = "asc";
			}
			onSort(newSortColumn);
		}
	};

	let ascElement = (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 20 20"
			fill="currentColor"
			className="w-5 h-5 inline-block">
			<path
				fillRule="evenodd"
				d="M14.77 12.79a.75.75 0 01-1.06-.02L10 8.832 6.29 12.77a.75.75 0 11-1.08-1.04l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 01-.02 1.06z"
				clipRule="evenodd"
			/>
		</svg>
	);

	let descElement = (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 20 20"
			fill="currentColor"
			className="w-5 h-5 inline-block">
			<path
				fillRule="evenodd"
				d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
				clipRule="evenodd"
			/>
		</svg>
	);

	const renderSort = (column) => {
		if (column.path !== sortColumn.path) return null;
		if (column.sort) {
			if (sortColumn.order === "asc") return ascElement;
			return descElement;
		}
	};

	return (
		<thead className="border-b font-medium dark:border-neutral-500">
			<tr>
				{columns.map((column) => (
					<th
						onClick={() => raiseSort(column.path, column.sort)}
						key={column.path || column.key}
						className="cursor-pointer whitespace-normal px-6 py-4">
						{column.label} {renderSort(column)}
					</th>
				))}
			</tr>
		</thead>
	);
}

export default TableHeader;
