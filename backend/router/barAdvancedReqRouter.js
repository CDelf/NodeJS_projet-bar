const express = require("express")
const router = express.Router()
const { 
    getCityBars, getCityByName, getOrdersFromDate, getOrdersFromPrices, 
    getOrdersByDateAndPrice,getDoneOrdersByDatePriceName, getAvgDegree, 
    getAvgDegreeByPrice, getAvgDegreeByDate, getSortedBeers, getFilteredSortedBeers 
    } = require("../controller/barAdvancedReqController")

// Get bars list by city or name
router.get("/search/city", getCityBars)
router.get("/search/name", getCityByName)

// Search related to orders
router.get("/search/:id_bar/orders", getOrdersFromDate)
router.get("/search/:id_bar/orders", getOrdersFromPrices)
router.get("/search/:id_bar/orders", getOrdersByDateAndPrice)
router.get("/search/:id_bar/orders", getDoneOrdersByDatePriceName)

// Search related to beers
router.get("/search/:id_bar/degree", getAvgDegree)
router.get("/search/:id_bar/degree", getAvgDegreeByPrice)
router.get("/search/:id_bar/degree", getAvgDegreeByDate)
router.get("/search/:id_bar", getSortedBeers)
router.get("/search/:id_bar", getFilteredSortedBeers)


module.exports = router