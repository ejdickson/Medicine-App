const mongoose = require('../db/connection')
const Schema = mongoose.Schema

const DosageSchema = new Schema({
    number: Number,
    measurement: String,
    asNeeded: {
        type: Boolean,
        default: false
    },
    daily: {
        hourly: Number,
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
    name: String,
    addressStreet: String,
    addressCity: String,
    addressState: String,
    addressZipcode: String,
})

const UserSchema = new Schema({
    displayName: String,
    email: String,
    password: String,
    preferredPharamacy: PharmacySchema,
    medicines: [MedicineSchema],
})

module.exports = {
    MedicineSchema: MedicineSchema,
    DosageSchema: DosageSchema,
    PharmacySchema: PharmacySchema,
    UserSchema: UserSchema
}