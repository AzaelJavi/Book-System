const express = require("express");
const router = express.Router();
const _ = require("lodash");
const { Book, validationJoi } = require("../models/book-model");
const { Department } = require("../models/department-model");
const validate = require("../middleware/validationJoi");

router.get("/", async (req, res) => {
	const book = await Book.find().sort("title");
	res.send(book);
});

router.get("/:id", async (req, res) => {
	const book = await Book.findById(req.params.id);
	if (!book) return res.status(404).send("Book ID not found.");

	res.send(book);
});

router.post("/", [validate(validationJoi)], async (req, res) => {
	const department = await Department.findById(req.body.departmentId);
	if (!department) return res.status(400).send("Invalid Department.");

	const book = new Book({
		title: req.body.title,
		author: req.body.author,
		department: {
			id: department._id,
			name: department.name,
		},
		bookNumber: req.body.bookNumber,
		numberInStock: req.body.numberInStock,
	});

	await book.save();
	res.send(book);
});

router.put("/:id", [validate(validationJoi)], async (req, res) => {
	const book = await Book.findByIdAndUpdate(
		req.params.id,

		// title: req.body.title,
		// author: req.body.author,
		// genre: {
		// 	id: department._id,
		// 	name: department.name,
		// },
		// bookNumber: req.body.bookNumber,
		// numberInStock: req.body.numberInStock,
		_.pick(req.body, ["title", "author", "bookNumber", "numberInStock"]),

		{ new: true }
	);

	if (!book) return res.status(404).send("Book ID not found.");

	res.send(book);
});

router.delete("/:id", async (req, res) => {
	const book = await Book.findByIdAndDelete(req.params.id);
	if (!book) return res.status(404).send("Book ID not found.");

	res.send(book);
});

module.exports = router;
