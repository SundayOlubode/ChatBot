const express = require('express')
const app = express()
require('dotenv').config()

// PARSE REQUEST BODY
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.send('Welcome!')
})


module.exports = app