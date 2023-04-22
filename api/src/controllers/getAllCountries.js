const { Country, Activity } = require('../db.js');

const getAllCountries = async () => {
	try {
		const countries = await Country.findAll({
			include: {
				model: Activity,
				attributes: ['id', 'name', 'difficult', 'duration', 'season'],
				through: {
					attributes: [],
				},
			},
		});
		return countries;
	} catch (error) {
		return { error: error.message };
	}
};

module.exports = { getAllCountries };
