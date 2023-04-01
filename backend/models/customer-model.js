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
		unique: true,
	},
});

const Customer = mongoose.model("Customer", customerSchema);
// TODO
// Customer.aggregate([
// 	{ $unwind: "books" },
// 	{
// 		$group: {
// 			_id: "books.title",
// 			count: { $sum: 1 },
// 		},
// 	},
// 	{ $match: { count: { $gt: 1 } } },
// ]);

function validationJoi(req) {
	const schema = Joi.object({
		name: Joi.string().required().min(3),
		address: Joi.string().required().min(3),
		phone: Joi.string().required().min(0).max(11),
		bookId: Joi.objectId(),
	});

	return schema.validate(req);
}

exports.validationJoi = validationJoi;
exports.Customer = Customer;
