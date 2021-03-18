const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    chat_id: {
        type: Number, required: true
    },
    admin: {
        type: Number, required: true
    },
    coupon: {
        type: Number, required: true
    },
    active_coupon: {
        type: Number, required: true
    },
    first_name: {
        type: String, required: true
    },
    user_name: {
        type: String, required: true
    },
    is_bot: {
        type: String, required: true
    },
    language_code: {
        type: String, required: true
    },
    type: {
        type: String, required: true
    },
    date: {
        type: String, required: true
    }
}, { timestamps: true })

const User = mongoose.model('User', userSchema)
module.exports = User