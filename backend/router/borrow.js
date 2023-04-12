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
	let customer = await Customer.findById(req.body.customerId);
	if (!customer) return res.status(404).send("Customer not found.");

	const book = await Book.findById(req.body.bookId);
	if (!book) return res.status(404).send("Book not found.");

	if (book.numberInStock === 0)
		return res.status(400).send("Book not in stock.");

	const borrow = new Borrow({
		customer: {
			name: customer.name,
			studentNumber: customer.studentNumber,
			address: customer.address,
			phone: customer.phone,
		},
		book: {
			title: book.title,
		},
	});

	await borrow.save();

	await Customer.findOneAndUpdate(
		{ _id: customer },
		{
			$push: {
				books: {
					id: book._id,
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
