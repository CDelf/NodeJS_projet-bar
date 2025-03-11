const { Beer }  = require("../model/index")
const db = require("../config/db")

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

// Delete a beer
const deleteBeer = async (req, res) => {
    const id = parseInt(req.params.id_beer)  

    try {
        const deleted = await Beer.destroy({ where: { id } })
        if (!deleted) {
            return res.status(404).json({ message: "Beer not found!" })
        }
        res.json({ message: "Beer deleted successfully!" })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}



module.exports = { getBeerById, updateBeer, deleteBeer }