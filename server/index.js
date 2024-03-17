const dotenv = require("dotenv").config()
const cors = require("cors")
const express = require("express")
const morgan = require("morgan")
const connectDB = require("./config/connectDB")
const router = require("./routes")
const userRouter = require("./routes/user")
const { ErrorHandler } = require("./middleware/ErrorHandler");

const app = express()

connectDB()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use("/api", router)
app.use("/user", userRouter)

app.listen(3001, function(error) {
    if(error) {
        console.log(error)
    } 
    console.log("Server listening on port", process.env.PORT)
})