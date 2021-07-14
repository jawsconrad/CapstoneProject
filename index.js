const dotenv = require('dotenv').config()
const express = require('express')
const https = require('https')
const path = require('path')
const fs = require('fs')


const app = express()
app.set("view engine", "ejs")

<<<<<<< Updated upstream
app.use("/", (req, res) => {
    res.render('index')
=======
app.use(express.static(__dirname + '/public'))
app.get("/Logo.png", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/images/Logo.png"));
  });
app.get("/COVID.jpg", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/images/COVID-19.jpg"));
  });
app.get("/GroupPic.png", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/images/GroupPic.png"));
  });
app.get("/", (req, res) => {
    res.render('index', {
        title: 'Home - COVID Symptom Tracker'
    })
})
app.get("/login", (req, res) => {
    res.render('login', {
        title: 'Login - COVID Symptom Tracker'
    })
})
app.get("/about", (req, res) => {
    res.render('about', {
        title: 'About - COVID Symptom Tracker'
    })
>>>>>>> Stashed changes
})
app.get("/register", (req, res) => {
    res.render('register', {
        title: 'Register - COVID Symptom Tracker'
    })
})
app.get("/admin", (req, res) => {
        res.render('admin', {
            title: 'Admin - COVID Symptom Tracker'
        })
})
app.get("/contact", (req, res) => {
    res.render('contact', {
        title: 'Contact - COVID Symptom Tracker'
    })
})

https.createServer({
    key: fs.readFileSync(path.join(process.cwd(), 'ssl_cert', 'key.pem')),
    cert: fs.readFileSync(path.join(process.cwd(), 'ssl_cert', 'certificate.pem')),
}, app)
.listen(443, () => {
    console.log('HTTPS server up at port 443.')
})
