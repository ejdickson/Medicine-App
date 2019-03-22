const mongoose = require('../db/connection')
const Schema = mongoose.Schema

const MedicineSchema = new Schema({
    name: String,
    description: String,
    dosage: String,
    amountRemaining: String,
    needRefill: {
        type: Boolean,
        default: false
    }
})

const UserSchema = new Schema({
    email: String,
    password: String,
    displayName: String,
    medicines: [MedicineSchema]
})

module.exports = {
    MedicineSchema: MedicineSchema,
    UserSchema: UserSchema
}