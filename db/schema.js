const mongoose = require('../db/connection')
const Schema = mongoose.Schema

const DosageSchema = new Schema({
    number: String,
    measurement: String,
    asNeeded: {
        type: Boolean,
        default: false
    },
    hourly: {
        type: Boolean,
        default: false
    },
    hours: String,
    morning: {
        type: Boolean,
        default: false
    },
    afternoon: {
        type: Boolean,
        default: false
    },
    evening: {
        type: Boolean,
        default: false
    },
    bedTime: {
        type: Boolean,
        default: false
    }
})

const MedicineSchema = new Schema({
    nameCommon: String,
    namePrescription: String,
    description: String,
    prescribingDoctor: String,
    overTheCounter: {
        type: Boolean,
        default: false,
    },
    dosage: DosageSchema,
})

const PharmacySchema = new Schema({
    name: {
        type: String,
        default: ''
    },
    addressStreet: {
        type: String,
        default: ''
    },
    addressCity: {
        type: String,
        default: ''
    },
    addressState: {
        type: String,
        default: ''
    },
    addressZipcode: {
        type: String,
        default: ''
    }
})

const UserSchema = new Schema({
    displayName: String,
    email: String,
    password: String,
    pharmacy: PharmacySchema,
    medicines: [MedicineSchema],
})

module.exports = {
    MedicineSchema: MedicineSchema,
    DosageSchema: DosageSchema,
    PharmacySchema: PharmacySchema,
    UserSchema: UserSchema
}