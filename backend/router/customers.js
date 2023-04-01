const express = require("express");
const router = express.Router();
const _ = require("lodash");
const validate = require("../middleware/validationJoi");
const { Book, bookSchema } = require("../models/book-model");
const { Customer, validationJoi } = require("../models/customer-model");

router.get("/", async (req, res) => {
	const customer = await Customer.find().sort("name");

	res.send(customer);
});

router.post("/", [validate(validationJoi)], async (req, res) => {
	const book = await Book.findById(req.body.bookId);
	if (!book) return res.status(400).send("Invalid Book");

	const customer = new Customer({
		name: req.body.name,
		address: req.body.address,
		phone: req.body.phone,
		books: {
			id: book._id,
			title: book.title,
		},
	});

	await customer.save();
	res.send(customer);
});

//Customer
router.put("/:id", validate(validationJoi), async (req, res) => {
	const customer = await Customer.findByIdAndUpdate(
		req.params.id,
		_.pick(req.body, ["name", "address", "phone"]),
		{ new: true }
	);

	if (!customer) return res.status(404).send("Invalid Customer ID.");

	res.send(customer);
});

//Books
router.put("/:id/books", async (req, res) => {
	const book = await Book.findById(req.body.bookId);
	if (!book) return res.status(400).send("Invalid Book ID.");

	const customer = await Customer.findOneAndUpdate(
		{ _id: req.params.id },
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

	if (!customer) return res.status(404).send("Invalid Customer.");
	await customer.save();
	res.send(customer);
});

router.delete("/:id/books/:bookId", async (req, res) => {
	const { id, bookId } = req.params;

	const customer = await Customer.findOne({ _id: id });

	customer.books.pull(bookId);

	await customer.save();
	res.send(customer);
});

module.exports = router;
