const mongoose = require("mongoose");
const { borrowSchema } = require("../models/borrow-model");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const Returned = mongoose.model("Returned", borrowSchema);

function validationJoi(req) {
	const schema = Joi.object({
		customerId: Joi.objectId().required(),
		bookId: Joi.objectId().required(),
	});

	return schema.validate(req);
}

exports.validationJoi = validationJoi;
exports.Returned = Returned;
