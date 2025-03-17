const express = require("express")
const router = express.Router()
const { getAllBeers, getBeerById, updateBeer, deleteBeer } = require("../controller/beerController")
const {validateBeer} = require("../middleware/form")

router.get("/beers", getAllBeers)
router.get("/beer/:id_beer", getBeerById)

router.put("/beer/:id_beer", validateBeer, updateBeer)

router.delete("/beer/:id_beer", deleteBeer)


module.exports = router;