const mongoose = require('mongoose')

const reportSchema = new mongoose.Schema({
    siteCode: {
        type: Number,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    tripDate: {
        type: Date,
        required: false
    },
    gageHeight: {
        type: Number,
        required: false
    },
    report: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    imageUrl: {
        type: String,
        required: false
    }
}, { timestamps: true})

module.exports = mongoose.model('Report', reportSchema)