const express = require('express')
const path = require('path')

const app = express()
app.set("view engine", "ejs")

app.use("/", (req, res) => {
    res.render('index')
})
