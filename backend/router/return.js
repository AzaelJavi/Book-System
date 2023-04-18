const express = require("express");
const router = express.Router();
const { Borrow, validationJoi } = require("../models/borrow-model");
const { Book } = require("../models/book-model");
const { Customer } = require("../models/customer-model");
const { Returned } = require("../models/returned-model");
const validate = require("../middleware/validationJoi");
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/admin");

router.get("/", async (req, res) => {
	const returns = await Returned.find().sort("-dateReturned");

	res.send(returns);
});

router.post("/", [auth, isAdmin, validate(validationJoi)], async (req, res) => {
	const borrow = await Borrow.lookup(req.body.customerId, req.body.bookId);
	if (!borrow) return res.status(404).send("Borrow not found.");

	const returnDate = (borrow.dateReturned = new Date());
	await borrow.save();

	const document = await Borrow.findOne({
		dateReturned: returnDate,
	});

	await Book.updateOne(
		{ _id: borrow.book._id },
		{
			$inc: { numberInStock: 1 },
		}
	);

	const customer = await Customer.findOne({ _id: req.body.customerId });
	customer.books.pull(req.body.bookId);
	await customer.save();

	Returned.collection.insertOne(document, (err) => {
		if (err) {
			res.status(400).send("The book is already returned.");
		}
	});

	await Borrow.findByIdAndDelete({ _id: document._id });

	return res.send(borrow);
});

module.exports = router;
