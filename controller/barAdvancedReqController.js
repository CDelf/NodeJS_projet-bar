const { Bar, Beer, Order }  = require("../model/index")
const db = require("../config/db")
const { Sequelize, Op } = require("sequelize")

// Get all the bars of a city
const getCityBars = async (req, res) => {
    try {
        const city = req.query.name

        if (!city || typeof city !== 'string' || city.trim() === '') {
            return res.status(400).json({ message: "Enter a valid city" })
        }

        const bars = await Bar.findAll({
            where: {
                address: {
                    [Op.like]: `%${city}%`
                }
            }
        })

        res.json(bars)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// Get bar's using name
const getCityByName = async (req, res) => {
    try {
        const name = req.query.value

        if (!name || typeof name !== 'string' || name.trim() === '') {
            return res.status(400).json({ message: "Enter a valid name" })
        }

        const bars = await Bar.findAll({
            where: {
                name : {
                    [Op.like]: `%${name}%`
                }
            }
        })
        res.json(bars)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// Get bar's orders placed on a specific date
const getOrdersFromDate = async (req, res) => {
    try {
        const id = parseInt(req.params.id_bar)
    const bar = await Bar.findByPk(id)
    if(!bar) {
        return res.status(404).json({message:"Bar not found!"})
    }

    const date = req.query.date
    
    const orders = await Order.findAll({
        where: {
            barId: id,
            date: {
                [Op.startsWith]: date
            }
        }
    })
    res.json(orders)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// Get bar's orders within a price range
const getOrdersFromPrices = async (req, res) => {
    // Get and check all parameters
    try {
        const id = parseInt(req.params.id_bar)
    const bar = await Bar.findByPk(id)
    if(!bar) {
        return res.status(404).json({message:"Bar not found!"})
    }

    const prix_min = parseFloat(req.query.prix_min)
    const prix_max = parseFloat(req.query.prix_max)

    if (isNaN(prix_min) || isNaN(prix_max) || prix_min > prix_max) {
        return res.status(400).json({ message: "Invalid price range" })
    }
    // Get all orders associated to the bar, in the price range
    const orders = await Order.findAll({
        where: {
            barId: id,
            price: {
                [Op.gte]: prix_min,
                [Op.lte]: prix_max
            }
        }
    })
    res.json(orders)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// Get all bar's orders for a specific date within a price range
const getOrdersByDateAndPrice = async (req, res) => {
    try {
        // Get and check all parameters
        const id = parseInt(req.params.id_bar)
        const bar = await Bar.findByPk(id)
        if (!bar) {
            return res.status(404).json({ message: "Bar not found!" })
        }

        const date = req.query.date
        const prix_min = parseFloat(req.query.prix_min)
        const prix_max = parseFloat(req.query.prix_max)

        if (!date || isNaN(Date.parse(date))) {
            return res.status(400).json({ message: "Invalid or missing date format (YYYY-MM-DD required)" })
        }

        if (isNaN(prix_min) || isNaN(prix_max) || prix_min > prix_max) {
            return res.status(400).json({ message: "Invalid price range" })
        }

        // Search orders respecting conditions
        const orders = await Order.findAll({
            where: {
                barId: id,
                date: { [Op.startsWith]: date },
                price: {
                    [Op.gte]: prix_min,
                    [Op.lte]: prix_max
                }
            }
        })

        res.json({ barId: id, date, prix_min, prix_max, orders })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// Get all bar's done orders respecting date, prices and optionnal name conditions
const getDoneOrdersByDatePriceName = async (req, res) => {
    try {
        // Get and check all parameters
        const id = parseInt(req.params.id_bar)
        const bar = await Bar.findByPk(id)
        if (!bar) {
            return res.status(404).json({ message: "Bar not found!" })
        }

        const date = req.query.date
        const prix_min = parseFloat(req.query.prix_min)
        const prix_max = parseFloat(req.query.prix_max)
        const name = req.query.name

        if (!date || isNaN(Date.parse(date))) {
            return res.status(400).json({ message: "Invalid or missing date format (YYYY-MM-DD required)" })
        }

        if (isNaN(prix_min) || isNaN(prix_max) || prix_min > prix_max) {
            return res.status(400).json({ message: "Invalid price range" })
        }

        // Conditions, where name is optionnal
        let whereCondition = {
            barId: id,
            status: "terminée",
            date: { [Op.startsWith]: date },
            price: { [Op.gte]: prix_min, [Op.lte]: prix_max }
        }
        if (name) {
            whereCondition.name = { [Op.like]: `%${name}%` }
        }

        // Search including previous conditions
        const orders = await Order.findAll({ where: whereCondition })

        res.json({ barId: id, date, prix_min, prix_max, name: name || "none", orders })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// Get average beers' degree for a specific bar 
const getAvgDegree = async (req, res) => {
    try {
        const id = parseInt(req.params.id_bar)

        const bar = await Bar.findByPk(id)
        if (!bar) {
            return res.status(404).json({ message: "Bar not found!" })
        }

        // Calculate the average based on degree col
        const result = await Beer.findOne({
            attributes: [[Sequelize.fn("AVG", Sequelize.col("degree")), "average_degree"]],
            where: { barId: id }
        })

        res.json({ barId: id, averageAlcoholDegree: result.dataValues.average_degree || 0 })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// Get average beers' degree for a specific bar and price range
const getAvgDegreeByPrice = async (req, res) => {
    // Get and check all parameters
    try {
        const id = parseInt(req.params.id_bar)

        const bar = await Bar.findByPk(id)
        if (!bar) {
            return res.status(404).json({ message: "Bar not found!" })
        }

        const prix_min = parseFloat(req.query.prix_min)
        const prix_max = parseFloat(req.query.prix_max)
        if (isNaN(prix_min) || isNaN(prix_max) || prix_min > prix_max) {
            return res.status(400).json({ message: "Invalid price range" })
        }

        // Calculate avg degree filter by min & max price 
        const result = await Beer.findOne({
            attributes: [[Sequelize.fn("AVG", Sequelize.col("degree")), "average_degree"]],
            where: { barId: id,
                price: {
                    [Op.gte]: prix_min,
                    [Op.lte]: prix_max
                }
            }
        })

        res.json({ barId: id, averageAlcoholDegree: result.dataValues.average_degree || 0 })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// Get average beers' degree for a specific bar and date
const getAvgDegreeByDate = async (req, res) => {
    try {
        // Get and check all parameters
        const id = parseInt(req.params.id_bar)
        const bar = await Bar.findByPk(id)
        if (!bar) {
            return res.status(404).json({ message: "Bar not found!" })
        }

        const date = req.query.date
        if (!date || isNaN(Date.parse(date))) {
            return res.status(400).json({ message: "Invalid or missing date format (YYYY-MM-DD required)" })
        }

        // Calculate the avg beer's degree for all orders on that date 
        const result = await Beer.findOne({
            attributes: [[Sequelize.fn("AVG", Sequelize.col("degree")), "average_degree"]],
            include: {
                model: Order,
                where: {
                    barId: id,
                    date: { [Op.startsWith]: date } 
                }
            }
        })

        res.json({ barId: id, date, averageAlcoholDegree: result?.dataValues?.average_degree || 0 })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// Asc or desc sort of beers, with or without a limit of results
const getSortedBeers = async (req, res) => {
    // Get and check all parameters
    try {
        const id = parseInt(req.params.id_bar)
        const bar = await Bar.findByPk(id)
        if (!bar) {
            return res.status(404).json({ message: "Bar not found!" })
        }

        const sort = req.query.sort
        if (!sort || (sort !== "asc" && sort !== "desc")) {
            return res.status(400).json({ message: "Error, specify 'asc' or 'desc' order" })
        }

        // Check optionnal limit parameter
        let limit = parseInt(req.query.limit)
        if (req.query.limit && (isNaN(limit) || limit <= 0)) {
            return res.status(400).json({ message: "Invalid limit parameter, must be a positive number" })
        }
        
        // Search et sort beers associated to the bar
        const sortedBeers = await Beer.findAll({
            where: { barId: id },
            order: [["name", sort]],
            ...(limit ? { limit } : {}) 
        })

        res.json({ beers: sortedBeers, order: sort })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// Get sorted (asc/desc) beers with limit/offset, optionnal degree min/max
const getFilteredSortedBeers = async (req, res) => {
    try {
        // Get and check all parameters
        const id = parseInt(req.params.id_bar)
        const bar = await Bar.findByPk(id)
        if (!bar) {
            return res.status(404).json({ message: "Bar not found!" })
        }

        const sort = req.query.sort
        if (sort && sort !== "asc" && sort !== "desc") {
            return res.status(400).json({ message: "Invalid sort parameter, must be 'asc' or 'desc'" })
        }

        // Limit & offset
        let limit = req.query.limit ? parseInt(req.query.limit) : null
        let offset = req.query.offset ? parseInt(req.query.offset) : null
        if ((limit && isNaN(limit)) || (offset && isNaN(offset))) {
            return res.status(400).json({ message: "Limit and offset must be valid numbers" })
        }

        // degree min/max, optionnal
        let degreeMin = req.query.degree_min ? parseFloat(req.query.degree_min) : null
        let degreeMax = req.query.degree_max ? parseFloat(req.query.degree_max) : null
        if ((degreeMin && isNaN(degreeMin)) || (degreeMax && isNaN(degreeMax))) {
            return res.status(400).json({ message: "degree_min and degree_max must be valid numbers" })
        }
        if (degreeMin !== null && degreeMax !== null && degreeMin > degreeMax) {
            return res.status(400).json({ message: "degree_min cannot be greater than degree_max" })
        }

        // Conditions
        let whereCondition = { barId: id }
        if (degreeMin !== null || degreeMax !== null) {
            whereCondition.degree = {}
            if (degreeMin !== null) whereCondition.degree[Op.gte] = degreeMin
            if (degreeMax !== null) whereCondition.degree[Op.lte] = degreeMax
        }

        // Search respecting conditions
        const beers = await Beer.findAll({
            where: whereCondition,
            order: [["name", sort || "asc"]], 
            limit: limit || undefined, 
            offset: offset || undefined, 
        })

        res.json({ beers, order: sort || "asc", limit, offset })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = { 
    getCityBars, getCityByName, getOrdersFromDate, getOrdersFromPrices,
    getOrdersByDateAndPrice, getDoneOrdersByDatePriceName, getAvgDegree, 
    getAvgDegreeByPrice, getAvgDegreeByDate, getSortedBeers, getFilteredSortedBeers 
}