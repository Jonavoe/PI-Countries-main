const express = require('express');
const { Router } = require('express');
const { getAllCountries } = require('../controllers/getAllCountries');
const { getCountriesById } = require('../controllers/getCountriesById');
const { getCountriesByName } = require('../controllers/getCountriesByName');
const { postActivity } = require('../controllers/postActivity');
const { saveApiData } = require('../controllers/getApiData');
const { getAllActivities } = require('../controllers/getAllActivities');
const { deleteActivity } = require('../controllers/deleteActivity');


const router = Router();

saveApiData();

//Busca todos los paises
router.get('/countries', async (req, res) => {
	try {
		const allCountries = await getAllCountries();
		res.status(200).json(allCountries);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

//Busqueda por name Query
router.get('/countries/name', async (req, res, next) => {
	const { name } = req.query;
	try {
		const countries = await getCountriesByName(name);
		return res.json(countries);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
});

//Busqueda por ID
router.get('/countries/:id', async (req, res, next) => {
	const { id } = req.params;
	try {
		const country = await getCountriesById(id);
		if (!country) {
			return res.status(404).send('Country not found');
		}
		return res.json(country);
	} catch (error) {
		return next(ererror.messageror);
	}
});
router.get('/activities', async (req, res, next) => {
	try {
		const activity = await getAllActivities();
		if (!activity) {
			return res.status(404).send('No tengo Actividades');
		}
		return res.json(activity);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
});

//Post activity
router.post('/activities', postActivity);

router.delete('/activities/:id', deleteActivity);

module.exports = router;
