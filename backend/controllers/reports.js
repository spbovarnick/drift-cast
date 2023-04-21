const express = require('express')
const router = express.Router()
const db = require("../models")

/* Routes
------------------------------ */ 
// index route (GET), displays all
// index route (GET), displays all 
router.get('/', function(req, res) {
    db.Report.find({ })
        .then(reports => res.json(reports))
})

// Create route (POST)
router.post('/', (req, res) => {
    db.Report.create(req.body)
        .then(report => res.json(report))
})

// Update Route (PUT)
router.put('/:id', (req, res) => {
    db.Report.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
        .then(report => res.json(report))
})



module.exports = router