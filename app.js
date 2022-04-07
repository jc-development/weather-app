require('dotenv').config();

const { geoCode, getForecast } = require("./utils");
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

function getWeatherForecast(address) {
  if (!address) return console.log(`Please enter an address.`);

  geoCode(address, (err, { lon, lat }) => {
    if (err) return console.log(`Error: `, err);

    getForecast(lon, lat, (err, forecastData) => {
      if (err) return console.log(`Error: `, err);

      console.log(forecastData);
    });
  });
}

readline.question('Please enter address for weather forecast: ', (address) => {
  getWeatherForecast(address);
  readline.close();
});
