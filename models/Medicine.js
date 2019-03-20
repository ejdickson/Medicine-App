const mongoose = require('../db/connection')
const Schema = mongoose.Schema

const Medicine = new Schema({
    name: String,
    description: String,
    dosage: Number,
    amountRemaining: Number,
    needRefill: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Medicine', Medicine)