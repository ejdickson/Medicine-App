const Medicine = require('../models/Medicine')
const User = require('../models/User')

const medicineController = {
    // Possibly scrapping separate index of medicines and instead including it on user show page
    index: (req, res) => {
        User
            .findById(req.params.userId)
            .then(user => {
                res.json(user.medicines)
            })
            .catch((err) => {
                console.log(err)
            })
    },
    create: (req, res) => {
        User
            .findById(req.params.userId)
            .then(user => {
                const newMedicine = new Medicine(req.body)
                user.medicines.push(newMedicine)
                user.save()
                    .then(user => {
                        res.json(newMedicine)
                    })
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

module.exports = medicineController