const express = require('express')
const router = express.Router()
const db = require("../models")
const multer  = require('multer')
// const upload = multer({ dest: 'uploads/' })


const storage = multer.memoryStorage()
const upload = multer({ storage: storage })


// Multer middleware



/* Routes
------------------------------ */ 
// Index route (GET), displays all
router.get('/', function(req, res) {
    db.Report.find({ })
        .then(reports => res.json(reports))
})

// Create route (POST)
router.post('/', upload.single('image'), async (req, res) => {
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

// Destroy route (DELETE)
router.delete('/:id', (req, res) => {
    db.Report.findByIdAndRemove(req.params.id)
        .then(report => res.send('deleted'))
})


module.exports = router