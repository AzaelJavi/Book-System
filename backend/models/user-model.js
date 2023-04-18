const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		trim: true,
		minlength: 3,
		maxlength: 50,
	},
	email: {
		type: String,
		required: true,
		trim: true,
		minlength: 3,
		maxlength: 50,
		unique: true,
	},
	password: {
		type: String,
		required: true,
		minlength: 8,
	},
	isAdmin: {
		type: Boolean,
		default: false,
	},
});

userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign(
		{
			_id: this._id,
			username: this.username,
			email: this.email,
			isAdmin: this.isAdmin,
		},
		config.get("jwtPrivateKey")
	);

	return token;
};

const User = mongoose.model("User", userSchema);

function validationJoi(req) {
	const schema = Joi.object({
		username: Joi.string().min(3).max(50).required(),
		email: Joi.string().min(3).max(50).required().email(),
		password: Joi.string().required().min(8),
	});

	return schema.validate(req);
}

exports.validationJoi = validationJoi;
exports.User = User;
