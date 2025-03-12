const { Bar, Beer, Order }  = require("../model/index")
const db = require("../config/db")
const { Sequelize, Op } = require("sequelize")

// Get all the bars of a city
const getCityBars = async (req, res) => {
    console.log("méthode city atteinte")
    try {
        const city = req.query.name

        if (!city || typeof city !== 'string' || city.trim() === '') {
            return res.status(400).json({ message: "Enter a valid city" })
        }
        console.log("City received:", city)

        const bars = await Bar.findAll({
            where: {
                address: {
                    [Op.like]: `%${city}%`
                }
            }
        })

        res.json(bars)
    } catch (error) {
        console.error("Error fetching bars:", error)
        res.status(500).json({ error: error.message })
    }
}

// Get bar's using name
const getCityByName = async (req, res) => {
    console.log("méthode name atteinte")
    try {
        const name = req.query.value

        if (!name || typeof name !== 'string' || name.trim() === '') {
            return res.status(400).json({ message: "Enter a valid name" })
        }
        console.log("name received:", name)

        const bars = await Bar.findAll({
            where: {
                name : {
                    [Op.like]: `%${name}%`
                }
            }
        })
        res.json(bars)
    } catch (error) {
        console.error("Error fetching bars:", error)
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
            
        }
    })
    res.json(orders)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Get bar's orders within a price range
const getOrdersFromPrices = async (req, res) => {
    try {
        const id = parseInt(req.params.id_bar)
    const bar = await Bar.findByPk(id)
    if(!bar) {
        return res.status(404).json({message:"Bar not found!"})
    }

    const prix_min = parseFloat(req.query.prix_min)
    const prix_max = parseFloat(req.query.prix_max)

    if (isNaN(prix_min) || isNaN(prix_max) || prix_min > prix_max) {
        return res.status(400).json({ message: "Invalid price range" });
    }

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
        res.status(500).json({ error: error.message });
    }
}

// Get average beers' degree for a specific bar 
const getAvgDegree = async (req, res) => {
    try {
        const id = parseInt(req.params.id_bar)

        // Vérifier si le bar existe
        const bar = await Bar.findByPk(id)
        if (!bar) {
            return res.status(404).json({ message: "Bar not found!" })
        }

        // Calcul du degré moyen d'alcool des bières du bar
        const result = await Beer.findOne({
            attributes: [[Sequelize.fn("AVG", Sequelize.col("degree")), "average_degree"]],
            where: { barId: id }
        });

        res.json({ barId: id, "averageAlcoholDegree": result.dataValues.average_degree || 0 })

    } catch (error) {
        console.error("Error fetching average alcohol degree:", error)
        res.status(500).json({ error: error.message })
    }
}

module.exports = {getCityBars, getCityByName, getOrdersFromDate, getOrdersFromPrices, getAvgDegree }