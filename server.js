const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const MongoClient = require('mongodb').MongoClient
const app = express()
var port = process.env.PORT || 8080;

app.set('view engine', 'ejs')

const connectionString = 'mongodb+srv://ppedata:samplepassword@cluster0-hpc2g.mongodb.net/test?';

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect(connectionString, {useUnifiedTopology: true}, (err, client) => {

    if (err) return console.error(err)
    console.log('Connected to Database')
    const db = client.db('test')
    const citiesDB = db.collection('cities')

    app.get('/', function (req, res) {
        res.render('templateIndex.ejs', {elements: null, error: null, city: null, supplyType: null});
    })

    app.post('/search', function (req, res) {
        let city = req.body.city
        let supplyType = req.body.supplyType
        db.collection('cities').find().toArray()
            .then(results => {
                res.render('listings.ejs', {elements: results, error: null, city: city, supplyType: supplyType})
            })
            .catch()
    })

    app.post('/addCity', function (req, res) {
        citiesDB.insertOne(req.body)
        res.redirect('/')
    })

    app.listen(port, function () {
        console.log('PPE Marketplace listening on port 3000')
    })
})



