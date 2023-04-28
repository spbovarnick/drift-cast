const jwt = require('jwt-simple')
const express = require('express')
const router = express.Router()
const db = require("../models")
// multer package
const multer  = require('multer')
// name encyption/generator
const crypto = require('crypto')
// image resizer
const sharp = require('sharp')
// s3 middleware
const { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

// storage to handle file upload
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

// JWT config
const config = require('../../jwt.config.js')

/* JWT middleware to check if a JWT sent from client
is valid on all routes that require auth
-----------------------------------------------------*/
const authMiddleware = (req, res, next) => {
    // check for 'Authorization' header for toke
    const token = req.headers.authorization;
    if (token) {
        try {
            // decode token with secret key, add decoded payload to req
            const decodedToken = jwt.decode(token, config.jwtSecret);
            req.user = decodedToken;
            next();
        } catch (err) {
            res.status(401).json({ message: 'Invalid token' });
        }
    } else {
        // error if 'Authorization' header missing or inccorrect
        res.status(401).json({ message: 'Missing or invalid Authorization header' })
    }
}

// access to AWS/S3 keys in .env
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
    const reports = await db.Report.find({ siteCode: req.params.siteCode }).sort([['createdAt', -1]])
    for (const report of reports) {
        if (report.image) {
            const command = new GetObjectCommand({
                Bucket: bucketName,
                Key: report.image,
            });
            const url = await getSignedUrl(s3, command, { expiresIn: 604799 });
            report.imageUrl = url
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
router.post('/', upload.single('image'),  authMiddleware, async (req, res) => {
    if (req.file) {
        // load filed to memory
        const imgClean = await sharp(req.file.buffer)
                            .resize({
                                height: null,
                                width: 720
                            })
                            .jpeg({ mozjpeg: true })
                            .toBuffer()
        // generate random name
        const imageName = randomImageName()
        // instantiate new PutObjecCommand object with
        // S3 bucket credentials and file name
        const command = new PutObjectCommand({
            Bucket: bucketName,
            Key: imageName,
            Body: imgClean,
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
            db.Report.create({
                ...req.body,
                userId: req.user.id
            })
                .then(report => res.json(report))
    }} else {
        // send report object to MongoDB
        db.Report.create({
            ...req.body,
            userId: req.user.id
        })
            .then(report => res.json(report))
    }

})

// Update Route (PUT)
router.put('/:id', upload.single('image'), authMiddleware, async (req, res) => {
    const userReport = await db.Report.findById(req.params.id)
    if (userReport.userId == req.user.id) {
        if (req.file) {
            // load file to memory
            const imgClean = await sharp(req.file.buffer)
                                .resize({
                                    height: null,
                                    width: 720
                                })
                                .jpeg({ mozjpeg: true })
                                .toBuffer() 
            // generate random name
            const imageName = randomImageName()
            // instantiate new PutObjecCommand object with
            // S3 bucket credentials and file name
            const command = new PutObjectCommand({
                Bucket: bucketName,
                Key: imageName,
                Body: imgClean,
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
                db.Report.findByIdAndUpdate(
                    req.params.id,
                    req.body,
                    { new: true }
                )
                    .then(report => res.json(report))
        }} else {
            db.Report.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            )
                .then(report => res.json(report))
        }
    } else {
        res.status(401).json({ message: 'Invalid user or token' })
    }
})

// Destroy route (DELETE)
router.delete('/:id', authMiddleware, async (req, res) => {

    const userReport = await db.Report.findById(req.params.id)
    if (userReport.userId == req.user.id) {
        if (report.image){
            const command = new DeleteObjectCommand({
                Bucket: bucketName,
                Key: report.image
            })
            await s3.send(command)
            await db.Report.findByIdAndRemove(req.params.id)
                .then(report => res.send('deleted'))
        } else {
            await db.Report.findByIdAndRemove(req.params.id)
                .then(report => res.send('deleted'))
        }
    }
})


module.exports = router