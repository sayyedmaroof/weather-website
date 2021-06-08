const request = require("request");

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/forecast?access_key=ba3384a9b31ef37995bbaa022a67c5de&query=${latitude},${longitude}&units=m`
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect the weather forecast services", undefined)
        } else if (body.error) {
            callback("Unable to find the location", undefined)
        } else {
            callback(undefined, {
                string: `Here in ${body.location.name}, ${body.location.region}, ${body.location.country}, conditions are ${body.current.weather_descriptions[0]}. It's currently ${body.current.temperature} degrees out and it feels like ${body.current.feelslike} degrees out. The humidity is ${body.current.humidity}%.`,
                iconUrl: body.current.weather_icons[0]
            })
        }
    })
}

module.exports = forecast;