const express = require("express")
const router = express.Router()
const { getBeerById, updateBeer, deleteBeer } = require("../controller/beerController");

router.get("/beer/:id_beer", getBeerById)

router.put("/beer/:id_beer", updateBeer)

router.delete("/beer/:id_beer", deleteBeer)


module.exports = router;