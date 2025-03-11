const express = require("express")
const router = express.Router()
const { getAllBars, getBarById, getBarBeers, getBarOrders, createBar, addBeerToBar,
    addOrderToBar, updateBar, deleteBar } = require("../controller/barController")
const {validateBar, validateBeer, validateOrder} = require("../middleware/formRequest/form")


router.get("/bars", getAllBars )
router.get("/bars/:id_bar", getBarById)
router.get("/bars/:id_bar/beers", getBarBeers)
router.get("/bars/:id_bar/orders", getBarOrders)

router.post("/bars", validateBar, createBar)
router.post("/bars/:id_bar/beer", validateBeer, addBeerToBar)
router.post("/bars/:id_bar/order", validateOrder, addOrderToBar)

router.put("/bars/:id_bar", validateBar, updateBar)

router.delete("/bars/:id_bar", deleteBar)


module.exports = router