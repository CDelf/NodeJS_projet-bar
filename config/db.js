const Sequelize = require("sequelize")

const DIALECT = process.env.DB_DIALECT || "sqlite"
const STORAGE = process.env.DB_STORAGE || "./db.sqlite"


const db = new Sequelize({
    dialect : DIALECT,
    storage : STORAGE
})

db.sync()

module.exports = db