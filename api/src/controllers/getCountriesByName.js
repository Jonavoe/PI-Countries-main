const { default: axios } = require('axios');

const getCountriesByName = async (name) => {
		const url = `https://restcountries.com/v3.1/name/${name}`;
		return await axios
		.get(url)
		.then((response) => {
			const countries = response.data.filter((country) => {
				return country.name.includes(name);
			});
			if (countries.length === 0) {
				 			throw new Error(`No se encontraron países con el nombre "${name}"`);
		} else {
			return countries
		}
})};

module.exports = { getCountriesByName };


// name = name.toLowerCase(); // convertir a minúsculas
// 	const url = `https://restcountries.com/v3.1/name/${name}`;
// 	return await axios.get(url).then((response) => {
// 		const countries = response.data.filter((country) => {
// 			return (
// 				country.name.common.toLowerCase().includes(name) || // buscar por nombre común
// 				country.name.official.toLowerCase().includes(name) || // buscar por nombre oficial
// 				Object.values(country.name.native).some((n) =>
// 					n.common.toLowerCase().includes(name)
// 				) // buscar por nombres nativos
// 			);
// 		});
// 		if (countries.length === 0) {
// 			throw new Error(`No se encontraron países con el nombre "${name}"`);
// 		} else {
// 			return countries;
// 		}
// 	});