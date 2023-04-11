const { Country } = require('../db.js');

const getCountriesById = async () => {
	try {
		const country = await Country.findByPk(id);
		return country;
	} catch (error) {
		return { error: error.message };
	}
};

module.exports = { getCountriesById };
