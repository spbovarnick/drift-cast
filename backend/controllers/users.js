const jwt = require('jwt-simple')
const express = require('express')
const router = express.Router()

// require db connex
const db = require("../models")

//  require JWT config
const config = require('../../jwt.config.js')

// create user
router.post('/signup', (req, res) => {
    console.log(req.body)
    // create a new user
    db.User.create(req.body)
        .then(user => {
            console.log(user)
            const token = jwt.encode({ id: user.id }, config.jwtSecret)
            res.json({ token: token })
            return
        })
        .catch(() => {
            res.sendStatus(401)
                .json({ data: 'Could not create a new user, try again'})
        })
})

// login to user acct
router.post('/login', async (req, res) => {
    // find user by email in the db
    const foundUser = await db.User.findOne({ email: req.body.email })

    // check that user is found and entered correct pwd
    if (foundUser && foundUser.password === req.body.password) {
        // construct and send JWT to browser
        const payload = { id: foundUser.id }
        const token = jwt.encode(payload, config.jwtSecret)
        res.json({
            token: token,
            email: foundUser.email,
            username: foundUser.username
        })
    } else {
        res.sendStatus(401)
    }
})

// export routes to be accessible to server
module.exports = router