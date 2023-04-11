const { Country } = require('../db.js');
const axios = require('axios');

const getAllCountries = async () => {
	try {
		const response = await axios.get('https://restcountries.com/v3.1/all');
		const allCountries = response.data;

		const countriesToSave = allCountries.map((country) => ({
			name: country.name.common,
			capital: country.capital ? country.capital[0] : null,
			image: country.flags.png.match(/https?:\/\/.+\.png/i)?.[0] || null,
			continent: country.region,
			subregion: country.subregion,
			population: country.population,
			area: country.area,
			timezone: country.timezones[0],
			borders: country.borders?.join(','),
			languages:
				country.languages?.length > 0
					? Object.values(country.languages).join(',')
					: null,
			currencies:
				country.currencies?.length > 0
					? Object.values(country.currencies).join(',')
					: null,
			topLevelDomain: country.tld?.join(','),
		}));

		await Country.bulkCreate(countriesToSave);

		return allCountries;
	} catch (error) {
		return { error: error.message };
	}
};

module.exports = { getAllCountries };
