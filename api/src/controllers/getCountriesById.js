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

// const { default: axios } = require('axios');
// const { Country, Activity } = require('../db.js');

// const getCountriesById = async (id) => {
// 	try {
// 		const country = await Country.findByPk(id, {
// 			include: {
// 				model: Activity,
// 				attributes: ['name', 'difficult', 'duration', 'season'],
// 				through: {
// 					attributes: [],
// 				},
// 			},
// 		});

// 		if (!country) {
// 			throw new Error('Country not found');
// 		}

// 		const data = {
// 			name: country.name,
// 			capital: country.capital,
// 			population: country.population,
// 			flag: country.flag,
// 			activities: country.Activities.map((activity) => ({
// 				name: activity.name,
// 				difficult: activity.difficult,
// 				duration: activity.duration,
// 				season: activity.season,
// 			})),
// 		};

// 		return data;
// 	} catch (error) {
// 		return { error: error.message };
// 	}
// };

// module.exports = { getCountriesById };

// return await axios
// 	.get(`https://restcountries.com/v3.1/alpha/${id}`)
// 	.then((response) => {
// 		const data = response.data;
// 		if (!data) {
// 			throw new Error('Country not found');
// 		} else {
// 			return data;
// 		}
// 	});
