const mongoose = require("mongoose")
const { ObjectId } = mongoose.Schema.Types

const userSchema = new mongoose.Schema(
    {
        userType: {
            type: String,
            default: "User",
        },
        name: { 
            type: String,
            required: true,
        },
        email: { 
            type: String, 
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        securityQuestion: {
            type: String,
            required: true
        },
        securityAnswer: {
            type: String,
            required: true
        },
        role: {
            type: String,
            default: "user"
        },
        liveID: {
            type: String,
            default: null,
        },
        photo: {
            name: {
                type: String,
            },
            path: {
                type: String,
            },
            contentType: {
                type: String,
            },
            cloudinaryId: {
                type: String,
            },
        }
    },
    { timestamps: true }
)

const User = mongoose.model("User", userSchema)

module.exports = User