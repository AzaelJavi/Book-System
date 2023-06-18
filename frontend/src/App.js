import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Book from "./components/Book";
import Customer from "./components/Customer";
import Borrow from "./components/Borrow";
import NotFound from "./components/NotFound";
import NavBar from "./components/common/navbar";
import "react-toastify/dist/ReactToastify.css";
import BooksForm from "./components/booksForm";
import CustomersForm from "./components/customersForm";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import Logout from "./components/logout";
import auth from "./services/authService";

function App() {
	const [user, setUser] = useState("");

	useEffect(() => {
		const user = auth.getCurrentUser();
		setUser(user);
	}, []);

	// console.log("User", user);

	return (
		<React.Fragment>
			<ToastContainer />
			<NavBar user={user} />
			<Routes>
				<Route path="/login" element={<LoginForm />} />
				<Route path="/logout" element={<Logout />} />
				<Route path="/register" element={<RegisterForm />} />
				<Route path="/books/:id" element={<BooksForm />} />
				<Route path="/books" element={<Book user={user} />} />
				<Route path="/customers/:id" element={<CustomersForm />} />
				<Route path="/customers" element={<Customer user={user} />} />
				<Route path="/borrows" element={<Borrow />} />
				<Route path="/not-found" element={<NotFound />} />
				<Route path="/" element={<Navigate to="/books" />} />
				<Route path="*" element={<Navigate to="/not-found" />} />
			</Routes>
		</React.Fragment>
	);
}

export default App;
