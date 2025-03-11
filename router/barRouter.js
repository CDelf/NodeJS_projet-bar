const express = require("express")
const router = express.Router()
const { getAllBars, getBarById, getBarBeers, createBar, addBeerToBar, 
    updateBar, deleteBar } = require("../controller/barController");


router.get("/bars", getAllBars )
router.get("/bars/:id_bar", getBarById)
router.get("/bars/:id_bar/beers", getBarBeers)

router.post("/bars", createBar)
router.post("/bars/:id_bar/beer", addBeerToBar)

router.put("/bars/:id_bar", updateBar)

router.delete("/bars/:id_bar", deleteBar)

module.exports = router;