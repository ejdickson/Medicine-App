const Dosage = require('../models/Dosage')
const User = require('../models/User')

const dosageController = {
    show: (req, res) => {
        User
            .findById(req.params.userId)
            .then(user => {
                const dosage = user.dosage.id(req.params.dosageId)
                res.json(dosage)
            })
            .catch((err) => {
                console.log(err)
            })
    },
    update: (req, res) => {
        User
            .findById(req.params.userId)
            .then(user => {
                const updatedDosage = user.dosage.id(req.params.dosageId)
                updatedDosage.set(req.body)
                user.save()
                res.json(updatedDosage)
            })
            .catch((err) => {
                console.log(err)
            })
    },
}

module.exports = dosageController