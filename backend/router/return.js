const express = require("express");
const router = express.Router();
const { Borrow } = require("../models/borrow-model");
const { Book } = require("../models/book-model");
const { Customer } = require("../models/customer-model");
const { Returned, validationJoi } = require("../models/returned-model");
const validate = require("../middleware/validationJoi");
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/admin");

router.get("/", async (req, res) => {
	const returns = await Returned.find().sort("-dateReturned");

	res.send(returns);
});

router.get("/:id", async (req, res) => {
	const getCustomer = await Borrow.find({ "customer._id": req.params.id });
	if (!getCustomer)
		return res.status(404).send("The requested data was not found.");

	res.send(getCustomer);
});

router.post("/", [auth, isAdmin, validate(validationJoi)], async (req, res) => {
	const { customerId, bookId } = req.body;

	const borrow = await Borrow.lookup(customerId, bookId);
	if (!borrow) return res.status(404).send("Borrow not found.");

	borrow.dateReturned = new Date();
	await borrow.save();

	const customer = await Customer.findOne({ _id: customerId });
	customer.books.pull(bookId);
	await customer.save();

	await Book.updateOne(
		{ _id: borrow.book._id },
		{
			$inc: { numberInStock: 1 },
		}
	);

	Returned.collection.insertOne(borrow, (err) => {
		if (err) {
			res.status(400).send("The book is already returned.");
		}
	});

	await Borrow.findByIdAndDelete({ _id: borrow._id });

	res.send(borrow);
});

module.exports = router;
