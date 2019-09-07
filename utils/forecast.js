/* eslint-disable require-jsdoc */
const request = require('request');

function forecast(lat, lang, location, callback) {
    const url =
        'https://api.darksky.net/forecast/f83f06758635ea5d1753bf6f23c98070/' +
        lat + ',' + lang;
    request({
        url: url,
        json: true,
    }, (error, {body}) => {
        if (error) {
            callback('error in connection', undefined);
        } else if (body.error) {
            callback('Unable to find location', undefined);
        } else {
            callback(undefined, {
                forecast: body.daily.data[0].summary,
                location: location,
            });
        }
    });
}
module.exports = forecast;
