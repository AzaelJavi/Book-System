const express = require("express");
const app = express();
const config = require("config");

require("./startup/db")();
require("./startup/routes")(app);

const port = process.env.PORT || config.get("port");
app.listen(port, () => console.log(`Listening on port ${port}...`));