const mongoose = require("mongoose");
const { borrowSchema } = require("../models/borrow-model");

const Returned = mongoose.model("Returned", borrowSchema);

exports.Returned = Returned;
