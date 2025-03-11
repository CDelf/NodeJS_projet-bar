const express = require("express")
const router = express.Router()
const { getAllBars, getBarById, getBarBeers, getBarOrders, createBar, addBeerToBar,
    addOrderToBar, updateBar, deleteBar } = require("../controller/barController")


router.get("/bars", getAllBars )
router.get("/bars/:id_bar", getBarById)
router.get("/bars/:id_bar/beers", getBarBeers)
router.get("/bars/:id_bar/orders", getBarOrders)

router.post("/bars", createBar)
router.post("/bars/:id_bar/beer", addBeerToBar)
router.post("/bars/:id_bar/order", addOrderToBar)

router.put("/bars/:id_bar", updateBar)

router.delete("/bars/:id_bar", deleteBar)


module.exports = router