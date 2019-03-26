const Medicine = require('../models/Medicine')
const User = require('../models/User')

const medicineController = {
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
    },
    show: (req, res) => {
        User
            .findById(req.params.userId)
            .then(user => {
                const singleMedicine = user.medicines.id(req.params.medicineId)
                res.json(singleMedicine)
            })
            .catch((err) => {
                console.log(err)
            })
    },
    update: (req, res) => {
        User
            .findById(req.params.userId)
            .then(user => {
                const updatedMedicine = user.medicines.id(req.params.medicineId)
                updatedMedicine.set(req.body)
                user.save()
                res.json(updatedMedicine)
            })
            .catch((err) => {
                console.log(err)
            })
    },
    delete: (req, res) => {
        User
            .findById(req.params.userId)
            .then(user => {
                const filterMedicines = user.medicines.filter((medicine) => medicine._id != req.params.medicineId)
                user.medicines = filterMedicines
                user.save()
                res.json(user.medicines)
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

module.exports = medicineController