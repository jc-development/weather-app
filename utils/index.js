const request = require("postman-request");

const geoCode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${process.env.MAPBOX}&limit=1`;

  request({ url, json: true }, (err, res) => {
    if (err) {
      callback(`Unable to connect to location services.`, undefined);
    } else if (res.body.features.length === 0) {
      callback(`Unable to find location.`, undefined);
    } else {
      const {
        features: [first],
      } = res.body;
      const {
        center: [lat, lon],
      } = first;
      callback(undefined, { lat, lon });
    }
  });
};

const getForecast = (lon, lat, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=${process.env.WEATHER_STACK}&query=${lon},${lat}&units=f`;

  request({ url, json: true }, (err, res) => {
    if (err) {
      // handle low level OS msg; like no network connection
      callback(`Unable to connect to weather service`, undefined);
    } else if (res.body.error) {
      // handle an error response from api, like bad input
      callback(`Unable to find location.`, undefined);
    } else {
      const {
        current: { temperature, feelslike, weather_descriptions },
        location: { name, region },
      } = res.body;

      callback(undefined,
        `${weather_descriptions[0]}. In ${name} ${region}, it is currently ${temperature} F degrees out. It feels like ${feelslike} F degrees out.`
      );
    }
  });
};

module.exports = {
  geoCode,
  getForecast
};
