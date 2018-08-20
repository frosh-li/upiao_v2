/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('account', {
    id: {
        type: DataTypes.INTEGER(10),
        primaryKey: true,
        autoIncrement: true
    },
    rolename: {
      type: DataTypes.STRING(100),
      allowNull: true,
    }
  }, {
    tableName: 'roles'
  });

  Model.associate = function() {

  }

  return Model;
};
