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
            res.json(savedCreature)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
        // const newUser = new User(req.body.user)
       
        // newUser
        //     .save()
        //     .then((user) => {
        //         res.json(user)
        //     })
        //     .catch((err) => {
        //         console.log(err)
        //     })
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
        // User
        //     .findById(req.params.id)
        //     .then((user) => {
        //         console.log(user)
        //         // user.medicines = user.medicines.reverse()
        //         // res.json(user)
        //     })
        //     .catch((err) => {
        //         console.log(err)
        //     })
    },
}

module.exports = userController