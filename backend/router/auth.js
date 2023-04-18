const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Joi = require("joi");
const validate = require("../middleware/validationJoi");
const { User } = require("../models/user-model");

router.post("/", [validate(validationJoi)], async (req, res) => {
	const user = await User.findOne({ email: req.body.email });
	if (!user) return res.status(400).send("Invalid Email or Password.");

	//Comparing plain password(1) and hashed with salt password(2)
	const isValidPassword = await bcrypt.compare(
		req.body.password,
		user.password
	);
	if (!isValidPassword)
		return res.status(400).send("Invalid Email or Password.");

	const token = user.generateAuthToken();
	res.send(token);
});

function validationJoi(req) {
	const schema = Joi.object({
		email: Joi.string().required().min(0).max(100).email(),
		password: Joi.string().required().min(8).max(50),
	});

	return schema.validate(req);
}

module.exports = router;
