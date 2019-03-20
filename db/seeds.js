const User = require('../models/User')
const Medicine = require('../models/Medicine')

const medicine1 = new Medicine({
    name: 'Something',
    description: 'Needed for something',
    dosage: 25,
    amountRemaining: 500,
})

const medicine2 = new Medicine({
    name: 'Something Else',
    description: 'Needed for the same something',
    dosage: 15,
    amountRemaining: 600,
})

const user1 = new User({
    email: 'user1@test.com',
    password: 'test1234',
    displayName: 'user1',
    medicines: [medicine1, medicine2]
})


User
    .deleteMany({})
    .then(() => user1.save())
    .then(() => console.log('Successful Save'))