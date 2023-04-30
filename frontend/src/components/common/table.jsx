import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

function Table({ columns, data }) {
	return (
		<React.Fragment>
			<table className="min-w-full text-left text-md">
				<TableHeader columns={columns} />
				<TableBody columns={columns} data={data} />
			</table>
		</React.Fragment>
	);
}

export default Table;
