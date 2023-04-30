import React from "react";

const tableHeader = [{}];

function TableHeader({ columns }) {
	return (
		<thead className="border-b font-medium dark:border-neutral-500">
			<tr>
				{columns.map((column) => (
					<th
						key={column.path || column.key}
						className="whitespace-normal px-6 py-4">
						{column.label}
					</th>
				))}
			</tr>
		</thead>
	);
}

export default TableHeader;
