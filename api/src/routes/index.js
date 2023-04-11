const express = require('express');
const { Router } = require('express');
const { getAllCountries } = require('../controllers/getAllCountries');
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

//Busqueda por ID
router.get('/:id', async (req, res, next) => {
	const { id } = req.params;
	try {
		const country = await Country.findByPk(id);
		if (!country) {
			return res.status(404).send('Country not found');
		}
		return res.json(country);
	} catch (error) {
		return next(error);
	}
});

module.exports = router;
