require('dotenv').config()
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })

const User = require('../models/User')
const Pharmacy = require('../models/Pharmacy')
const Medicine = require('../models/Medicine')
const Dosage = require('../models/Dosage')

const med1Dose = new Dosage({
    number: '25',
    measurement: 'mg',
    asNeeded: false,
    hourly: true,
    hours: '6',
})

const med2Dose = new Dosage({
    number: '1',
    measurement: 'tablet',
    asNeeded: false,
    morning: true,
    afternoon: false,
    evening: true,
    bedTime: false
})

const medicine1 = new Medicine({
    nameCommon: 'Something',
    namePrescription: '',
    description: 'Needed for something',
    prescribingDoctor: '',
    dosage: med1Dose
})

const medicine2 = new Medicine({
    nameCommon: 'Something Else',
    namePrescription: '',
    description: 'Needed for the same something',
    prescribingDoctor: '',
    dosage: med2Dose,
})

const publix = new Pharmacy({
    name: 'Publix at Chastain Square',
    addressStreet: '4279 Roswell Rd NE #300',
    addressCity: 'Atlanta',
    addressState: 'GA',
    addressZipcode: '30342',
})

const user1 = new User({
    displayName: 'user1',
    email: 'user1@test.com',
    password: 'test1234',
    pharmacy: publix,
    medicines: [medicine1, medicine2],
})


User
    .deleteMany({})
    .then(() => user1.save())
    .then(() => console.log('Successful Save'))