const express = require("express")
const app = express()
require("dotenv").config()

const PORT = process.env.SERVER_PORT || 3001;
const barRouter = require("./router/barRouter")
const beerRouter = require("./router/beerRouter")
const orderRouter = require("./router/orderRouter")

app.use(express.json())
app.use(barRouter)
app.use(beerRouter)
app.use(orderRouter)

app.listen(PORT, () => {
    console.log("App listening on port 3000 !")
})