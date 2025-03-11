const express = require("express")
const router = express.Router()
const { getOrderById, updateOrder, deleteOrder } = require("../controller/orderController")

router.get("/orders/:id_order", getOrderById)

router.put("/orders/:id_order", updateOrder)

router.delete("/orders/:id_order", deleteOrder)


module.exports = router