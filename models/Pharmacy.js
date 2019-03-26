const mongoose = require('../db/connection')
const { PharmacySchema } = require('../db/schema')

module.exports = mongoose.model('Pharmacy', PharmacySchema)

