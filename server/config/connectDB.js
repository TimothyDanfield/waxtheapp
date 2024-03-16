const mongoose = require("mongoose")

const connectDB = () => {
    mongoose.connect(process.env.MONGODB, {})
        .catch((error) => {
            console.log(error)
        })

    mongoose.connection.on("connected", () => {
        console.log("Connected to MongoDB")
    })
}

module.exports = connectDB