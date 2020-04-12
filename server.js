const express = require('express')
app.set('view engine', 'ejs')

const app = express()

app.get('/', function (req, res) {
    res.render('index')
})

app.listen(3000, function () {
    console.log("Local server hosted on port 3000")
})