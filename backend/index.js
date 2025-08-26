const express = require('express')
const cors = require('cors')
const app = express()
const appRoute = require('./routes/appRoute')
const cookieparser = require('cookie-parser')
const connectDB = require('./db')
const port = 3000

app.use(express.json())
app.use(cookieparser())
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))

connectDB()

app.use('/', appRoute)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
