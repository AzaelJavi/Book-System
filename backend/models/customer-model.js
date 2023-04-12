const mongoose = require("mongoose");
const { departmentSchema } = require("./department-model");
const { Book, bookSchema } = require("./book-model");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const customerSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true,
		minlength: 3,
	},
	studentNumber: {
		type: String,
		required: true,
		trim: true,
	},
	address: {
		type: String,
		required: true,
		trim: true,
		minlength: 3,
	},
	phone: {
		type: String,
		required: true,
		minlength: 0,
		maxlength: 11,
	},
	books: {
		type: [bookSchema],
		default: [],
	},
});

const Customer = mongoose.model("Customer", customerSchema);

function validationJoi(req) {
	const schema = Joi.object({
		name: Joi.string().required().min(3),
		studentNumber: Joi.string().length(9).required().messages({
			"string.length": "Student Number must be exactly 9 characters long.",
		}),
		address: Joi.string().required().min(3),
		phone: Joi.string().required().min(0).max(11),
		bookId: Joi.objectId(),
	});

	return schema.validate(req);
}

exports.validationJoi = validationJoi;
exports.Customer = Customer;
