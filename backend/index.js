const express = require("express");
const app = express();
require("dotenv").config();
const config = require("config");

require("./startup/db")();
require("./startup/cors")(app);
require("./startup/routes")(app);
require("./startup/config")();
require("./startup/prod")(app);

app.use("/", async (req, res) => {
	return res.send("Hello WOrld");
});

const port = process.env.PORT || config.get("port");
app.listen(port, () => console.log(`Listening on port ${port}...`));
