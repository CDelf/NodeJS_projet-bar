const { Beer }  = require("../model/index")
const db = require("../config/db")

// Get all beers
const getAllBeers = async (req,res) => {
    try {
        const beers = await Beer.findAll()
        res.json(beers)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// Get beer by id
const getBeerById = async (req, res) => {
        try {
            const beerId = parseInt(req.params.id_beer)
            const beer = await Beer.findByPk(beerId)

            if (!beer) {
                return res.status(404).json({ message: "Beer not found!" })
            }
            res.json(beer)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

// Update a beer
const updateBeer = async (req, res) => {
    const id = parseInt(req.params.id_beer)
    const { name, description, degree, price } = req.body  

    try {
        const beer = await Beer.findByPk(id)
        if (!beer) {
            return res.status(404).json({ message: "Beer not found!" })
        }

        // only update fields filled in req.body
        await beer.update({
            name: name ?? beer.name,
            description: description ?? beer.description,
            degree: degree ?? beer.degree,
            price: price ?? beer.price  
        })

        res.json({ message: "Beer updated successfully", beer })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// Delete a beer and its related orders
const deleteBeer = async (req, res) => {
    const id = parseInt(req.params.id_beer)  

    try {
        const beer = await Beer.findByPk(id)
        if (!beer) {
            return res.status(404).json({ message: "Beer not found!" })
        }

        await beer.destroy()
        res.json({ message: "Beer and its order associations deleted successfully!" })
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = { getAllBeers, getBeerById, updateBeer, deleteBeer }