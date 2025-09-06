const express = require('express')
const cors = require('cors')
const app = express()
const appRoute = require('./routes/appRoute')
const connectDB = require('./db')
const port = 3000

app.use(express.json())

app.use(cors())

app.use(cors({
  origin: "golden-lily-549097.netlify.app", 
  credentials: true                            
}));

connectDB()

app.use('/', appRoute)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
