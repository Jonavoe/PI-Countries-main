const { default: axios } = require('axios');
const { Country } = require('../db');

const URL = 'https://restcountries.com/v3.1/all';

const getApiData = async () => {
	try {
		const response = await axios.get(URL);
		return response.data;
	} catch (error) {
		console.error(error);
		throw new Error('Failed to fetch data from API');
	}
};

const saveApiData = async (req, res) => {
	const countries = await getApiData();
	countries.forEach(async (country) => {
		let { cca3, name, flags, region, subregion, capital, area, population } =
			country;

		// Asegurarse de que los valores por defecto estén definidos para todas las columnas
		await Country.findOrCreate({
			where: { id: cca3 },
			defaults: {
				name: name.common || 'Unknown',
				image: flags.png || 'https://via.placeholder.com/150',
				continent: region || 'Unknown',
				subregion: subregion || 'Unknown',
				population: population || 0,
				capital: capital?.[0] || 'Unknown',
				area: area || 0,
			},
		});
	});
};

module.exports = { saveApiData };

// const { default: axios } = require('axios');
// const { Country } = require('../db');

// const saveApiData = async () => {
// 	try {
// 		const response = await axios.get(URL);
// 		const countries = response.data;
// 		for (const country of countries) {
// 			const {
// 				cca3,
// 				name,
// 				flags,
// 				region,
// 				subregion,
// 				capital,
// 				area,
// 				population,
// 			} = country;

// 			await Country.findOrCreate({
// 				where: { id: cca3 },
// 				defaults: {
// 					name: name.common || 'Unknown',
// 					image: flags.png || 'https://via.placeholder.com/150',
// 					continent: region?.name || 'Unknown',
// 					population: population?.value || 0,
// 					capital: capital?.[0] || 'Unknown',
// 					area: area?.km2 || 0,
// 				},
// 			});
// 		}
// 	} catch (error) {
// 		console.error(error);
// 		throw new Error('Failed to fetch data from API');
// 	}
// };

// module.exports = { saveApiData };
