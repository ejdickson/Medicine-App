const mongoose = require('../db/connection')
const { MedicineSchema } = require('../db/schema')

module.exports = mongoose.model('Medicine', MedicineSchema)