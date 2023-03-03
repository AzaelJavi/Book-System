const express = require("express");
const books = require("../router/books");
const departments = require("../router/departments");

module.exports = function (app) {
	app.use(express.json());
	app.use("/api/books", books);
	app.use("/api/departments", departments);
};
