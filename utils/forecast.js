/* eslint-disable require-jsdoc */
const request = require('request');

function forecast(lat, lang, location, callback) {
    const url =
        'https://api.darksky.net/forecast/f83f06758635ea5d1753bf6f23c98070/' +
        lat + ',' + lang;
    request({
        url: url,
        json: true,
    }, (error, { body }) => {
        if (error) {
            callback('error in connection', undefined);
        } else if (body.error) {
            callback('Unable to find location', undefined);
        } else {
            const forecast = body.daily.data[0].summary + ' it is currently '
                + body.currently.temperature
                + ' degrees out. there is a '
                + body.currently.precipProbability
                + ' the temperature high is '
                + body.daily.data[0].temperatureHigh
                + ' the temperature low is '
                + body.daily.data[0].temperatureLow;

            callback(undefined, {
                forecast: forecast,
                location: location,
            });
        }
    });
}
module.exports = forecast;
