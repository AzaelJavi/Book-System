import React from "react";
import List from "./widgets/list";

function BorrowListGroup({ borrowBooks, onRemoveItem }) {
	const content = [
		{ path: "title", removeEvent: (item) => onRemoveItem(item) },
	];
	return (
		<>
			<List data={borrowBooks} content={content} />
		</>
	);
}

export default BorrowListGroup;
