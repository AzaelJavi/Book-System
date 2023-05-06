import React from "react";

function Input({ label, name, error, disabled, ...rest }) {
	return (
		<div className="mb-3">
			<label
				htmlFor={name}
				className="block text-xl mb-2 font-medium text-gray-900">
				{label}
			</label>
			<input
				name={name}
				id={name}
				{...rest}
				className={`${
					error ? "border-red-500" : "border-gray-300"
				} bg-gray-50 border rounded-lg focus:outline-none  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-xl`}
			/>
			{error && (
				<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50">
					{error}
				</div>
			)}
		</div>
	);
}

export default Input;
