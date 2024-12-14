const express = require("express")
const { createAnOrder, getAnOrder } = require("./orderController")

const router = express.Router()

//create an order endpoint
router.post("/", createAnOrder)

//get order from backend by email 
router.get("/email/:email", getAnOrder)


module.exports = router