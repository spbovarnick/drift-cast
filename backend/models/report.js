const mongoose = require('mongoose')

const reportSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    // tripDate: {
    //     type: Date,
    //     required: false
    // },
    // tripTime: {
    //     type: Date,
    //     required: false
    // },
    report: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('Report', reportSchema)