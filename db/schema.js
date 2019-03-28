const mongoose = require('../db/connection')
const Schema = mongoose.Schema

const DosageSchema = new Schema({
    number: {
        type: String,
        default: '0'
    },
    measurement: {
        type: String,
        default: 'unit'
    },
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
        default: 'New Pharmacy Name'
    },
    addressStreet: {
        type: String,
        default: 'Street Address'
    },
    addressCity: {
        type: String,
        default: 'City'
    },
    addressState: {
        type: String,
        default: 'State'
    },
    addressZipcode: {
        type: String,
        default: 'Zipcode'
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