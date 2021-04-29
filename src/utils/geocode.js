const request = require('postman-request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + 
                        address + 
                        '.json?access_token=pk.eyJ1IjoiZ214bGVlIiwiYSI6ImNra3p3ZW9zNTBsMWQycXA1bzg5dHJ0emoifQ.O0TNXTD0OuCIvXaLMhBrrA&limit=1'

    request.get({ url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to geocoding service!', undefined)
        } else if (response.body.features.length === 0) {
            callback('Unable to find location.', undefined)
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode