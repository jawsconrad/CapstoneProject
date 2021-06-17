const dotenv = require('dotenv').config()
const express = require('express')
const https = require('https')
const path = require('path')


const app = express()
app.set("view engine", "ejs")

app.use("/", (req, res) => {
    res.render('index')
})

https.createServer({
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem'),
    passphrase: dotenv.config
}, app)
.listen(443)