import React from "react";

function ListGroup({ data, onSelectedDepartment, selectedDepartment }) {
	let className =
		"w-full cursor-pointer border-b-2 first:rounded-t-md last:rounded-b-md last:border-none p-4 text-2xl ring-1 ring-pink-500 md:text-xl transition duration-300";
	return (
		<React.Fragment>
			<ul className="w-96 border-2 border-neutral-300 rounded-lg">
				{data.map((item) => (
					<li
						onClick={() => onSelectedDepartment(item)}
						key={item._id}
						className={
							item === selectedDepartment
								? `${className} bg-pink-300`
								: `${className} hover:bg-pink-200`
						}>
						{item.name}
					</li>
				))}
			</ul>
		</React.Fragment>
	);
}

export default ListGroup;
