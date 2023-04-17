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

// const axios = require('axios');

// const getAllCountries = async () => {
// 	return await axios
// 		.get('https://restcountries.com/v3.1/all')
// 		.then((response) => {
// 			const data = response.data;
// 			if (data.length === 0) {
// 				throw new Error('No countries');
// 			} else {
// 				return data;
// 			}
// 		});
// };

// module.exports = { getAllCountries };
