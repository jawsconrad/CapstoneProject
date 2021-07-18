const dotenv = require('dotenv').config()
const express = require('express')
const https = require('https')
const path = require('path')
const fs = require('fs')
const mongoose = require('mongoose')
const User = require('./model/user')
const app = express()

app.set("view engine", "ejs")
app.use(express.json())

app.use(express.static(__dirname + '/public'))
/**Creates links for images and pages...Makes titles for pages as well**/
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
app.get("/addData", (req, res) => {
    res.render('addData', {
        title: 'Add Your Data - COVID Symptom Tracker'
    })
})
app.get("/about", (req, res) => {
    res.render('about', {
        title: 'About - COVID Symptom Tracker'
    })
})
app.get("/contact", (req, res) => {
    res.render('contact', {
        title: 'Contact - COVID Symptom Tracker'
    })
})
/**Posts data to database(Mongodb)...Could be configured for other databases**/
app.post('/addData', async (req, res) => {
    await mongoose.connect('mongodb+srv://Admin:'+ process.env.MONGO_PWD +'@cluster0.gf4wr.mongodb.net', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,        
        useCreateIndex: true
    }).then(() => console.log("Connection Opened")).catch(err => console.log(err.reason))
    /**Creates data fields for the symptoms to be stored in database...can be changed for other databases**/
    try { 
        const { username, symptoms } = req.body
        const coughing = req.body.symptoms.coughing
        const sneezing = req.body.symptoms.sneezing
        const aches = req.body.symptoms.aches
        const fever = req.body.symptoms.fever
        const response = await User.create({
            username,
            symptoms: {coughing: coughing, sneezing: sneezing, aches: aches, fever: fever}
        })
        console.log('User Created', response)
    } catch (error) {
        console.log(error)
        console.log(req.body)
    }
})

https.createServer({
    key: fs.readFileSync(path.join(process.cwd(), 'ssl_cert', 'key.pem')),
    cert: fs.readFileSync(path.join(process.cwd(), 'ssl_cert', 'certificate.pem')),
}, app)
.listen(443, () => {
    console.log('HTTPS server up at port 443.')
})
