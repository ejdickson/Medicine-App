const Medicine = require('../models/Medicine')
const User = require('../models/User')

const medicineController = {
    index: (req, res) => {
        User
            .findById(req.params.userId)
            .then((user) => {
                user.medicines = user.medicines.reverse()
                res.json(user)
            })
            .catch((err) => {
                console.log(err)
            })
    },
    create: (req, res) => {
        User
            .findById(req.params.userId)
            .then((user) => {
                const newMedicine = new Medicine({})
                user.medicines.push(newMedicine)
                user
                    .save()
                    .then((user) => {
                        res.json(newMedicine)
                    })
            })
    },
    show: async (req, res) => {
        try {
            const userId = req.params.id
            const user = await User.findById(userId)
            res.json(user)
        } catch (err) {
            console.log(err)
            res.json(err)
        }
    },
    update: async (req, res) => {
        try {
            const userId = req.params.id
            const updatedUser = req.body
            const savedUser = await User.findByIdAndUpdate(userId, updatedUser)
            res.json(savedUser)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    },
    delete: async (req, res) => {
        try {
            const userId = req.params.id
            await User.findByIdAndRemove(userId)
            res.json({
                msg: `Successfully Deleted ${userId}`
            })
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    }
}

module.exports = medicineController