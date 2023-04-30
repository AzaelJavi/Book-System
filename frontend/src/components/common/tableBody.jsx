import React from "react";
import _ from "lodash";

function TableBody({ data, columns }) {
	const renderCell = (item, column) => {
		if (column.content) return column.content(item);

		return _.get(item, column.path);
	};

	return (
		<React.Fragment>
			<tbody>
				{data.map((item) => (
					<tr key={item._id} className="border-b dark:border-neutral-500">
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
