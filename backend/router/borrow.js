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
	let customer = await Customer.findOne({
		studentNumber: req.body.studentNumber,
	});
	if (!customer) return res.status(404).send("Customer not found.");

	const book = await Book.findOne({ bookNumber: req.body.bookNumber });
	if (!book) return res.status(404).send("Book not found.");

	if (book.numberInStock === 0)
		return res.status(400).send("Book not in stock.");

	let borrow = new Borrow({
		customer: {
			id: customer._id,
			name: customer.name,
			studentNumber: customer.studentNumber,
			address: customer.address,
			phone: customer.phone,
		},
		book: {
			id: book._id,
			title: book.title,
			bookNumber: book.bookNumber,
		},
	});

	await borrow.save();

	await Customer.findOneAndUpdate(
		{ _id: customer },
		{
			$push: {
				books: {
					id: book._id, //book.rental._id
					title: book.title,
				},
			},
		},
		{ new: true }
	);

	book.numberInStock--;
	book.save();

	res.send(borrow);
});
module.exports = router;
