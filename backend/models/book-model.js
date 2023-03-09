const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const { departmentSchema } = require("./department-model");

const bookSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		trim: true,
	},
	author: {
		type: String,
		trim: true,
	},
	department: {
		type: departmentSchema,
	},
	bookNumber: {
		type: Number,
	},
	numberInStock: {
		type: Number,
		min: 0,
	},
});

const Book = mongoose.model("Book", bookSchema);

//validate

function validationJoi(req) {
	const schema = Joi.object({
		title: Joi.string().required().min(3).max(100),
		author: Joi.string().required().min(3).max(50),
		departmentId: Joi.objectId(),
		bookNumber: Joi.number().required().min(0).max(2000),
		numberInStock: Joi.number().required().min(0).max(50),
	});

	return schema.validate(req);
}

exports.bookSchema = bookSchema;
exports.validationJoi = validationJoi;
exports.Book = Book;
