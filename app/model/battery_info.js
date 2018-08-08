/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('battery_info', {
    sn_key: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    battery_factory: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    battery_num: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    battery_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    battery_dianrong: {
      type: "DOUBLE",
      allowNull: false
    },
    battery_float_voltage: {
      type: "DOUBLE",
      allowNull: false
    },
    battery_voltage: {
      type: "DOUBLE",
      allowNull: false
    },
    battery_oum: {
      type: "DOUBLE",
      allowNull: false
    },
    battery_max_discharge_current: {
      type: "DOUBLE",
      allowNull: false
    },
    battery_max_current: {
      type: "DOUBLE",
      allowNull: false
    },
    battery_float_up: {
      type: "DOUBLE",
      allowNull: false
    },
    battery_float_dow: {
      type: "DOUBLE",
      allowNull: false
    },
    battery_discharge_down: {
      type: "DOUBLE",
      allowNull: false
    },
    battery_scrap_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    battery_life: {
      type: "DOUBLE",
      allowNull: false
    },
    battery_column_type: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    battery_humidity: {
      type: "DOUBLE",
      allowNull: false
    },
    battery_temperature: {
      type: "DOUBLE",
      allowNull: false
    },
    battery_type: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    battery_factory_phone: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    create_time: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    update_time: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    remark: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'battery_info'
  });

  Model.associate = function() {

  }

  return Model;
};
