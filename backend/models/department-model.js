const mongoose = require("mongoose");
const Joi = require("joi");

const departmentSchema = new mongoose.Schema({
	department: {
		type: String,
		minlength: 3,
		maxlength: 50,
		required: true,
		trim: true,
	},
});

const Department = mongoose.model("Department", departmentSchema);

function validationJoi(req) {
	const schema = Joi.object({
		department: Joi.string().required().min(3).max(50),
	});

	return schema.validate(req);
}

exports.departmentSchema = departmentSchema;
exports.Department = Department;
exports.validationJoi = validationJoi;
