const express = require("express");
const books = require("../router/books");
const departments = require("../router/departments");
const customers = require("../router/customers");

module.exports = function (app) {
	app.use(express.json());
	app.use("/api/books", books);
	app.use("/api/departments", departments);
	app.use("/api/customers", customers);
};
