require("dotenv").config()
const {Sequelize} = require("@sequelize/core")

sequelize = new Sequelize({
    dialect: "mysql",
    host:"localhost",
    port:process.env.DBPORT,
    username: process.env.DBUSERNAME,
    password: process.env.DB_PASSWORD || "Reza2198000@@@avinam",
    database:process.env.DBNAME,
    logging: false,

})
sequelize.authenticate().then(async  () => {
    await sequelize.sync({alter: true})
    console.log("connected successfully to mysql server")
}).catch((error) => {
    console.log(error.message)
})

module.exports = {
    sequelize
}