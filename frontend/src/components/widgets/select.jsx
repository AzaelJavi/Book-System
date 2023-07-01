import React from "react";

function Select({ name, label, error, options, ...rest }) {
	return (
		<div className="mb-3">
			<label
				htmlFor={name}
				className="block mb-2 text-xl font-medium text-gray-900">
				{label}
			</label>
			<select
				name={name}
				id={name}
				{...rest}
				className={`${
					error ? "border-red-500" : "border-gray-300"
				} bg-gray-50 border rounded-lg focus:outline-none  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-xl`}>
				<option value="">Choose a Department...</option>
				{options.map((item) => (
					<option key={item._id} value={item._id}>
						{item.department}
					</option>
				))}
			</select>
			{error && (
				<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50">
					{error}
				</div>
			)}
		</div>
	);
}

export default Select;
