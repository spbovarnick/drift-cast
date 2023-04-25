const express = require('express')
const router = express.Router()
const db = require("../models")
const multer  = require('multer')
const crypto = require('crypto')
const { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");



const storage = multer.memoryStorage()
const upload = multer({ storage: storage })


require('dotenv').config()

// assigning S3 variable from .env
const bucketName = process.env.BUCKET_NAME
const bucketRegion = process.env.BUCKET_REGION
const s3AccessKey = process.env.S3_ACCESS_KEY
const s3SecretAccessKey = process.env.S3_SECRET_ACCESS_KEY

// random name generator
const randomImageName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex')

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
router.get('/river/:siteCode', async function(req, res) {
    const reports = await db.Report.find({ siteCode: req.params.siteCode })
    for (const report of reports) {
        if (report.image) {
            const command = new GetObjectCommand({
                Bucket: bucketName,
                Key: report.image,
            });
            const url = await getSignedUrl(s3, command, { expiresIn: 604799 });
            report.image = url
        } 
    }
    res.json(reports)
})

router.get('/', async function(req, res) {
    const reports = await db.Report.find({ })
    for (const report of reports){
        if (report.image){
            const command = new GetObjectCommand({
                Bucket: bucketName,
                Key: report.image,
            });
            const url = await getSignedUrl(s3, command, { expiresIn: 604799 });
            report.image = url
        }
    }

    res.json(reports)
})

// Create route (POST)
router.post('/', upload.single('image'), async (req, res) => {
    // console.log("req.body", req.body)
    // console.log("req.file", req.file)
    if (req.file) {
        // load filed to memory
        req.file.buffer 
        // generate random name
        const imageName = randomImageName()
        // instantiate new PutObjecCommand object with
        // S3 bucket credentials and file name
        const command = new PutObjectCommand({
            Bucket: bucketName,
            Key: imageName,
            Body: req.file.buffer,
            ContentType: req.file.mimetype,
        })
        // match image field value to S3 file name
        req.body.image = imageName
        try {
            // send file to S3 bucket
            await s3.send(command)
        } catch (error) {
            console.log(error)
        } finally {
            // send report object to MongoDB
            db.Report.create(req.body)
                .then(report => res.json(report))
    }} else {
        // send report object to MongoDB
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
router.delete('/:id', async (req, res) => {
    const report = await db.Report.findOne({ _id: req.params.id })
    
    const command = new DeleteObjectCommand({
        Bucket: bucketName,
        Key: report.image
    })
    await s3.send(command)


    await db.Report.findByIdAndRemove(req.params.id)
        .then(report => res.send('deleted'))
})


module.exports = router