const express = require("express");
const router = express.Router();
const { Borrow, validationJoi } = require("../models/borrow-model");
const validate = require("../middleware/validationJoi");
const { Customer } = require("../models/customer-model");
const { Book } = require("../models/book-model");
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/admin");

router.get("/", async (req, res) => {
	const borrow = await Borrow.find().sort("-dateOut");

	res.send(borrow);
});

router.get("/:id", async (req, res) => {
	const customer = await Borrow.find({ "customer._id": req.params.id });

	res.send(customer);
});

router.post("/", [auth, isAdmin, validate(validationJoi)], async (req, res) => {
	// Find the IDs based on req.body
	let customer = await Customer.findById(req.body.customerId);
	if (!customer) return res.status(404).send("Customer not found.");

	const books = await Book.find({ _id: { $in: req.body.bookIds } });

	// Prevent the client to borrow same books also to prevent the customer having the same books borrowed.
	if (hasDuplicates(req.body.bookIds))
		return res
			.status(400)
			.send("You cannot borrow same books in one transaction.");

	if (books.length < 0)
		return res.status(404).send("One or more books not found..");

	const borrowBooks = [];
	let borrow;

	for (const book of books) {
		if (book.numberInStock === 0)
			return res.status(400).send(`The book ${book.title} is not in stock.`);

		// This code will lookup on Customer Collection before it create
		// a borrow document and warn the client.
		const checkBook = await Customer.lookup(
			req.body.customerId,
			book._id,
			book.title
		);
		if (checkBook)
			return res
				.status(400)
				.send(`This customer is already borrowed the book ${book.title}.`);

		borrow = new Borrow({
			customer: {
				_id: customer._id,
				name: customer.name,
				email: customer.email,
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

		borrowBooks.push(borrow);
		book.numberInStock--;

		customer.books.push(borrow.book);
		await customer.save();
	}

	await Book.updateMany(
		{ _id: { $in: req.body.bookIds } },
		{ $inc: { numberInStock: -1 } }
	);
	res.send(borrowBooks);
});

function hasDuplicates(array) {
	return new Set(array).size !== array.length;
}
module.exports = router;
