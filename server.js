const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const MongoClient = require('mongodb').MongoClient
const app = express()

const apiKey = 'bd36cbc804584441c7c21b948094a79e';
const connectionString = 'mongodb+srv://ppedata:samplepassword@cluster0-hpc2g.mongodb.net/test?';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

MongoClient.connect(connectionString, {useUnifiedTopology: true}, (err, client) => {

    if (err) return console.error(err)
    console.log('Connected to Database')
    const db = client.db('test')
    const citiesDB = db.collection('cities')

    app.get('/', function (req, res) {
        res.render('index', {weather: null, error: null});
    })

    app.get('/search', function (req, res) {
        db.collection('cities').find().toArray()
            .then(results => {
                res.render('listings.ejs', {elements: results, error: null, city: null, supplyType: null})
            })
            .catch(/* ... */)
    })

    app.post('/search', function (req, res) {
        let city = req.body.city
        let supplyType = req.body.supplyType
        console.log(city)
        console.log(supplyType)
        db.collection('cities').find().toArray()
            .then(results => {
                res.render('listings.ejs', {elements: results, error: null, city: city, supplyType: supplyType})
            })
            .catch()
    })

    app.post('/addCity', function (req, res) {
        citiesDB.insertOne(req.body)
        res.render('index');
    })

    app.listen(3000, function () {
        console.log('PPE Marketplace listening on port 3000')
    })
})



