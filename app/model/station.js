/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('station', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    sid: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    station_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    station_full_name: {
      type: DataTypes.STRING(300),
      allowNull: false
    },
    sn_key: {
      type: DataTypes.STRING(100),
      allowNull: false,
      primaryKey: true
    },
    cur_sensor: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    site_property: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    site_location: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    site_longitude: {
      type: "DOUBLE",
      allowNull: true
    },
    site_latitude: {
      type: "DOUBLE",
      allowNull: true
    },
    ipaddress: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    mac_address: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    station_control_type: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    postal_code: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    aid: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    groups: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    batteries: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    battery_puts: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    bms_install_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    group_current_collect_type: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    group_current_collect_num: {
      type: DataTypes.INTEGER(10),
      allowNull: false
    },
    group_current_collect_install_type: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    battery_collect_type: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    battery_collect_num: {
      type: DataTypes.INTEGER(10),
      allowNull: false
    },
    inductor_brand: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    inductor_type: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    humiture_type: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    create_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    fix_phone: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    functionary: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    functionary_phone: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    device_owner: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    device_owner_phone: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    parent_owner: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    parent_owner_phone: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    has_light: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    has_speaker: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    has_sms: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    has_smart_control: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    has_group_TH_control: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      defaultValue: '0'
    },
    has_group_HO_control: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      defaultValue: '0'
    },
    emergency_phone: {
      type: DataTypes.STRING(11),
      allowNull: false
    },
    emergency_person: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    functionary_sms: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: '1'
    },
    functionary_mail: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    area_owner_mail: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    area_owner_sms: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: '0'
    },
    parent_owner_mail: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    parent_owner_sms: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: '0'
    },
    area_owner: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: ''
    },
    area_owner_phone: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: ''
    },
    remark: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'station'
  });

  Model.associate = function() {

  }

  return Model;
};
