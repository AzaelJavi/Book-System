import React from "react";
import _ from "lodash";

function Pagination({
	currentPage,
	setCurrentPage,
	itemsPerPage,
	itemCount,
	onPageClick,
	maxPageNumberLimit,
	setMaxPageNumberLimit,
	pageNumberLimit,
	setPageNumberLimit,
	minPageNumberLimit,
	setMinPageNumberLimit,
}) {
	const pageCount = Math.ceil(itemCount / itemsPerPage);
	if (pageCount === 1) return null;
	const pages = _.range(1, pageCount + 1);

	// Events
	const handlePreviousClick = (e) => {
		e.preventDefault();
		setCurrentPage(currentPage - 1);

		if ((currentPage - 1) % pageNumberLimit === 0) {
			setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
			setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
		}
	};

	const handleNextClick = (e) => {
		e.preventDefault();
		setCurrentPage(currentPage + 1);

		if (currentPage + 1 > maxPageNumberLimit) {
			setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
			setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
		}
	};

	const handleEllipNext = () => {
		const prevMinPage = minPageNumberLimit + 1;
		setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
		setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
		const current = prevMinPage + maxPageNumberLimit - minPageNumberLimit;
		setCurrentPage(current);
	};

	// className
	let a_className =
		"block px-4 py-3 text-md font-semibold text-gray-900 ring-1 ring-inset ring-pink-500 hover:bg-pink-200 focus:z-20 focus:outline-offset-0 transition duration-500";

	let classPrev = "self-center ";
	currentPage === 1 ? (classPrev += "invisible") : (classPrev += "visible");

	let classNext = "self-center  ";
	currentPage === pages[pages.length - 1]
		? (classNext += "invisible")
		: (classNext += "visible");

	let classActive =
		"block px-4 py-3 text-md font-semibold text-gray-900 ring-1 ring-inset ring-pink-500 bg-pink-300 focus:z-20 focus:outline-offset-0 transition-all duration-300";

	//Ellip
	let ellipNext = null;
	if (pages.length > maxPageNumberLimit) {
		ellipNext = (
			<li onClick={handleEllipNext}>
				<a href="#" className={a_className}>
					&hellip;
				</a>
			</li>
		);
	}

	const handleEllipPrev = () => {
		const prevMinPage = minPageNumberLimit + 1;
		setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
		setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
		let current = maxPageNumberLimit - prevMinPage;
		current -= minPageNumberLimit;
		setCurrentPage(-current);
	};

	let ellipPrev = null;
	if (minPageNumberLimit >= 1) {
		ellipPrev = (
			<li>
				<a href="#" onClick={handleEllipPrev} className={a_className}>
					&hellip;
				</a>
			</li>
		);
	}

	return (
		<React.Fragment>
			<nav>
				<ul className="list-style-none flex justify-center m-5">
					<li className={classPrev}>
						<a
							onClick={handlePreviousClick}
							className={`${a_className} rounded-l-lg`}
							href="">
							Previous
						</a>
					</li>
					{ellipPrev}
					{pages.map((page) => {
						if (page < maxPageNumberLimit + 1 && page > minPageNumberLimit) {
							return (
								<li key={page}>
									<a
										className={page === currentPage ? classActive : a_className}
										onClick={() => onPageClick(page)}
										href="#">
										{page}
									</a>
								</li>
							);
						} else {
							return null;
						}
					})}
					{ellipNext}
					<li className={classNext}>
						<a
							onClick={handleNextClick}
							className={`${a_className} rounded-r-lg`}
							href="">
							Next
						</a>
					</li>
				</ul>
			</nav>
		</React.Fragment>
	);
}

export default Pagination;
