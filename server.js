const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./db')
const errorhandler = require('./middleware/error')

//load env vars
dotenv.config({ path: "./config.env" })

//connect database
connectDB()

//logger middleware
const logger = require('./middleware/logger')

//bootcamp
const bootcamps = require("./routes/bootcamp")

const app = express();

app.use(logger)

//body parser
app.use(express.json())

//mount router
app.use("/api/v1/bootcamps", bootcamps)

//error handling
app.use(errorhandler)
const PORT = process.env.PORT

const server = app.listen(PORT, console.log(`server running in ${process.env.NODE_ENV} mode`))

//Halding the rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error:${err.message}`)
    server.close(() => process.exit(1))
})
