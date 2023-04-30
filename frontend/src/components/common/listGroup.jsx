import React from "react";

function ListGroup({ data }) {
	return (
		<React.Fragment>
			<ul className="w-96 border-2 border-neutral-300 rounded-lg">
				{data.map((item) => (
					<li
						key={item._id}
						className="w-full cursor-pointer bg-primary-100 border-b-2 last:border-none p-4 text-2xl md:text-xl transition duration-500 hover:bg-neutral-100 hover:text-neutral-500">
						{item.name}
					</li>
				))}
			</ul>
		</React.Fragment>
	);
}

export default ListGroup;
