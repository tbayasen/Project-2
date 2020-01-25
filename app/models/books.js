module.exports = function(sequelize, DataTypes) {
	var Books = sequelize.define('Books', {
		title: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [1, 140]
			}
		},
		author: {
			type: DataTypes.STRING,
			validate: {
				len: [1, 140]
			}
		},
		img: {
			type: DataTypes.STRING,
			validate: {
				len: [1, 140]
			}
		},
	});
	return Books;
};
