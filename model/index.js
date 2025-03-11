// import des models
const Bar = require("./Bar");
const Beer = require("./Beer")

// Connections
Bar.hasMany(Beer);
Beer.belongsTo(Bar);

// export ../index.js
module.exports = { Bar, Beer }