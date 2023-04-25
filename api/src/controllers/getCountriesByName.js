const { Op } = require('sequelize');
const { Country, Activity } = require('../db.js');

const getCountriesByName = async (name) => {
	try {
		const countries = await Country.findAll({
			where: {
				name: {
					[Op.iLike]: `%${name}%`
				},
			},
			include: {
				model: Activity,
				attributes: ['name', 'difficult', 'duration', 'season'],
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

module.exports = { getCountriesByName };
