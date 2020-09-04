document
  .querySelector('#search-location')
  .addEventListener('click', (e: Event) => {
    toggleLocationButtons();
    (document.querySelector('#location-name') as HTMLFormElement).focus();
  });

document
  .querySelector('#current-location')
  .addEventListener('click', (e: Event) => {
    e.preventDefault();

    // Show loading spinner
    document.querySelector('#loading').classList.remove('hidden');
    navigator.geolocation.getCurrentPosition(gotPosition);
  });

document
  .querySelector('#search-form')
  .addEventListener('submit', (e: Event) => {
    e.preventDefault();

    let { value: locationName } = document.querySelector(
      '#location-name'
    ) as HTMLInputElement;

    // Show loading spinner
    document.querySelector('#loading').classList.remove('hidden');

    getLocationCoords(locationName);
    // Trigger reset event to clear data and show location buttons
    (e.target as HTMLFormElement).reset();
  });

document.querySelector('#search-form').addEventListener('reset', (e: Event) => {
  toggleLocationButtons();
  (document.querySelector('#location-name') as HTMLInputElement).blur();
  (document.querySelector('#location-name') as HTMLInputElement).value = '';
});

document
  .querySelector('#appearance-btn')
  .addEventListener('click', (e: Event) => {
    if (document.body.classList.contains('bg-dark')) setLightMode();
    else setDarkMode();
  });

document.querySelector('#units-btn').addEventListener('click', (e: Event) => {
  document.querySelector('#units-icon').classList.toggle('wi-fahrenheit');
  document.querySelector('#units-icon').classList.toggle('wi-celsius');
  document
    .querySelectorAll('.temperature')
    .forEach((elt) => elt.classList.toggle('hidden'));
  units = units === 'metric' ? 'imperial' : 'metric';
});

function toggleLocationButtons() {
  document.querySelector('#location-buttons').classList.toggle('hidden');
  document.querySelector('#search-form').classList.toggle('hidden');
}
