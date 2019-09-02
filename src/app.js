const path = require('path');

const express = require('express');
const hbs = require('hbs');

const geocode = require('../utils/geocode');
const forecast = require('../utils/forecast');

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');


// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);

// Setup handlebars config
hbs.registerPartials(partialsPath);


// Setup static directory to serve
app.use(express.static(publicDirectoryPath));


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Mahmoud Zeyada',

    });
});

app.get('/weather', (req, res) => {
    const address = req.query.address;
    if (!address) {
        return res.send({
            error: 'you must provide an address ',
        });
    }


    geocode(address, (error, {lat, long, location} = {}) => {
        if (error) {
            return res.send({error});
        }
        forecast(lat, long, location, (error, data) => {
            if (error) {
                return res.send({
                    error: error,
                });
            }
            data.address = address;
            return res.send(data);
        });
    });
});


app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about',
        name: 'Mahmoud Zeyada',
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is helpful text',
        title: 'Help',
        name: 'Mahmoud Zeyada',
    });
});

app.get('/help/*', (req, res) => {
    res.render('error', {
        errorText: 'Help article not found',
        title: 'Not Found',
        name: 'Mahmoud Zeyada',


    });
});

app.get('*', (req, res) => {
    res.render('error', {
        errorText: 'Page not found',
        title: '404 Error',
        name: 'Mahmoud Zeyada',
    });
});


app.listen(3000, () => {
    console.log('Server is up on port 3000');
});
