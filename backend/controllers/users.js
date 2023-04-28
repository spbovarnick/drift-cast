const jwt = require('jwt-simple')
const express = require('express')
const router = express.Router()

// require db connex
const db = require("../models")

//  require JWT config
const config = require('../../jwt.config.js')

// get user
router.get('/:userId', (req, res) => {
    db.User.findById(req.params.userId)
        .then(user => {
            console.log(user)
            res.json(user)
            return
        })
})

// create user
router.post('/signup', (req, res) => {
    // create a new user
    db.User.create(req.body)
        .then(user => {
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
    const foundUser = await db.User.findOne({ username: req.body.username })

    // check that user is found and entered correct pwd
    if (foundUser && foundUser.password === req.body.password) {
        // construct and send JWT to browser
        const payload = { id: foundUser.id }
        const token = jwt.encode(payload, config.jwtSecret)
        res.json({
            token: token,
            email: foundUser.email,
            userName: foundUser.username,
            userId: foundUser.id
        })
    } else {
        res.sendStatus(401)
    }
})

// export routes to be accessible to server
module.exports = router