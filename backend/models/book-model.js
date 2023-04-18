const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const { departmentSchema } = require("./department-model");

const bookSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		trim: true,
		minlength: 3,
		maxlength: 255,
	},
	author: {
		type: String,
		trim: true,
		required: true,
	},
	department: {
		type: departmentSchema,
		required: true,
	},
	bookNumber: {
		type: Number,
		unique: true,
		required: true,
	},
	numberInStock: {
		type: Number,
		required: true,
		min: 0,
	},
});

const Book = mongoose.model("Book", bookSchema);

//validate

function validationJoi(req) {
	const schema = Joi.object({
		title: Joi.string().required().min(3).max(100),
		author: Joi.string().required().min(3).max(50),
		departmentId: Joi.objectId().required(),
		bookNumber: Joi.number().required().min(0).max(2000),
		numberInStock: Joi.number().required().min(0).max(50),
	});

	return schema.validate(req);
}

exports.bookSchema = bookSchema;
exports.validationJoi = validationJoi;
exports.Book = Book;
