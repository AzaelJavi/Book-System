const express = require("express");
const router = express.Router();
const _ = require("lodash");
const validate = require("../middleware/validationJoi");
const isValidId = require("../middleware/validateID");
const isAdmin = require("../middleware/admin");
const auth = require("../middleware/auth");
const { Customer, validationJoi } = require("../models/customer-model");

router.get("/", async (req, res) => {
	const customer = await Customer.find().sort("name");

	res.send(customer);
});

router.post("/", [auth, isAdmin, validate(validationJoi)], async (req, res) => {
	let customer = await Customer.findDuplicates(
		req.body.studentNumber,
		req.body.email
	);
	if (customer)
		return res
			.status(400)
			.send("Student Number or Email is already registered.");

	customer = new Customer(
		_.pick(req.body, ["name", "studentNumber", "address", "email", "phone"])
	);

	await customer.save();
	res.send(customer);
});

//Customer
router.put(
	"/:id",
	[auth, isAdmin, isValidId, validate(validationJoi)],
	async (req, res) => {
		let customer = await Customer.findDuplicates(
			req.body.studentNumber,
			req.body.email
		);

		if (customer)
			return res
				.status(400)
				.send("Student Number or Email is already registered.");

		customer = await Customer.findByIdAndUpdate(
			req.params.id,
			_.pick(req.body, ["name", "studentNumber", "address", "email", "phone"]),
			{ new: true }
		);

		if (!customer) return res.status(404).send("Invalid Customer ID.");

		res.send(customer);
	}
);

router.delete("/:id", [auth, isAdmin, isValidId], async (req, res) => {
	const customer = await Customer.findByIdAndDelete(req.params.id);

	if (!customer) return res.status(404).send("Customer ID not found.");

	res.send(customer);
});

module.exports = router;
