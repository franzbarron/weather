let iconsList: JSON;
let units = 'metric';

// URL to where API calls are made.
// const baseURL = 'https://weather-air-quality-app.herokuapp.com';
const baseURL = 'http://localhost:8080';

// If you host the server on a service like Heroku or Glitch, it might be a good
// idea to send a GET request in case it's down for inactivity.
// fetch(baseURL).then(() => {
//   console.log('Server awake');
// });

// Get JSON that maps weather icon name with their respective class
(async () => {
  iconsList = await fetch('./src/icons.json').then((data) => data.json());
})();

async function gotPosition(position: Position) {
  const { latitude, longitude } = position.coords;

  const locationData = await fetch(
    `${baseURL}/geocode/${latitude},${longitude}`
  )
    .then((data: Response) => data.json())
    .catch((err: Error) => {
      console.error(`An error ocurred: ${err}`);
      if (err.message === 'Failed to fetch')
        showError(`There was a problem connecting to the web.`);
      return;
    });

  const parsedLocation = parseLocation(locationData.results[0].components);
  showLocation(parsedLocation);

  document.querySelector('#location-data').classList.remove('hidden');
  document.querySelector('#error').classList.add('hidden');

  getWeatherData(latitude, longitude);
  getAirQuality(latitude, longitude);
}

function parseLocation(data) {
  const thirdLevel = (data.city ?? data.county) as string;
  const secondLevel = (data.state ?? '') as string;
  const firstLevel = data.country as string;

  return { firstLevel, secondLevel, thirdLevel };
}

function showError(error: string) {
  document.querySelector('#location-data').classList.add('hidden');
  document.querySelector('#error').classList.remove('hidden');

  document.querySelector('#error-message').textContent = error;

  // Hide loading spinner
  document.querySelector('#loading').classList.add('hidden');
}

async function getLocationCoords(locationName: string) {
  const locationData = await fetch(`${baseURL}/geocode/${locationName}`)
    .then((data) => data.json())
    .catch((err: Error) => {
      console.error(`An error ocurred: ${err}`);
      if (err.message === 'Failed to fetch')
        showError(`There was a problem connecting to the web.`);
      return;
    });

  if (locationData.results.length === 0) {
    console.error(`An error ocurred: No data found for ${locationName}`);
    showError(`Sorry! We couldn't find a place called ${locationName}.`);
    return;
  }

  const { lat, lng } = locationData.results[0].geometry as {
    lat: number;
    lng: number;
  };

  const parsedLocation = parseLocation(locationData.results[0].components);
  showLocation(parsedLocation);

  document.querySelector('#location-data').classList.remove('hidden');
  document.querySelector('#error').classList.add('hidden');

  getWeatherData(lat, lng);

  getAirQuality(lat, lng);
}

function showLocation(data) {
  let locationName = '';

  if (data.thirdLevel) locationName += `${data.thirdLevel}, `;
  if (data.secondLevel) locationName += `${data.secondLevel}, `;
  locationName += `${data.firstLevel}`;

  document.querySelector('#location').textContent = locationName;

  // Hide loading spinner
  document.querySelector('#loading').classList.add('hidden');
}

// Calculates the distance in kilometers between two coordinate points
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d;
}
