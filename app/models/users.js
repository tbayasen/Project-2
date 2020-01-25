module.exports =  function(sequelize, DataTypes) {
	var User = sequelize.define('User', {
	//User type String
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		name:
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