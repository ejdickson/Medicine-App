const mongoose = require('../db/connection')
const { UserSchema } = require('../db/schema')

module.exports = mongoose.model('User', UserSchema)