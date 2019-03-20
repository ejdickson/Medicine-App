const mongoose = require('../db/connection')
const Schema = mongoose.Schema

const { Medicine } = require('./Medicine')

const User = new Schema({
    email: String,
    password: String,
    displayName: String,
    medicines: [ {
        type: Schema.Types.ObjectId,
        ref: "Medicine"
    }  ]
})

module.exports = mongoose.model('User', User)