const { Order }  = require("../model/index")
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
        const validStatuses = ["en cours", "terminée"];
        if (status && !validStatuses.includes(status)) {
            return res.status(400).json({ message: "Invalid status value!" });
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
        const deleted = await Order.destroy({ where: { id } })
        if (!deleted) {
            return res.status(404).json({ message: "Order not found!" })
        }
        res.json({ message: "Order deleted successfully!" })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = { getOrderById, updateOrder, deleteOrder }