import React from "react";
import List from "./widgets/list";

function BorrowerListGroup({ borrower, onRemoveItem }) {
	const content = [{ path: "name", removeEvent: (item) => onRemoveItem(item) }];
	return (
		<>
			<List data={borrower} content={content} />
		</>
	);
}

export default BorrowerListGroup;
