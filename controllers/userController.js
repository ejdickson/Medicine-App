const User = require('../models/User')

const userController = {
    index: (req, res) => {
        User
            .find()
            .then((users) => {
                res.json(users)
            })
            .catch((err) => {
                console.log(err)
            })
    },
    create: async (req, res) => {
        try {
            const newUser = req.body
            const savedUser = await User.create(newUser)
            res.json(savedUser)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    },
    show: async (req, res) => {
        try {
            const userId = req.params.userId
            const user = await User.findById(userId)
            res.json(user)
        } catch (err) {
            console.log(err)
            res.json(err)
        }
    },
    update: async (req, res) => {
        try {
            const userId = req.params.userId
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
            const userId = req.params.userId
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

module.exports = userController