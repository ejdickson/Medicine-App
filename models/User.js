const mongoose = require('../db/connection')
const Schema = mongoose.Schema

const Medicine = require('./Medicine')

const User = new Schema({
    email: String,
    password: String,
    displayName: String,
    medicines: [ Medicine ]
})

module.exports = mongoose.model('User', User)