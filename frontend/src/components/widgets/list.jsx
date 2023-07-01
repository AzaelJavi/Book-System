import React from "react";
import Button from "./button";

function List({ content, data, selectedData }) {
	const liClassName =
		"flex justify-between items-center w-full border-b-2 first:rounded-t-md last:rounded-b-md last:border-none p-4 text-2xl border-pink-500 md:text-xl transition duration-300";

	const btnClassName =
		"text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white";

	return (
		<React.Fragment>
			<ul className="w-96 border-2 border-pink-500 rounded-lg flex flex-col">
				{data.map((item) =>
					content.map((itemKey) => (
						<li
							onClick={
								itemKey.handleEvent
									? () => itemKey.handleEvent(item)
									: undefined
							}
							key={item._id}
							className={
								itemKey.handleEvent
									? item === selectedData
										? `${liClassName} bg-pink-300 cursor-pointer`
										: `${liClassName} hover:bg-pink-200 cursor-pointer`
									: liClassName
							}>
							{item[itemKey.path]}
							{itemKey.removeEvent ? (
								<Button
									key={item._id}
									className={btnClassName}
									onClick={() => itemKey.removeEvent(item)}>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="w-6 h-6">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M6 18L18 6M6 6l12 12"
										/>
									</svg>
								</Button>
							) : null}
						</li>
					))
				)}
			</ul>
		</React.Fragment>
	);
}

export default List;
