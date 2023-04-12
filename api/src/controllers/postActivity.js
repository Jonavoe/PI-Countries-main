const { Activity } = require('../db');

const postActivity = async (req, res) => {
	try {
		const { name, difficult, duration, season, countries } = req.body;

		const activity = await Activity.create({
			name,
			difficult,
			duration,
			season,
		});

		// Relacionar la actividad con los países indicados
		if (countries && countries.length) {
			await activity.addCountries(countries);
		}

		res.status(201).json(activity);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Error creating activity' });
	}
};

module.exports = { postActivity };
