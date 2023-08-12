const dotenv = require('dotenv')
const express = require('express')
const cors = require('cors')
const connectDB = require('./dbconnect.js')
const userRouter = require("./routes/userRouter.js")


const app = express();
dotenv.config()
const PORT = process.env.PORT || 4000

app.use((req, res, next) => {
    console.log("type:",req.method, ",endpoint:",req.url)
    next()
})

app.use(cors())
app.use(express.json())
app.use('/', userRouter)

connectDB()
app.listen(PORT, () => {
    console.log(`listening on port http://localhost:${PORT}`)
})