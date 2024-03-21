const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types

const OrderSchema = new mongoose.Schema({
    address: {
        streetAddress: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        zip: {
            type: Number,
            required: true
        },
        apt: {
            type: String,
        },
        state: {
            type: String,
            required: true
        },
    },
    order: {
        item: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
    },
    orderOwner: {
        type: ObjectId,
        ref: "User",
        required: true,
    },
    created: {
        type: Date,
        default: Date.now()
    }
})

const Order = mongoose.model("Order", OrderSchema)
module.exports = Order