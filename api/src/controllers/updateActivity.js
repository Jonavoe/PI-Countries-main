const { Activity, Country } = require('../db');

const updateActivity = async (req, res) => {
	try {
		const { id } = req.params;
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

		const activity = await Activity.findByPk(id);

		if (!activity) {
			return res.status(404).json({ message: 'Activity not found' });
		}

		await activity.update({
			name,
			difficult,
			duration,
			season,
		});

		if (countries && countries.length) {
			const countryInstances = await Country.findAll({
				where: { id: countries },
			});
			await activity.setCountries(countryInstances);
		}

		res.status(200).json(activity);
	} catch (error) {
		console.error(error);
		res
			.status(500)
			.json({ message: 'Error updating activity', error: error.message });
	}
};

module.exports = { updateActivity };
