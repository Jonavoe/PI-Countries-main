const { default: axios } = require('axios');

const getCountriesByName = (name) => {
	if (typeof name !== 'string') {
		throw new TypeError('El argumento "name" debe ser una cadena de texto');
	}

	const url = `https://restcountries.com/v3.1/name/${encodeURIComponent(name)}`;

	return axios
		.get(url)
		.then((response) => {
			const countries = response.data.filter((country) => {
				return (
					country.name.common.toLowerCase().includes(name.toLowerCase()) ||
					country.name.official.toLowerCase().includes(name.toLowerCase())
				);
			});

			if (countries.length === 0) {
				throw new Error(`No se encontraron países con el nombre "${name}"`);
			} else {
				return countries;
			}
		})
		.catch((error) => {
			if (error.response) {
				throw new Error(
					`La API de restcountries respondió con un error: ${error.response.status} ${error.response.statusText}`
				);
			} else if (error.request) {
				throw new Error('No se pudo conectar a la API de restcountries');
			} else {
				throw new Error('Ocurrió un error al procesar la solicitud');
			}
		});
};

module.exports = { getCountriesByName };

// const { default: axios } = require('axios');

// const getCountriesByName = async (name) => {
// 	const url = `https://restcountries.com/v3.1/name/${name}`;
// 	return await axios.get(url).then((response) => {
// 		const countries = response.data.filter((country) => {
// 			return (
// 				country.name.common.toLowerCase().includes(name) ||
// 				country.name.official.toLowerCase().includes(name)
// 			);
// 		});
// 		if (countries.length === 0) {
// 			throw new Error(`No se encontraron países con el nombre "${name}"`);
// 		} else {
// 			return countries;
// 		}
// 	});
// };

// module.exports = { getCountriesByName };
