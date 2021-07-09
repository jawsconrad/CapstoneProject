const dotenv = require('dotenv').config()
const express = require('express')
const https = require('https')
const path = require('path')
const fs = require('fs')
const exp = require('constants')

const app = express()
app.set("view engine", "ejs")
app.use(express.static(__dirname + '/public'))
app.use("/", (req, res) => {
    res.render('index')
})


https.createServer({
    key: fs.readFileSync(path.join(process.cwd(), 'ssl_cert', 'key.pem')),
    cert: fs.readFileSync(path.join(process.cwd(), 'ssl_cert', 'certificate.pem')),
}, app)
.listen(443, () => {
    console.log('HTTPS server up at port 443.')
})
