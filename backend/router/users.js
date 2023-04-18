const express = require("express");
const { User, validationJoi } = require("../models/user-model");
const validate = require("../middleware/validationJoi");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const router = express.Router();

router.get("/", async (req, res) => {
	const user = await User.find().sort("name");

	res.send(user);
});

router.post("/", [validate(validationJoi)], async (req, res) => {
	let user = await User.findOne({ email: req.body.email });
	if (user) return res.status(400).send("User already registered.");

	user = new User(req.body, _.pick(["username", "email", "password"]));

	const salt = await bcrypt.genSalt(10);
	user.password = await bcrypt.hash(user.password, salt);

	await user.save();

	const token = user.generateAuthToken();

	res
		.header("x-auth-token", token)
		.send(_.pick(user, ["_id", "username", "email"]));
});

module.exports = router;
