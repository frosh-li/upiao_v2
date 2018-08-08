/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('account', {
    id: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true
    },
    phone: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      unique: true
    },
    password: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    username: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    gender: {
      type: DataTypes.STRING(2),
      allowNull: true,
      defaultValue: '?'
    },
    role: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: '3'
    },
    backup_phone: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    postname: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    location: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    manage_station: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    unit: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    duty: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    ismanage: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: '1'
    },
    refresh: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      defaultValue: '20'
    },
    create_time: {
      type: DataTypes.TIME,
      allowNull: true,
      defaultValue: DataTypes.literal('CURRENT_TIMESTAMP')
    }
  }, {
    tableName: 'account'
  });

  Model.associate = function() {

  }

  return Model;
};
