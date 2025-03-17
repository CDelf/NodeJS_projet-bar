const db = require("../config/db")

const sequelize = require("sequelize")

const Beer = db.define("beer", {
    id: {type: sequelize.INTEGER, autoIncrement:true, primaryKey: true},
    name : {type : sequelize.STRING, allowNull: false},
    description : {type : sequelize.TEXT},
    degree : {type : sequelize.FLOAT, allowNull: false},
    price : {type : sequelize.FLOAT, allowNull:false}
})

module.exports = Beer