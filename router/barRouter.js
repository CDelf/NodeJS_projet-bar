const express = require("express")
const router = express.Router()
const { getAllBars, getBarById, createBar, updateBar, deleteBar } = require("../controller/barController");


router.get("/bars", getAllBars )
router.get("/bars/:id_bar", getBarById)

router.post("/bars", createBar)

router.put("/bars/:id_bar", updateBar)

router.delete("/bars/:id_bar", deleteBar)


module.exports = router;