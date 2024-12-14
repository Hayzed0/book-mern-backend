const Order = require("./order.model");

const createAnOrder = async (req, res) => {
    try {
        const newOrder = await Order(req.body)
        const savedOrder = await newOrder.save()
        res.status(200).json(savedOrder)
    } catch (error) {
        console.error("error creating order")
        res.status(500)
    }
}

const getAnOrder = async (req, res) => {
    try {
        const {email} = req.params;
        const orders = await Order.find({email}).sort({createdAt: -1})
        if(!orders){
            return res.status(404).json({message: "order not found"})
        }
        res.status(200).json(orders)
    } catch (error) {
        console.error("error fetching order")
        res.status(500).json({message: "Error encountered whilst fecthing order"})
    }
}

module.exports = {
    createAnOrder,
    getAnOrder
}