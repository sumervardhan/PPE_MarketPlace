const express = require('express')
const app = express()

app.set('view engine', 'ejs')

app.get('/', function (req, res) {
    res.render('index')
})

app.listen(3000, function () {
    console.log("Local server hosted on port 3000")
})