const express = require("express");
const router = express.Router();
const _ = require("lodash");
const { Book, validationJoi } = require("../models/book-model");
const { Department } = require("../models/department-model");
const validate = require("../middleware/validationJoi");
const isValidId = require("../middleware/validateID");
const isAdmin = require("../middleware/admin");
const auth = require("../middleware/auth");

router.get("/", async (req, res) => {
	const book = await Book.find().sort("title");
	res.send(book);
});

router.get("/:id", async (req, res) => {
	const book = await Book.findById(req.params.id);
	if (!book) return res.status(404).send("Book ID not found.");

	res.send(book);
});

router.post("/", [auth, isAdmin, validate(validationJoi)], async (req, res) => {
	const department = await Department.findById(req.body.departmentId);
	if (!department) return res.status(400).send("Invalid Department.");

	const book = new Book({
		title: req.body.title,
		author: req.body.author,
		department: {
			_id: department._id,
			name: department.name,
		},
		bookNumber: req.body.bookNumber,
		numberInStock: req.body.numberInStock,
	});

	const bookNumber = await Book.lookup(req.body.bookNumber);
	if (bookNumber)
		return res.status(400).send("Book Number is already registered.");

	await book.save();
	res.send(book);
});

router.put(
	"/:id",
	[auth, isAdmin, isValidId, validate(validationJoi)],
	async (req, res) => {
		const book = await Book.findByIdAndUpdate(
			req.params.id,
			_.pick(req.body, ["title", "author", "numberInStock"]),
			{ new: true }
		);

		if (!book) return res.status(404).send("Book ID not found.");

		res.send(book);
	}
);

router.delete("/:id", [auth, isAdmin, isValidId], async (req, res) => {
	const book = await Book.findByIdAndDelete(req.params.id);
	if (!book) return res.status(404).send("Book ID not found.");

	res.send(book);
});

module.exports = router;
