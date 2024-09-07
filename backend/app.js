require("dotenv").config();
const Application = require("./app/server");
const sequelize = require("./app/libs/DBConfig");
const PORT = process.env.PORT;
new Application(PORT);
