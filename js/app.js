let locations = require('./location_autocomplete');

let locationInputs = document.getElementsByClassName('location-autocomplete');

Array.from(locationInputs).forEach(input => locations.autoComplete(input, {location: 'ru_RU'}));