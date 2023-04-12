const axios = require('axios');

const getAllCountries = async () => {
	return await axios
		.get('https://restcountries.com/v3.1/all')
		.then((response) => {
			const data = response.data;
			if (data.length === 0) {
				throw new Error('No countries');
			} else {
				return data;
			}
		});
};

module.exports = { getAllCountries };
