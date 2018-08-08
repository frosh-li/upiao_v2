/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('collect', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    stationid: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    groupid: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    batteryid: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    collect_time: {
      type: DataTypes.TIME,
      allowNull: true,
      defaultValue: DataTypes.literal('CURRENT_TIMESTAMP')
    },
    R: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    collect_endtime: {
      type: DataTypes.TIME,
      allowNull: true
    }
  }, {
    tableName: 'collect'
  });

  Model.associate = function() {

  }

  return Model;
};
