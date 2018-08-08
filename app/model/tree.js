/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('tree', {
    id: {
      type: DataTypes.INTEGER(10),
      primaryKey: true,
      autoIncrement: true
    },
    pid: {
      type: DataTypes.INTEGER(10),
      allowNull: false
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'tree'
  });

  Model.associate = function() {

  }

  return Model;
};
