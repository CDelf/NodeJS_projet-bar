const express = require("express")
const router = express.Router()
const { getCityBars, getCityByName, getOrdersFromDate, 
    getOrdersFromPrices, getAvgDegree  } = require("../controller/barAdvancedReqController")

router.get("/search/city", getCityBars)
router.get("/search/name", getCityByName)


router.get("/search/:id_bar/orders", getOrdersFromDate)
router.get("/search/:id_bar/orders", getOrdersFromPrices)
router.get("/search/:id_bar/degree", getAvgDegree)


module.exports = router