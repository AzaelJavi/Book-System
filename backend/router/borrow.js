const express = require("express");
const router = express.Router();
const { Borrow, validationJoi } = require("../models/borrow-model");
const validate = require("../middleware/validationJoi");
const { Customer } = require("../models/customer-model");
const { Book } = require("../models/book-model");

router.get("/", async (req, res) => {
	const borrow = await Borrow.find().sort("-dateOut");

	res.send(borrow);
});

router.post("/", [validate(validationJoi)], async (req, res) => {
	// Find the IDs based on req.body
	let customer = await Customer.findById(req.body.customerId);
	if (!customer) return res.status(404).send("Customer not found.");

	const book = await Book.findById(req.body.bookId);
	if (!book) return res.status(404).send("Book not found.");

	if (book.numberInStock === 0)
		return res.status(400).send("Book not in stock.");

	// This code will lookup on Customer Collection before it create
	// a borrow document and warn the client.
	const look = await Customer.lookup(
		req.body.customerId,
		req.body.bookId,
		book.title
	);
	if (look)
		return res
			.status(400)
			.send("This customer is already borrowed the same book.");

	let borrow = new Borrow({
		customer: {
			_id: customer._id,
			name: customer.name,
			studentNumber: customer.studentNumber,
			address: customer.address,
			phone: customer.phone,
		},
		book: {
			_id: book._id,
			title: book.title,
		},
	});

	await borrow.save();

	// This code will push the book in the books array of the given ID
	// of customer based on the field of book in borrow object.
	customer.books.push(borrow.book);
	await customer.save();

	book.numberInStock--;
	book.save();

	res.send(borrow);
});
module.exports = router;
