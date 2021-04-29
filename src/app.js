const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlbars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (request, response) => {
    response.render('index', {
        title: 'Weather',
        name: 'Eren Jaeger'
    })
})

app.get('/about', (request, response) => {
    response.render('about', {
        title: 'About me',
        name: 'Eren Jaeger'
    })
})

app.get('/help', (request, response) => {
    response.render('help', {
        message: 'I need somebody! Not just anybody! You know I need someone! HELLLLLLLP!',
        title: 'Help!',
        name: 'Eren Jaeger'
    })
})

app.get('/weather', (request, response) => {
    if (!request.query.address) {
        return response.send({
            error: 'You must provide an address.'
        })
    }

    geocode(request.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            console.log(error)
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                console.log('error')
            }

            response.send({
                forecast: forecastData,
                location,
                address: request.query.address
            })
        })
    })
})

app.get('/products', (request, response) => {
    response.send({
        products: []
    })
})

app.get('/help/*', (request, response) => {
    response.render('404', {
        title: '404',
        name: 'Eren Jaeger',
        message: 'Help article not found'
    })
})

app.get('*', (request, response) => {
    response.render('404', {
        title: '404',
        name: 'Eren Jager',
        message: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})