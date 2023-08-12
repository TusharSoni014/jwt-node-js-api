const mongoose = require("mongoose")

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true //removes extra spaces
    },
    password: {
        type: String,
        required: true,
        trim: true //removes extra spaces
    }
}, { timestapms: true })

const User = mongoose.model("User", UserSchema)
module.exports = User