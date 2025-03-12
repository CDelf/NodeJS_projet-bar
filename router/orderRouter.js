const express = require("express")
const router = express.Router()
const { getOrderPdf, getOrderById, addBeerToOrder, updateOrder, 
        deleteOrder, deleteBeerFromOrder } = require("../controller/orderController")
const {validateBar, validateBeer, validateOrder} = require("../middleware/form")


router.get("/orders/details/:id_order", getOrderPdf)
router.get("/orders/:id_order", getOrderById)

router.post("/orders/:id_order/beer/:id_beer", validateBeer, addBeerToOrder)

router.put("/orders/:id_order", validateOrder, updateOrder)

router.delete("/orders/:id_order", deleteOrder)
router.delete("/orders/:id_order/beer/:id_beer", deleteBeerFromOrder)


module.exports = router