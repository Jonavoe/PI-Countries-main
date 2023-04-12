const express = require('express');
const { Router } = require('express');
const { getAllCountries } = require('../controllers/getAllCountries');
const { getCountriesById } = require('../controllers/getCountriesById');
const { getCountriesByName } = require('../controllers/getCountriesByName');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

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
        return next(error);
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
		return next(error);
	}
});

module.exports = router;
