const dotenv = require("dotenv").config()
const cors = require("cors")
const express = require("express")
const morgan = require("morgan")
const router = require("./routes")

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use("/api", router)

app.listen(3001, function(error) {
    if(error) {
        console.log(error)
    } 
    console.log("Server listening on port", process.env.PORT)
})