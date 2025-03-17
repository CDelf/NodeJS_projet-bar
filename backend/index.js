const express = require("express")
const app = express()
require("dotenv").config()
const cors = require('cors');

const PORT = process.env.SERVER_PORT || 3002;
const barRouter = require("./router/barRouter")
const beerRouter = require("./router/beerRouter")
const orderRouter = require("./router/orderRouter")
const barAdvancedReqRouter = require("./router/barAdvancedReqRouter")

app.use(express.json())
app.use(cors({
    origin: 'http://localhost:3001'
}));
app.use(barRouter)
app.use(beerRouter)
app.use(orderRouter)
app.use(barAdvancedReqRouter)

app.listen(PORT, () => {
    console.log("App listening on port 3000 !")
})