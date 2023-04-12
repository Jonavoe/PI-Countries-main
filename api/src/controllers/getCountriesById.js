// const { Country } = require('../db.js');

const { default: axios } = require('axios');

const getCountriesById = async (id) => {
	return await axios
		.get(`https://restcountries.com/v3.1/alpha/${id}`)
		.then((response) => {
			const data = response.data;
			if (!data) {
				throw new Error('Country not found');
			} else {
				return data;
			}
		});
};

// try {
// 	const country = await Country.findByPk(id);
// 	return country;
// } catch (error) {
// 	return { error: error.message };
// }

module.exports = { getCountriesById };
