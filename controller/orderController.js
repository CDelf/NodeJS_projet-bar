const { Beer, Order }  = require("../model/index")
const db = require("../config/db")

// Get an order by id
const getOrderById = async (req, res) => {
    try {
        const orderId = parseInt(req.params.id_order)
        const order = await Order.findByPk(orderId)

        if (!order) {
            return res.status(404).json({ message: "Order not found!" })
        }

        res.json(order)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// Add a beer to an order
const addBeerToOrder = async (req,res) => {
    const orderId = parseInt(req.params.id_order)
    const beerId = parseInt(req.params.id_beer)
    const [order, beer] = await Promise.all([
        Order.findByPk(orderId),
        Beer.findByPk(beerId)
    ])

    if(!order) return res.status(400).json({ message: "Order not found !" })
    if(!beer) return res.status(400).json({ message: "Beer not found !" })

    await order.addBeer(beer);
    res.status(201).json({message:"Beer added to order"});
}

// Update order
const updateOrder = async (req, res) => {
    const id = parseInt(req.params.id_order)
    const { name, price, date, status } = req.body  

    try {
        const order = await Order.findByPk(id)
        if (!order) {
            return res.status(404).json({ message: "Order not found!" })
        }

          // check status
        const validStatuses = ["en cours", "terminée"]
        if (status && !validStatuses.includes(status)) {
            return res.status(400).json({ message: "Invalid status value!" })
        }

        // only update fields filled in req.body
        await order.update({
            name: name ?? order.name,
            price: price ?? order.price,
            date: date ?? order.date,
            status: status ?? order.status
        })

        res.json({ message: "Order updated successfully", order })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// Delete an order
const deleteOrder = async (req, res) => {
    const id = parseInt(req.params.id_order)  

    try {
        const order = await Order.findByPk(id);
        if (!order) {
            return res.status(404).json({ message: "Order not found!" })
        }

        await order.destroy()
        res.json({ message: "Order and its beer associations deleted successfully!" })
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// Delete a beer from an order
const deleteBeerFromOrder = async (req, res) => {
    const orderId = parseInt(req.params.id_order)
    const beerId = parseInt(req.params.id_beer)
    const [order, beer] = await Promise.all([
        Order.findByPk(orderId),
        Beer.findByPk(beerId)
    ])

    if(!order) return res.status(400).json({ message: "Order not found !" })
    if(!beer) return res.status(400).json({ message: "Beer not found !" })

    await order.removeBeer(beer);
    res.status(201).json({message:"Beer removed from order"})
}

module.exports = { getOrderById, addBeerToOrder, updateOrder, 
    deleteOrder, deleteBeerFromOrder }