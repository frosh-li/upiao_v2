/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('ignores', {
    sn_key: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    },
    code: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    },
    updateTime: {
      type: DataTypes.TIME,
      allowNull: false,
      defaultValue: DataTypes.literal('CURRENT_TIMESTAMP')
    },
    type: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    },
    markup: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    operator: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'ignores'
  });

  Model.associate = function() {

  }

  return Model;
};
