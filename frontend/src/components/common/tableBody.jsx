import React from "react";
import _ from "lodash";

function TableBody({ data, columns }) {
	const renderCell = (item, column) => {
		if (column.content) return column.content(item);

		let value = _.get(item, column.path);
		console.log(value);
		if (Array.isArray(value) && column.path === "books") {
			if (value.length === 0) {
				return "Not Borrowing";
			}
			const titles = value.map((book) => book.title).join(", ");
			return <span className="italic">{titles}</span>;
		}
		return value;
	};

	return (
		<React.Fragment>
			<tbody>
				{data.map((item) => (
					<tr key={item._id} className="border-b">
						{columns.map((column) => (
							<td
								key={column.key || column.path}
								className="whitespace-normal px-6 py-4">
								{renderCell(item, column)}
							</td>
						))}
					</tr>
				))}
			</tbody>
		</React.Fragment>
	);
}

export default TableBody;
