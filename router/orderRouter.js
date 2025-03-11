const express = require("express")
const router = express.Router()
const { getOrderById, addBeerToOrder, updateOrder, 
    deleteOrder, deleteBeerFromOrder } = require("../controller/orderController")

router.get("/orders/:id_order", getOrderById)

router.post("/orders/:id_order/beer/:id_beer", addBeerToOrder)

router.put("/orders/:id_order", updateOrder)

router.delete("/orders/:id_order", deleteOrder)
router.delete("/orders/:id_order/beer/:id_beer", deleteBeerFromOrder)


module.exports = router