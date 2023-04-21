/* Required modules
-------------------------------------------- */
require('dotenv').config()
const path = require('path')
const express = require('express')
const cors = require('cors')


/* Required routes in controllers folder
-------------------------------------------- */
const reportCtrl = require('./controllers/reports')


/* Required db connection, models
-------------------------------------------- */
const db = require('./models')

/* Create express app
-------------------------------------------- */
const app = express();


/* Middleware
-------------------------------------------- */
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


/* look at controllers to handle routes
-------------------------------------------- */
app.use('/api/reports', reportCtrl);


/* listen to specified port
-------------------------------------------- */
app.listen(process.env.PORT, function () {
    console.log('Express is listening to port', process.env.PORT);
});