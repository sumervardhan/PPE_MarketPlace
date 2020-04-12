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

    app.post('/', function (req, res) {
        let city = req.body.city;
        let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

        request(url, function (err, response, body) {
            if(err){
                res.render('index', {weather: null, error: 'Error, please try again'});
            } else {
                let weather = JSON.parse(body)
                if(weather.main == undefined){
                    res.render('index', {weather: null, error: 'Error, please try again'});
                } else {
                    let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
                    res.render('index', {weather: weatherText, error: null});
                }
            }
        });
    })

    app.post('/addCity', function (req, res) {
        citiesDB.insertOne(req.body)
        res.render('index', {weather: null, error: null});
    })

    app.listen(3000, function () {
        console.log('PPE Marketplace listening on port 3000!')
    })
})



