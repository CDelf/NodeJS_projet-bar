// import des models
const Bar = require("./Bar")
const Beer = require("./Beer")
const Order = require("./Order")

// Connections
Bar.hasMany(Beer, { onDelete: "CASCADE" })
Beer.belongsTo(Bar)

Bar.hasMany(Order, { onDelete: "CASCADE" })
Order.belongsTo(Bar)

Beer.belongsToMany(Order, { through : 'Beer_Order'})
Order.belongsToMany(Beer, { through : 'Beer_Order'})

// export ../index.js
module.exports = { Bar, Beer, Order }