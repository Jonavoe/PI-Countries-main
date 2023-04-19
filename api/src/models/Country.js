const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
	// defino el modelo
	sequelize.define('Country', {
		id: {
			type: DataTypes.STRING,
			primaryKey: true,
			allowNull: false,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		image: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		continent: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		capital: {
			type: DataTypes.STRING,
		},
		subregion: {
			type: DataTypes.STRING,
		},
		area: {
			type: DataTypes.STRING,
		},
		population: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		banner: {
			type: DataTypes.STRING,
		},
	});
};
