const express = require("express");
const router = express.Router();
const { Department, validationJoi } = require("../models/department-model");
const validate = require("../middleware/validationJoi");
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/admin");

router.get("/", async (req, res) => {
	const department = await Department.find().sort("name");

	res.send(department);
});

router.get("/:id", async (req, res) => {
	const department = await Department.findById(req.params.id);
	if (!department) return res.status(404).send("Department ID not found.");

	res.send(department);
});

router.post("/", [auth, isAdmin, validate(validationJoi)], async (req, res) => {
	const department = new Department({
		name: req.body.name,
	});

	await department.save();
	res.send(department);
});

router.delete("/:id", [auth, isAdmin], async (req, res) => {
	const department = await Department.findByIdAndDelete(req.params.id);
	if (!department) return res.status(404).send("Department ID not found.");

	res.send(department);
});

module.exports = router;
