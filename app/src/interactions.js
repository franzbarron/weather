document
    .querySelector('#search-location')
    .addEventListener('click', (e) => {
    toggleLocationButtons();
    document.querySelector('#location-name').focus();
});
document
    .querySelector('#current-location')
    .addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('#loading').classList.remove('hidden');
    navigator.geolocation.getCurrentPosition(gotPosition);
});
document
    .querySelector('#search-form')
    .addEventListener('submit', (e) => {
    e.preventDefault();
    let { value: locationName } = document.querySelector('#location-name');
    document.querySelector('#loading').classList.remove('hidden');
    getLocationCoords(locationName);
    e.target.reset();
});
document.querySelector('#search-form').addEventListener('reset', (e) => {
    toggleLocationButtons();
    document.querySelector('#location-name').value = '';
});
document
    .querySelector('#appearance-btn')
    .addEventListener('click', (e) => {
    if (document.body.classList.contains('bg-dark'))
        setLightMode();
    else
        setDarkMode();
});
document.querySelector('#units-btn').addEventListener('click', (e) => {
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
