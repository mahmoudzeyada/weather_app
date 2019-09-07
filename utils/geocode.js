const request = require('request');


const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoibWFobW91ZHpleWFkYSIsImEiOiJjanZsbXc3eXcwY2tsNDlsZXludTFqeDl4In0.YekFa_12h0qfOv1VwZ3mPw';

    request({
        url: url,
        json: true,
    }, (error, {body}) => {
        if (error) callback('cannot connect to location', undefined);
        else if (body.features.length === 0) {
            callback('the location is mistake try again', undefined);
        } else {
            const lat = body.features[0].center[0];
            const long = body.features[0].center[1];
            const location = body.features[1].properties.address;

            callback(undefined, {
                lat: lat,
                long: long,
                location: location,
            });
        }
    });
};

module.exports = geocode;
