const path = require("path");
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handle bars engine and veiws location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve 
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: "Sayyed Maroof"
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About Me",
        name: 'Sayyed Maroof'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: "hello please tell me how can I help you",
        title: 'Help Page',
        name: 'Sayyed Maroof'
    })
})

// for app.com/weather
app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({ error: "please provide an address" })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({ error: 'you must provide a search term' })
    }
    console.log(req.query.genure)
    res.send({
        products: []
    })
})

// for 404 pages 
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "Error 404!",
        errorMessage: "Help article not found",
        name: "Sayyed Maroof"
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: "Error 404!",
        errorMessage: "page not found",
        name: "Sayyed Maroof"
    })
})

// listening to the port 
app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
})