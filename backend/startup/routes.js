const express = require("express");
const books = require("../router/books");
const departments = require("../router/departments");
const customers = require("../router/customers");
const borrows = require("../router/borrow");
const returns = require("../router/return");
const users = require("../router/users");
const auth = require("../router/auth");

module.exports = function (app) {
	app.use(express.json());
	app.use("/api/books", books);
	app.use("/api/departments", departments);
	app.use("/api/customers", customers);
	app.use("/api/borrows", borrows);
	app.use("/api/returns", returns);
	app.use("/api/users", users);
	app.use("/api/auth", auth);
};
