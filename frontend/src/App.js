import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Book from "./components/Book";
import Customer from "./components/Customer";
import Borrow from "./components/Borrow";
import NotFound from "./components/NotFound";
import NavBar from "./components/common/navbar";
import "react-toastify/dist/ReactToastify.css";
import BooksForm from "./components/booksForm";

function App() {
	return (
		<React.Fragment>
			<ToastContainer />
			<NavBar />
			<Routes>
				<Route path="/books/:id" element={<BooksForm />} />
				<Route path="/books" element={<Book />} />
				<Route path="/customers" element={<Customer />} />
				<Route path="/borrows" element={<Borrow />} />
				<Route path="/not-found" element={<NotFound />} />
				<Route path="/" element={<Navigate to="/books" />} />
			</Routes>
		</React.Fragment>
	);
}

export default App;
