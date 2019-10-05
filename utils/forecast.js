/* eslint-disable require-jsdoc */
const request = require('request');

const client = require('../redis_server/redisConnections');

function forecast(lat, lang, location, callback) {
    const url =
        'https://api.darksky.net/forecast/f83f06758635ea5d1753bf6f23c98070/' +
        lat + ',' + lang;

    client.get(`forecast:${location}`,(err, result) => {
      if (result) {
        return callback(undefined,{forecast: result,location: location})
      }
      if (err) {
        return callback(err, undefined);
      }
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
          client.setex(`forecast:${location}`, 3600, forecast);

          callback(undefined, {
            forecast: forecast,
            location: location,
          });
        }
      });

    })
    
    
}
module.exports = forecast;
