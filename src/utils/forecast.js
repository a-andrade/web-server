const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=177fb2c3cca1b61f2b789e04a00a3020&query=' + latitude + ',' + longitude + '&units=f'

    request.get({ url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (response.body.error) {
            callback('Unable to find weather.', undefined)
        } else {
            callback(undefined, `${response.body.current.weather_descriptions[0]}. ` + 
                                `It is currently ${response.body.current.temperature} degrees out.` + 
                                `It feels like ${response.body.current.feelslike} degrees out.`)
        }
    })
}

module.exports = forecast