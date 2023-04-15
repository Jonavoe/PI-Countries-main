const { Activity, Country } = require('../db');

const postActivity = async (req, res) => {
	try {
		// Validar entrada
		const { name, difficult, duration, season, countries } = req.body;

		if (!name || !difficult || !duration || !season) {
			return res.status(400).json({ message: 'Missing required fields' });
		}

		if (
			typeof name !== 'string' ||
			typeof difficult !== 'number' ||
			typeof duration !== 'number' ||
			typeof season !== 'string'
		) {
			return res.status(400).json({ message: 'Invalid input format' });
		}

		const activity = await Activity.create({
			name,
			difficult,
			duration,
			season,
		});

		// Relacionar la actividad con los países indicados
		if (countries && countries.length) {
			const countryInstances = await Country.findAll({
				where: { id: countries },
			});
			await activity.addCountries(countryInstances);
		}

		res.status(201).json(activity);
	} catch (error) {
		// Manejar errores
		console.error(error);
		res
			.status(500)
			.json({ message: 'Error creating activity', error: error.message });
	}
};

module.exports = { postActivity };

// const { Activity } = require('../db');

// const postActivity = async (req, res) => {
// 	try {
// 		// Validar entrada
// 		const { name, difficult, duration, season, countries } = req.body;

// 		if (!name || !difficult || !duration || !season) {
// 			return res.status(400).json({ message: 'Missing required fields' });
// 		}

// 		if (
// 			typeof name !== 'string' ||
// 			typeof difficult !== 'number' ||
// 			typeof duration !== 'number' ||
// 			typeof season !== 'string'
// 		) {
// 			return res.status(400).json({ message: 'Invalid input format' });
// 		}

// 		const activity = await Activity.create({
// 			name,
// 			difficult,
// 			duration,
// 			season,
// 		});

// 		// Relacionar la actividad con los países indicados
// 		if (countries && countries.length) {
// 			await activity.addCountries(countries);
// 		}

// 		res.status(201).json(activity);
// 	} catch (error) {
// 		// Manejar errores
// 		console.error(error);
// 		res
// 			.status(500)
// 			.json({ message: 'Error creating activity', error: error.message });
// 	}
// };

// module.exports = { postActivity };

// const { Activity } = require('../db');

// const postActivity = async (req, res) => {
// 	try {
// 		const { name, difficult, duration, season, countries } = req.body;

// 		const activity = await Activity.create({
// 			name,
// 			difficult,
// 			duration,
// 			season,
// 		});

// 		// Relacionar la actividad con los países indicados
// 		if (countries && countries.length) {
// 			await activity.addCountries(countries);
// 		}

// 		res.status(201).json(activity);
// 	} catch (error) {
// 		console.error(error);
// 		res.status(500).json({ message: 'Error creating activity' });
// 	}
// };

// module.exports = { postActivity };
