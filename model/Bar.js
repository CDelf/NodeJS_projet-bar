const db = require("../config/db")

const sequelize = require("sequelize")

const Bar = db.define("bar", {
        id: {type: sequelize.INTEGER, autoIncrement:true, primaryKey: true},
        user_choice : {type : sequelize.ENUM('pierre, feuille, ciseaux')},
        computer_choice : {type : sequelize.ENUM('pierre, feuille, ciseaux')},
        result : {type : sequelize.ENUM('victoire, défaite, égalité')}
    })

module.exports = Bar