const db = require("../config/db")

const sequelize = require("sequelize")

const Beer_Order = db.define("beer_order", {
    beerId: {
        type: sequelize.INTEGER,
        autoIncrement:true,
        allowNull: false,
        references: {
            model: "Beers",
            key: "id"
        },
        onDelete: "CASCADE"
    },
    orderId: {
        type: sequelize.INTEGER,
        autoIncrement:true,
        allowNull: false,
        references: {
            model: "Orders",
            key: "id"
        },
        onDelete: "CASCADE"
    }
})

module.exports = Beer_Order
