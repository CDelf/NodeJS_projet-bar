// import des models
const Bar = require("./Bar")
const Beer = require("./Beer")
const Order = require("./Order")

// Connections
Bar.hasMany(Beer)
Beer.belongsTo(Bar)

Bar.hasMany(Order)
Order.belongsTo(Bar)

// export ../index.js
module.exports = { Bar, Beer, Order }