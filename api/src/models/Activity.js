const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
	sequelize.define('Activity', {
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},

		difficult: {
			type: DataTypes.ENUM('1', '2', '3', '4', '5'),
			allowNull: false,
		},

		duration: {
			type: DataTypes.INTEGER,
			allowNull: true,
			validate: {
				min: 1,
				max: 24,
			},
		},

		season: {
			type: DataTypes.STRING,
			validate: {
				isIn: [['verano', 'primavera', 'otoño', 'invierno']],
			},
		},
	});
};
