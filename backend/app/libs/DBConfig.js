const { Sequelize } = require("@sequelize/core");

const sequelize = new Sequelize({
  dialect: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "Reza2198000@@@avinam",
  database: "soltanoptic",
  logging: false,
});
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });
module.exports = {
  sequelize,
};
