const express = require('express')
const router = express.Router()
const db = require("../models")
const multer  = require('multer')
// const S3Client = require('S3Client')
// const PutObjectCommand = require('PutObjectCommand')
// import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
require('dotenv').config()

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const bucketName = process.env.BUCKET_NAME
const bucketRegion = process.env.BUCKET_REGION
const s3AccessKey = process.env.S3_ACCESS_KEY
const s3SecretAccessKey = process.env.S3_SECRET_ACCESS_KEY

// new S3 object
const s3 = new S3Client({
    credentials: {
        accessKeyId: s3AccessKey,
        secretAccessKey: s3SecretAccessKey
    },
    region: bucketRegion
})

/* Routes
------------------------------ */ 
// Index route (GET), displays all
router.get('/', function(req, res) {
    db.Report.find({ })
        .then(reports => res.json(reports))
})

// Create route (POST)
router.post('/', upload.single('image'), async (req, res) => {
    // console.log("req.body", req.body)
    // console.log("req.file", req.file)

    req.file.buffer

    const commandParams = {
        Bucket: bucketName,
        Key: req.file.originalname,
        Boyd: req.file.buffer,
        ContentType: req.file.mimetype,
    }
    
    const command = new PutObjectCommand(commandParams)

    try {
        await s3.send(command)
    } catch (error) {
        console.log(error)
    } finally {
        db.Report.create(req.body)
            .then(report => res.json(report))
    }

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