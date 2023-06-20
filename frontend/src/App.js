import React, { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
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
import ProtectedRoutes from "./components/protectedRoutes";
import useCurrentUser from "./components/hooks/useCurrentUser";

function App() {
	const user = useCurrentUser();
	console.log("User", user);

	return (
		<React.Fragment>
			<ToastContainer />
			<NavBar user={user} />
			<Routes>
				<Route path="/login" element={<LoginForm />} />
				<Route path="/logout" element={<Logout />} />
				<Route path="/register" element={<RegisterForm />} />
				<Route element={<ProtectedRoutes />}>
					<Route path="/books/:id" element={<BooksForm />} exact />
					<Route path="/customers/:id" element={<CustomersForm />} />
				</Route>
				<Route path="/books" element={<Book user={user} />} />
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
