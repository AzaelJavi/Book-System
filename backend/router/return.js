const express = require("express");
const router = express.Router();
const { Borrow } = require("../models/borrow-model");
const { Book } = require("../models/book-model");
const { Customer } = require("../models/customer-model");

router.post("/", async (req, res) => {
	const borrow = await Borrow.lookup(
		req.body.studentNumber,
		req.body.bookNumber
	);
	if (!borrow) return res.status(404).send("Borrow not found.");

	if (borrow.dateReturned)
		return res.status(400).send("Book is already returned.");

	borrow.dateReturned = new Date();
	await Book.updateOne(
		{ bookNumber: borrow.book.bookNumber },
		{
			$inc: { numberInStock: 1 },
		},
		{ new: true }
	);

	await borrow.save();

	// const customer = await Customer.findOne({ _id: req.body.customerId });
	// const books = await Book.findOne({ _id: req.body.bookId });

	// customer.books.pull(books);
	// await customer.save();

	return res.send(borrow);
});

module.exports = router;
