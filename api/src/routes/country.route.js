const { Router } = require('express');
const countryController = require('../controllers/country.controller');
const countryRoutes = Router();

countryRoutes.get('/', countryController.getCountries);
countryRoutes.get('/:code', countryController.getCountryByCode);



module.exports = countryRoutes;

