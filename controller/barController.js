const { Bar }  = require("../model/index")
const db = require("../config/db")

// Get all bars
const getAllBars = async (req, res) => {
    try {
        const bars = await Bar.findAll()
        res.json(bars)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// Get a specific bar by ID
const getBarById = async (req, res) => {
    try {
        const barId = parseInt(req.params.id_bar, 10)
        const bar = await Bar.findByPk(barId)

        if (!bar) {
            return res.status(404).json({ message: "Bar not found!" })
        }

        res.json(bar)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// Create a bar
const createBar = async (req, res) => {
    try {
        const { name, adress, tel, email, description } = req.body;

        if (!name || !adress || !email) {
            return res.status(400).json({ message: "Name, adress et email sont obligatoires." });
        }

        const newBar = await Bar.create({
            name,
            adress,
            tel,
            email,
            description
        })

        res.status(201).json(newBar)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
};

// Update a bar
const updateBar = async (req, res) => {
    const id = parseInt(req.params.id_bar)
    const { name, adress, tel, email, description } = req.body  

    try {
        const bar = await Bar.findByPk(id)
        if (!bar) {
            return res.status(404).json({ message: "Bar not found!" })
        }

        // only update fields filled in req.body
        await bar.update({
            name: name ?? bar.name,
            adress: adress ?? bar.adress,
            tel: tel ?? bar.tel,
            email: email ?? bar.email,
            description: description ?? bar.description
        })

        res.json({ message: "Bar updated successfully", bar })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// Delete a bar
const deleteBar = async (req, res) => {
    const id = parseInt(req.params.id_bar)  
    if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid bar ID" })
    }

    try {
        const deleted = await Bar.destroy({ where: { id } })
        if (!deleted) {
            return res.status(404).json({ message: "Bar not found!" })
        }
        res.json({ message: "Bar deleted successfully!" })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
};


module.exports = { getAllBars , getBarById, createBar, updateBar, deleteBar }