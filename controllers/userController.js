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
            // res.send(`Test Create`)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
        // console.log(`Test Create`)
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
    show: (req, res) => {
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
}

module.exports = userController