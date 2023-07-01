import React from "react";
import Button from "./button";

function Modal({ paragraph, modalStatus }) {
	return (
		<div
			style={{ top: "30vh", left: "calc(50% - 12rem)" }}
			className="text-center w-96 p-4 rounded-md bg-white z-30 shadow fixed">
			<p className="font-semibold text-2xl">{paragraph}</p>
			<div className="flex flex-col justify-center items-center mt-2">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="w-20 h-20 text-pink-500">
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
					/>
				</svg>

				<Button
					onClick={modalStatus}
					className={
						"bg-blue-500 px-7 text-white font-medium py-3 hover:bg-blue-700 rounded-lg mt-3"
					}>
					Okay
				</Button>
			</div>
		</div>
	);
}

export default Modal;
