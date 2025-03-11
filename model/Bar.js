const db = require("../config/db")

const sequelize = require("sequelize")

const Bar = db.define("bar", {
    id: {type: sequelize.INTEGER, autoIncrement:true, primaryKey: true},
    name : {type : sequelize.STRING, unique: true, allowNull: false},
    adress : {type : sequelize.STRING, allowNull: false},
    tel : {type : sequelize.STRING},
    email : {type : sequelize.STRING, allowNull: false},
    description : {type : sequelize.TEXT},
})

module.exports = Bar