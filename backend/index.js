const express = require('express')
const cors = require('cors')
const app = express()
const appRoute = require('./routes/appRoute')
const connectDB = require('./db')
const port = 3000

app.use(express.json())

app.use(cors())

connectDB()

app.use('/', appRoute)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
