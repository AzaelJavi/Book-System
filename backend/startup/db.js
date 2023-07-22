const mongoose = require("mongoose");
const config = require("config");

module.exports = function () {
	const db =
		process.env.NODE_ENV === "production"
			? process.env.PRODUCTION_DB
			: process.env.DEVELOPMENT_DB;

	mongoose
		.connect(db, { useNewUrlParser: true })
		.then(() => console.log(`Connected to ${db}....`))
		.catch((err) => console.error("Error connecting to MongoDB:", err));
};
