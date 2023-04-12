const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const borrowSchema = new mongoose.Schema({
	customer: {
		type: new mongoose.Schema({
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
		}),
		required: true,
	},
	book: {
		type: new mongoose.Schema({
			title: {
				type: String,
				required: true,
				trim: true,
			},
		}),
		required: true,
	},
	dateOut: {
		type: Date,
		required: true,
		default: Date.now,
	},
	dateReturned: {
		type: Date,
	},
});

const Borrow = mongoose.model("Borrow", borrowSchema);

function validationJoi(req) {
	const schema = Joi.object({
		customerId: Joi.objectId().required(),
		bookId: Joi.objectId().required(),
	});

	return schema.validate(req);
}

exports.validationJoi = validationJoi;
exports.Borrow = Borrow;
