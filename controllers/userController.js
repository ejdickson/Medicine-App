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
    // create: (req, res) => {
    //     const newUser = req.body
    //     User
    //         .create((newUser) => {
    //             res.json
    //         }
    // }
}

module.exports = userController