/* eslint-disable require-jsdoc */
const request = require('request');

function forecast(lat, lang, location, callback) {
    const url =
        'https://api.darksky.net/forecast/f83f06758635ea5d1753bf6f23c98070/' +
        lat + ',' + lang;
    request({
        url: url,
        json: true,
    }, (error, response) => {
        if (error) {
            callback('error in connection', undefined);
        } else {
            callback(undefined, {
                forecast: response.body.currently.summary,
                location: location,
            });
        }
    });
}
module.exports = forecast;
