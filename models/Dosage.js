const mongoose = require('../db/connection')
const { DosageSchema } = require('../db/schema')

module.exports = mongoose.model('Dosage', DosageSchema)