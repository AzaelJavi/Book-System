import React from "react";
import List from "./widgets/list";

function BookListGroup({
	departments,
	onSelectedDepartment,
	selectedDepartment,
}) {
	const content = [
		{ path: "department", handleEvent: (item) => onSelectedDepartment(item) },
	];
	return (
		<>
			<List
				data={departments}
				selectedData={selectedDepartment}
				content={content}
			/>
		</>
	);
}

export default BookListGroup;
