const { Country, Activity } = require('../db.js');

const getCountriesById = async (id) => {
	try {
		const country = await Country.findByPk(id, {
			include: {
				model: Activity,
				attributes: ['id', 'name', 'difficult', 'duration', 'season'],
				through: {
					attributes: [],
				},
			},
		});
		return country;
	} catch (error) {
		return { error: error.message };
	}
};

module.exports = { getCountriesById };