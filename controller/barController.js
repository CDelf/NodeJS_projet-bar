const { Bar, Beer, Order }  = require("../model/index")
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
        const barId = parseInt(req.params.id_bar)
        const bar = await Bar.findByPk(barId)

        if (!bar) {
            return res.status(404).json({ message: "Bar not found!" })
        }

        res.json(bar)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// Get bar's beers
const getBarBeers = async (req, res) => {
    try {
        const barId = parseInt(req.params.id_bar)
        const bar = await Bar.findByPk(barId, { include: [Beer] });
        if (!bar) {
            return res.status(404).json({ message: "Bar not found!" });
        }
        res.json({ beers: bar.beers });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get a bar's orders
const getBarOrders = async (req, res) => {
    try {
        const barId = parseInt(req.params.id_bar)
        const bar = await Bar.findByPk(barId, { include: [Order] });
        if (!bar) {
            return res.status(404).json({ message: "Bar not found!" });
        }
        res.json({ orders: bar.orders });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Create a bar
const createBar = async (req, res) => {
    try {
        const { name, address: address, tel, email, description } = req.body;

        if (!name || !address || !email) {
            return res.status(400).json({ message: "Name, address et email sont obligatoires." });
        }

        const newBar = await Bar.create({
            name,
            address: address,
            tel,
            email,
            description
        })

        res.status(201).json(newBar)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
};

// Add a beer to a bar
const addBeerToBar = async (req, res) => {
    try {
        const barId = parseInt(req.params.id_bar)
    
        const bar = await Bar.findByPk(barId)
        if (!bar) {
            return res.status(404).json({ message: "Bar not found!" })
        }
    
        // check beer's req.body
        const { name, description, degree, price } = req.body
        if (!name || !degree || !price) {
            return res.status(400).json({ message: "Name, degree, and price are required!" })
        }
        if (price <= 0) {
            return res.status(400).json({ message: "Price must be greater than 0" })
        }
    
        // Création de la bière et association au bar
        const beer = await Beer.create({ name, description, degree, price, barId })
    
        res.status(201).json({ message: "Beer added successfully!", beer })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// Add an order to a bar
const addOrderToBar = async (req, res) => {
    try {
        const barId = parseInt(req.params.id_bar)
    
        const bar = await Bar.findByPk(barId)
        if (!bar) {
            return res.status(404).json({ message: "Bar not found!" })
        }
    
        // check order's req.body
        const { name, price, date, status } = req.body
        if (!name || !price || !date || !status) {
            return res.status(400).json({ message: "Name, price, date and status are required!" })
        }
        if (price <= 0) {
            return res.status(400).json({ message: "Price must be greater than 0" })
        }
    
        // Création de la bière et association au bar
        const order = await Order.create({ name, price, date, status, barId })
    
        res.status(201).json({ message: "Order added successfully!", order })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// Update a bar
const updateBar = async (req, res) => {
    const id = parseInt(req.params.id_bar)
    const { name, address, tel, email, description } = req.body  

    try {
        const bar = await Bar.findByPk(id)
        if (!bar) {
            return res.status(404).json({ message: "Bar not found!" })
        }

        // only update fields filled in req.body
        await bar.update({
            name: name ?? bar.name,
            address: address ?? bar.address,
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


module.exports = { getAllBars , getBarById, getBarBeers, getBarOrders, createBar, 
    addBeerToBar, addOrderToBar, updateBar, deleteBar }