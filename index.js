const express = require('express')
const app = express()
const port = process.env.PORT || 8000
require('dotenv').config()
const mongoose = require('mongoose');
const cors = require("cors");

app.use(express.json())
app.use(cors({
  origin:['http://localhost:5173', "https://book-store-ruby-ten.vercel.app"],
  credentials: true

}))


const bookRoutes = require('./src/books/book.routes')
const orderRoutes = require('./src/orders/order.routes')
const userRoutes = require('./src/users/user.routes')
const adminRoutes = require('./src/stats/admin.stats')

app.use('/api/books' , bookRoutes)
app.use('/api/orders' , orderRoutes)
app.use('/api/auth' , userRoutes)
app.use('/api/admin' , adminRoutes)


async function main() {
  await mongoose.connect(process.env.DB_URL);

  app.use('/', (req, res) => {
    res.send('Server Running!!')
  })
  
}

main().then(() => console.log("Mongoose connected successfully!!")).catch(err => console.log(err));

// mBXm17g4SpBirffu


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})