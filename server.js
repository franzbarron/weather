// Uncomment if using a .env file for environment variables
// require('dotenv').config();

const cors = require('cors');
const express = require('express');
const fetch = require('node-fetch');
const path = require('path');

const server = express();

server.use(cors({ origin: process.env.ORIGIN }));

server.listen(process.env.PORT, () => {
  console.log(`listening on http://localhost:${process.env.PORT}`);
});

server.get('/', (_, res) => {
  res.send('Hello there!');
});

server.get('/geocode/:lat,:lng', async (req, res) => {
  const { lat, lng } = req.params;
  const geocodeData = await fetch(
    `https://api.opencagedata.com/geocode/v1/json?q=${lat},${lng}&key=${process.env.OPENCAGE}`
  )
    .then((data) => data.json())
    .catch((err) => {
      console.error(err.message);
      return res.status(503).json({ error: err.message });
    });

  res.json(geocodeData);
});

server.get('/geocode/:name', async (req, res) => {
  const { name } = req.params;

  encodedName = encodeURIComponent(name);
  const geocodeData = await fetch(
    `https://api.opencagedata.com/geocode/v1/json?q=${encodedName}&key=${process.env.OPENCAGE}`
  )
    .then((data) => data.json())
    .catch((err) => {
      console.error(err.message);
      return res.status(503).json({ error: err.message });
    });

  res.json(geocodeData);
});

server.get('/weather/:units/:lat,:lng', async (req, res) => {
  const { units, lat, lng } = req.params;
  const weatherData = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude=minutely,hourly&units=${units}&appid=${process.env.OPENWEATHER}`
  )
    .then((data) => data.json())
    .catch((err) => {
      console.error(err.message);
      return res.status(503).json({ error: err.message });
    });

  res.json(weatherData);
});

server.get('/air-quality/:lat,:lng', async (req, res) => {
  const { lat, lng } = req.params;
  const geocodeData = await fetch(
    `https://api.waqi.info/feed/geo:${lat};${lng}/?token=${process.env.WAQI}`
  )
    .then((data) => data.json())
    .catch((err) => {
      console.error(err.message);
      return res.status(503).json({ error: err.message });
    });

  res.json(geocodeData);
});

server.get('/*', (_, res) => {
  res.status(404).send('Impossible! Perhaps the archives are incomplete');
});
