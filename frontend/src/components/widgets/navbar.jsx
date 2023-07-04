import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { greet } from "../../utils/greetUser";

const navigation = [
	{ name: "Books", path: "/books" },
	{ name: "Customers", path: "/customers" },
	// { name: 'Returned', path: '#', current: false },
];

function Navbar({ user }) {
	const [isOpen, setIsOpen] = useState(false);

	const showAdminComponents = [
		{
			name: "Borrow",
			path: "/borrows",
		},
		// { name: "Return", path: "/returns" },
	];

	if (user && user.isAdmin) {
		showAdminComponents.forEach((item) => {
			const itemExists = navigation.some(
				(navItem) => navItem.name === item.name
			);
			if (!itemExists) navigation.push(item);
		});
	}

	const handleClick = () => {
		setIsOpen(!isOpen);
	};

	// console.log("User", user);
	// const username = user.username;

	return (
		<header>
			<nav className="bg-gray-800">
				<div className="mx-auto max-w-7xl p-2 ">
					<div className="relative h-10 flex justify-between ">
						<div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
							<button
								className="inline-flex items-center justify-center rounded-md p-2 border-2 border-white text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
								onClick={handleClick}>
								<span className="sr-only">Open Main Menu</span>
								{isOpen ? (
									<svg
										className="block w-8 h-8 text-teal-500"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M6 18L18 6M6 6l12 12"
										/>
									</svg>
								) : (
									<svg
										className="block w-8 h-8 text-teal-500"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
										/>
									</svg>
								)}
							</button>
						</div>
						<div className="flex flex-1 items-center justify-center sm:justify-start space-x-4 sm:mx-10 xl:mx-0">
							<div className="flex flex-shrink-0 items-center">
								<Link to="/" className="text-white hover:text-gray-200">
									Bookezy
								</Link>
							</div>
							<div className="hidden sm:block">
								{navigation.map((item) => (
									<NavLink
										key={item.name}
										to={item.path}
										className={({ isActive }) =>
											isActive
												? "bg-gray-900 text-white rounded-md px-3 py-2 font-medium"
												: "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2"
										}>
										{item.name}
									</NavLink>
								))}
							</div>
						</div>
						{!user && (
							<div className="flex justify-center items-center sm:mx-10 xl:mx-0">
								<Link
									to="/register"
									className="text-white hover:text-gray-200 mr-6">
									Register
								</Link>
								<Link to="/login" className="text-white hover:text-gray-200">
									Login
								</Link>
							</div>
						)}
						{user && (
							<div className="flex justify-center items-center sm:mx-10 xl:mx-0">
								<Link
									to="/profile"
									className="text-white hover:text-gray-200 mr-6">
									{greet(user.username)}
								</Link>
								<Link to="/logout" className="text-white hover:text-gray-200">
									Logout
								</Link>
							</div>
						)}
					</div>
				</div>
				{isOpen && (
					<div className="space-y-1 px-2 pb-3 pt-2">
						{navigation.map((item) => (
							<NavLink
								key={item.name}
								to={item.path}
								className={({ isActive }) =>
									isActive
										? "bg-gray-900 text-white block rounded-md px-3 py-2 font-medium"
										: "text-gray-300 hover:bg-gray-700 block hover:text-white  rounded-md px-3 py-2"
								}
								aria-current={item.current ? "page" : undefined}>
								{item.name}
							</NavLink>
						))}
					</div>
				)}
			</nav>
		</header>
	);
}

export default Navbar;
