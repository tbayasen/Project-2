module.exports = function (sequelize, DataTypes) {
	var User = sequelize.define('User', {
		//User type String
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		firstname: {
			type: DataTypes.STRING,
			allowNull: false
		},
		lastname: {
			type: DataTypes.STRING,
			allowNull: false
		},
		email:
		{
			type: DataTypes.STRING,
			allowNull: false
		},
		password:
		{
			type: DataTypes.STRING,
			allowNull: false
		},
		created: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW
		}
	});
	return User;
};