const express = require("express");
const router = express.Router();
const { Department, validationJoi } = require("../models/department-model");
const validate = require("../middleware/validationJoi");

router.get("/", async (req, res) => {
	const department = await Department.find().sort("name");

	res.send(department);
});

router.post("/", [validate(validationJoi)], async (req, res) => {
	const department = new Department({
		name: req.body.name,
	});

	await department.save();
	res.send(department);
});

module.exports = router;
