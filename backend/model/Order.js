const db = require("../config/db")

const sequelize = require("sequelize")

const Order = db.define("order", {
    id: {type: sequelize.INTEGER, autoIncrement:true, primaryKey: true},
    name : {type : sequelize.STRING, allowNull: false},
    price : {type : sequelize.FLOAT, allowNull:false},
    date: {type: sequelize.DATE, allowNull: false},
    status : {type : sequelize.ENUM('en cours', 'terminée'), allowNull: false}
})

module.exports = Order