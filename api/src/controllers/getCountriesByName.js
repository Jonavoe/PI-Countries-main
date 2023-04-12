const { default: axios } = require('axios');

const getCountriesByName = async (name) => {
	const url = `https://restcountries.com/v3.1/name/${name}`;
	return await axios.get(url).then((response) => {
		const countries = response.data.filter((country) => {
			return (
				country.name.common.toLowerCase().includes(name) ||
				country.name.official.toLowerCase().includes(name)
			);
		});
		if (countries.length === 0) {
			throw new Error(`No se encontraron países con el nombre "${name}"`);
		} else {
			return countries;
		}
	});
};

module.exports = { getCountriesByName };
