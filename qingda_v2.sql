/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 50721
 Source Host           : localhost
 Source Database       : qingda_v2

 Target Server Type    : MySQL
 Target Server Version : 50721
 File Encoding         : utf-8

 Date: 08/20/2018 08:55:56 AM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `account`
-- ----------------------------
DROP TABLE IF EXISTS `account`;
CREATE TABLE `account` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `phone` varchar(11) DEFAULT NULL COMMENT '手机号',
  `password` varchar(32) DEFAULT NULL COMMENT '密码',
  `username` varchar(100) NOT NULL COMMENT '名称',
  `gender` varchar(2) DEFAULT '男' COMMENT '性别',
  `role` int(1) DEFAULT '3' COMMENT '用户角色 1为超级管理员 2为管理员 3为观察员',
  `backup_phone` varchar(11) DEFAULT NULL COMMENT '备用电话',
  `email` varchar(100) DEFAULT NULL COMMENT '邮箱',
  `postname` varchar(100) DEFAULT NULL COMMENT '职位',
  `location` varchar(255) DEFAULT NULL COMMENT '地址信息',
  `manage_station` varchar(255) DEFAULT NULL COMMENT '管理区域',
  `unit` varchar(255) DEFAULT NULL COMMENT '单位',
  `duty` varchar(30) DEFAULT NULL COMMENT '班次',
  `ismanage` int(1) DEFAULT '1' COMMENT '是否有管理权限 1有 0没有',
  `refresh` int(10) DEFAULT '20' COMMENT '前端刷新频率',
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `phone` (`phone`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `account`
-- ----------------------------
BEGIN;
INSERT INTO `account` VALUES ('1', '15330066919', '123456', '李俊良', '男', '1', '18888888888', 'zhuyanbin@hfbank.com.cn', '总经理', '泽阳大厦', '*', '石油', '全天值守', '1', '20', '2018-08-07 14:35:43'), ('3', '15330066910', '123456', '张良', '男', '2', '18601010101', 'junguoliang@163.com', '总经理', '北京合生财富', '71,88,90', '中国石油', '晚班', '1', '20', '2018-08-15 11:13:23'), ('5', '15330066916', '123456', '曹操', '男', '2', '18601010102', 'junguoliang@163.com', '总经理', '北京合生财富', '*', '中国石油', '晚班', '1', '20', '2018-08-15 11:17:05'), ('6', '15330066915', '123456', '李俊良', '男', '2', '18601010101', '8082410@qq.com', '总经理', '北京合生财富', '91,84,69,80,90,88,71,86,81', '中国石油', '晚班', '1', '20', '2018-08-15 11:20:17'), ('8', '13500000001', '123456', '钟馗', '男', '2', '13500000001', 'junguoliang@163.com', '道士', '北京合生财富', '*', '空军医院', '晚班', '1', '15', '2018-08-15 15:24:06');
COMMIT;

-- ----------------------------
--  Table structure for `battery_info`
-- ----------------------------
DROP TABLE IF EXISTS `battery_info`;
CREATE TABLE `battery_info` (
  `sn_key` varchar(100) NOT NULL COMMENT '站编号',
  `battery_factory` varchar(100) NOT NULL COMMENT '生产厂家',
  `battery_num` varchar(50) NOT NULL COMMENT '电池型号',
  `battery_date` datetime NOT NULL COMMENT '生产日期',
  `battery_dianrong` double NOT NULL COMMENT '电池标称容量(Ah)',
  `battery_float_voltage` double NOT NULL COMMENT '浮充标准电压(V)',
  `battery_voltage` double NOT NULL COMMENT '标称电压(V)',
  `battery_oum` double NOT NULL COMMENT '标称内阻(MΩ)',
  `battery_max_discharge_current` double NOT NULL COMMENT '最大充电电流(A)',
  `battery_max_current` double NOT NULL COMMENT '最大放电电流(A)',
  `battery_float_up` double NOT NULL COMMENT '浮充电压上限(V)',
  `battery_float_dow` double NOT NULL COMMENT '电池浮充电压下限(V)',
  `battery_discharge_down` double NOT NULL COMMENT '放电电压下限(V)',
  `battery_scrap_date` date NOT NULL COMMENT '强制报废日期',
  `battery_life` double NOT NULL COMMENT '设计寿命(年)',
  `battery_column_type` varchar(20) NOT NULL COMMENT '电池级柱类型',
  `battery_humidity` double NOT NULL COMMENT '湿度要求(%)',
  `battery_temperature` double NOT NULL COMMENT '温度要求(度)',
  `battery_type` varchar(50) NOT NULL COMMENT '电池种类',
  `battery_factory_phone` varchar(20) NOT NULL COMMENT '电池厂家联系电话',
  `create_time` int(11) NOT NULL COMMENT '创建时间',
  `update_time` int(11) NOT NULL COMMENT '更新时间',
  `remark` text,
  PRIMARY KEY (`sn_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `battery_info`
-- ----------------------------
BEGIN;
INSERT INTO `battery_info` VALUES ('100000000', '232323', 'UPS100', '2018-08-08 16:00:00', '0', '0', '0', '0', '0', '0', '0', '0', '0', '2018-08-09', '0', '', '0', '0', '', '', '2018', '2018', ''), ('100000001', '232323', '', '2018-08-08 16:00:00', '0', '0', '0', '0', '0', '0', '0', '0', '0', '2018-08-09', '0', '', '0', '0', '', '', '2018', '2018', ''), ('100000002', '232323', '', '2018-08-07 16:00:00', '0', '0', '0', '0', '0', '0', '0', '0', '0', '2018-08-08', '0', '', '0', '0', '', '', '2018', '2018', ''), ('100000003', '232323', '', '2018-08-06 16:00:00', '0', '0', '0', '0', '0', '0', '0', '0', '0', '2018-08-07', '0', '', '0', '0', '', '', '2018', '2018', ''), ('100000004', 'DMS', 'UPS100', '2018-08-07 16:00:00', '0', '0', '0', '0', '0', '0', '0', '0', '0', '2018-08-08', '0', '', '0', '0', '', '', '2018', '2018', ''), ('100000005', 'DMS', 'UPS100', '2018-08-06 16:00:00', '0', '0', '0', '0', '0', '0', '0', '0', '0', '2018-08-07', '0', '', '0', '0', '', '', '2018', '2018', ''), ('100000006', 'DMS', 'UPS100', '2018-08-05 16:00:00', '0', '0', '0', '0', '0', '0', '0', '0', '0', '2018-08-06', '0', '', '0', '0', '', '', '2018', '2018', ''), ('100000007', 'DMS', 'UPS100', '2018-08-04 16:00:00', '0', '0', '0', '0', '0', '0', '0', '0', '0', '2018-08-05', '0', '', '0', '0', '', '', '2018', '2018', ''), ('100000008', 'DMS', 'UPS100', '2018-08-03 16:00:00', '0', '0', '0', '0', '0', '0', '0', '0', '0', '2018-08-04', '0', '', '0', '0', '', '', '2018', '2018', ''), ('100000009', 'DMS', 'UPS100', '2018-08-02 16:00:00', '0', '0', '0', '0', '0', '0', '0', '0', '0', '2018-08-03', '0', '', '0', '0', '', '', '2018', '2018', ''), ('100000010', 'DMS', 'UPS100', '2018-08-01 16:00:00', '0', '0', '0', '0', '0', '0', '0', '0', '0', '2018-08-02', '0', '', '0', '0', '', '', '2018', '2018', ''), ('100000011', 'DMS', 'UPS100', '2018-07-31 16:00:00', '0', '0', '0', '0', '0', '0', '0', '0', '0', '2018-08-01', '0', '', '0', '0', '', '', '2018', '2018', ''), ('100000012', 'DMS', 'UPS100', '2018-07-30 16:00:00', '0', '0', '0', '0', '0', '0', '0', '0', '0', '2018-07-31', '0', '', '0', '0', '', '', '2018', '2018', '');
COMMIT;

-- ----------------------------
--  Table structure for `bms_info`
-- ----------------------------
DROP TABLE IF EXISTS `bms_info`;
CREATE TABLE `bms_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `bms_company` varchar(255) NOT NULL COMMENT '厂家信息',
  `bms_device_addr` varchar(255) NOT NULL COMMENT '厂家地址',
  `bms_postcode` varchar(20) NOT NULL COMMENT '厂家邮编',
  `bms_url` varchar(150) NOT NULL COMMENT '支持网址',
  `bms_tel` varchar(20) NOT NULL COMMENT '固定电话',
  `bms_phone` varchar(20) NOT NULL COMMENT '手机',
  `bms_service_phone` varchar(20) NOT NULL COMMENT '服务商电话',
  `bms_service_contact` varchar(200) DEFAULT NULL COMMENT '服务商联系人',
  `bms_service_name` varchar(200) NOT NULL COMMENT '服务商名称',
  `bms_service_url` varchar(150) NOT NULL COMMENT '服务商地址',
  `bms_version` varchar(20) NOT NULL COMMENT '软件版本号',
  `bms_update_mark` text NOT NULL COMMENT '软件更新记录',
  `bms_mark` text COMMENT '备注',
  `modify_time` datetime NOT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;


-- ----------------------------
--  Records of `bms_info`
-- ----------------------------
BEGIN;
INSERT INTO `bms_info` VALUES ('5', '清大领航（北京）测控技术研究院', '北京石景山区泽洋大厦一层104号', '100043', 'http://www.qdlhck.com', '01068688811', '13701056122', '13701056122', '许大鹏', '北京达春信科技公司', '北京石景山区泽洋大厦一层104号', '2.17.7', '3.3.1', '', '0000-00-00 00:00:00');
COMMIT;


-- ----------------------------
--  Table structure for `collect`
-- ----------------------------
DROP TABLE IF EXISTS `collect`;
CREATE TABLE `collect` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `stationid` bigint(20) DEFAULT NULL COMMENT '站号',
  `groupid` int(11) DEFAULT NULL COMMENT '组号',
  `batteryid` int(11) DEFAULT NULL COMMENT '电池号',
  `collect_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '采集时间',
  `R` float DEFAULT NULL COMMENT '当前内阻值',
  `collect_endtime` timestamp NULL DEFAULT NULL COMMENT '采集结束时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `company_info`
-- ----------------------------
DROP TABLE IF EXISTS `company_info`;
CREATE TABLE `company_info` (
  `id` int(11) NOT NULL COMMENT 'id',
  `company_name` varchar(200) NOT NULL COMMENT '单位名称',
  `company_address` varchar(255) NOT NULL COMMENT '单位地址',
  `area_name` varchar(100) DEFAULT NULL COMMENT '管辖',
  `parent_area` varchar(100) DEFAULT NULL COMMENT '隶属',
  `supervisor_phone` varchar(20) NOT NULL COMMENT '主管领导电话',
  `supervisor_name` varchar(100) NOT NULL COMMENT '主管领导姓名',
  `longitude` double NOT NULL COMMENT '经度',
  `latitude` double NOT NULL COMMENT '纬度',
  `station_num` int(10) NOT NULL COMMENT '所辖站点个数',
  `area_level` int(10) NOT NULL COMMENT '隶属层级',
  `area` varchar(255) DEFAULT NULL COMMENT '',
  `network_type` varchar(255) NOT NULL COMMENT '联网方式',
  `bandwidth` int(10) NOT NULL COMMENT '网络带宽',
  `ipaddr` varchar(20) NOT NULL COMMENT 'IP地址',
  `computer_brand` varchar(100) NOT NULL COMMENT '上位机品牌',
  `computer_os` varchar(100) NOT NULL COMMENT '上位机操作系统',
  `computer_conf` varchar(150) NOT NULL COMMENT '主机配置',
  `browser_name` varchar(50) NOT NULL COMMENT '浏览器名称',
  `server_capacity` varchar(50) NOT NULL COMMENT '服务器容量',
  `server_type` varchar(50) NOT NULL COMMENT '服务器型号',
  `cloud_address` varchar(150) NOT NULL COMMENT '云空间地址',
  `backup_period` varchar(20) NOT NULL COMMENT '数据备份周期',
  `backup_type` varchar(50) NOT NULL COMMENT '数据备份方式',
  `supervisor_depname` varchar(255) NOT NULL COMMENT '监控部门名称',
  `monitor_name1` varchar(50) NOT NULL COMMENT '监控部门负责人',
  `monitor_phone1` varchar(20) NOT NULL COMMENT '监控部门负责人电话',
  `monitor_name2` varchar(50) NOT NULL COMMENT '其他联系人',
  `monitor_phone2` varchar(20) NOT NULL COMMENT '其他联系人电话',
  `monitor_name3` varchar(50) NOT NULL COMMENT '其他联系人',
  `monitor_phone3` varchar(50) NOT NULL COMMENT '其他联系人电话',
  `monitor_tel1` varchar(20) NOT NULL COMMENT '监控部门固定电话1',
  `monitor_tel2` varchar(20) NOT NULL COMMENT '监控部门固定电话2',
  `duty_status` varchar(100) DEFAULT NULL COMMENT '值守状态/班次',
  `owner` varchar(100) DEFAULT NULL COMMENT '部门负责人',
  `owner_phone` varchar(100) DEFAULT NULL COMMENT '部门负责人电话',
  `manage` varchar(100) DEFAULT NULL COMMENT '管理员',
  `viewer` varchar(100) DEFAULT NULL COMMENT '观察员',
  `remark` text COMMENT '备注信息',
  `modify_time` datetime NOT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



-- ----------------------------
--  Table structure for `ignores`
-- ----------------------------
DROP TABLE IF EXISTS `ignores`;
CREATE TABLE `ignores` (
  `sn_key` varchar(100) NOT NULL COMMENT '站sn_key',
  `code` varchar(255) NOT NULL COMMENT '编码',
  `updateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `type` varchar(255) NOT NULL COMMENT '类型 station group or battery',
  `markup` varchar(255) DEFAULT NULL COMMENT '忽略的备注信息',
  `operator` varchar(255) DEFAULT NULL COMMENT '操作人',
  PRIMARY KEY (`sn_key`,`code`,`type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `report_log`
-- ----------------------------
DROP TABLE IF EXISTS `report_log`;
CREATE TABLE `report_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `report_type` varchar(255) DEFAULT NULL COMMENT '报表类型 周报week, 月报month, 年报year',
  `report_table` varchar(255) DEFAULT NULL COMMENT '报表',
  `report_index` varchar(11) DEFAULT NULL COMMENT 'index索引',
  `report_path` varchar(255) DEFAULT NULL COMMENT 'EXCEL下载地址',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `roles`
-- ----------------------------
DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `rolename` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
--  Records of `roles`
-- ----------------------------
BEGIN;
INSERT INTO `roles` VALUES ('1', '超级管理员'), ('2', '管理员'), ('3', '观察员');
COMMIT;

-- ----------------------------
--  Table structure for `station`
-- ----------------------------
DROP TABLE IF EXISTS `station`;
CREATE TABLE `station` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `sid` int(11) NOT NULL COMMENT '站号',
  `station_name` varchar(255) NOT NULL COMMENT '站点名称',
  `station_full_name` varchar(300) NOT NULL COMMENT '站点全称',
  `sn_key` varchar(100) NOT NULL COMMENT 'sn_ey',
  `cur_sensor` varchar(10) DEFAULT NULL COMMENT '电流传感器安装状态',
  `site_property` varchar(50) NOT NULL COMMENT '站点性质',
  `site_location` varchar(255) NOT NULL COMMENT '站点地址',
  `site_longitude` double DEFAULT NULL COMMENT '站点经度',
  `site_latitude` double DEFAULT NULL COMMENT '站点纬度',
  `ipaddress` varchar(20) NOT NULL COMMENT 'IP地址',
  `mac_address` varchar(20) DEFAULT NULL COMMENT '网口MAC',
  `station_control_type` varchar(30) NOT NULL COMMENT '站点控制器型号',
  `ipaddress_method` varchar(255) DEFAULT NULL COMMENT '控制器IP或方式',
  `postal_code` varchar(20) NOT NULL COMMENT '邮编',
  `aid` int(11) NOT NULL COMMENT '所属区域ID',
  `groups` int(11) NOT NULL COMMENT '组数',
  `batteries` int(11) NOT NULL COMMENT '电池数',
  `battery_puts` varchar(30) NOT NULL COMMENT '电池码放状态',
  `bms_install_date` datetime NOT NULL COMMENT 'BMS系统安装时间',
  `group_current_collect_type` varchar(30) NOT NULL COMMENT '组电流采集器型号',
  `group_current_collect_num` int(10) NOT NULL COMMENT '组电流采集器数量',
  `group_current_collect_install_type` varchar(30) NOT NULL COMMENT '组电流采集器安装模式',
  `battery_collect_type` varchar(30) NOT NULL COMMENT '电池数据采集器型号',
  `battery_collect_num` int(10) NOT NULL COMMENT '电池数据采集器数量',
  `inductor_brand` varchar(50) NOT NULL COMMENT '互感器品牌',
  `inductor_type` varchar(30) NOT NULL COMMENT '互感器类型',
  `humiture_type` varchar(30) NOT NULL COMMENT '环境温湿度方式',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  `fix_phone` varchar(100) DEFAULT NULL COMMENT '固定电话',
  `functionary` varchar(10) DEFAULT NULL COMMENT '负责人',
  `functionary_phone` varchar(100) DEFAULT NULL COMMENT '负责人电话',
  `functionary_sms` int(1) DEFAULT '1' COMMENT '负责人是否接收短信报警',
  `functionary_mail` varchar(100) DEFAULT NULL COMMENT '负责人是否接收邮件报警',
  `device_owner` varchar(100) DEFAULT NULL COMMENT '设备负责人',
  `device_owner_phone` varchar(100) DEFAULT NULL COMMENT '设备负责人电话',
  `parent_owner` varchar(100) DEFAULT NULL COMMENT '上级主管',
  `parent_owner_phone` varchar(100) DEFAULT NULL COMMENT '上级主管电话',
  `parent_owner_mail` varchar(100) DEFAULT NULL COMMENT '上级主管是否接收邮件报警',
  `parent_owner_sms` int(1) DEFAULT '0' COMMENT '上级主管是否接收短信报警',
  `emergency_phone` varchar(11) NOT NULL COMMENT '紧急联系人电话',
  `emergency_person` varchar(30) NOT NULL COMMENT '紧急联系人',
  `area_owner` varchar(100) DEFAULT '' COMMENT '区域主管',
  `area_owner_phone` varchar(100) DEFAULT '' COMMENT '区域主管电话',
  `area_owner_mail` varchar(100) DEFAULT NULL COMMENT '区域主管是否接收邮件',
  `area_owner_sms` int(1) DEFAULT '0' COMMENT '区域主管是否接收短信报警',
  `has_light` varchar(2) DEFAULT NULL COMMENT '灯光报警',
  `has_speaker` varchar(2) DEFAULT NULL COMMENT '声音报警',
  `has_sms` varchar(2) DEFAULT NULL COMMENT '短信报警',
  `has_smart_control` varchar(2) DEFAULT NULL COMMENT '智能控制',
  `has_group_TH_control` int(10) DEFAULT '0' COMMENT '温湿度传感器 数值类型',
  `has_group_HO_control` int(10) DEFAULT '0' COMMENT '氢氧气传感器',
  `remark` text COMMENT '备注',
  PRIMARY KEY (`id`,`sn_key`),
  UNIQUE KEY `station` (`sn_key`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=303 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `station`
-- ----------------------------
BEGIN;
INSERT INTO `station` VALUES ('290', '100', '泽阳大厦机房', 'AAA', '100000000', '101', '', '合生财富广场', '101', '1010', '', '', '', null, '', '88', '3', '6', '平地', '2018-07-31 16:00:00', '', '0', '', '', '0', '', '', '', '2018-08-13 07:12:22', '', '李俊良', '15330066919', '', '', '', '', '', '', '0', '0', '3', '2', '', '', '1', null, '', '0', '', '0', '', '', ''), ('291', '101', '通州马驹桥', 'BBB', '100000001', '101', '', '合生财富广场', '101', '1010', '', '', '', null, '', '88', '0', '0', '平地', '2018-08-03 16:00:00', '', '0', '', '', '0', '', '', '', '2018-08-13 07:12:38', '', '李俊良', '15330066919', '', '', '', '', '', '', '', '', '0', '0', '', '', '1', null, '', '0', '', '0', '', '', ''), ('292', '102', '航空总部', '北京航空总部基地', '100000002', '101', '', '合生财富广场', '101', '1010', '', '', '', null, '', '90', '0', '0', '平地', '2018-08-03 16:00:00', '', '0', '', '', '0', '', '', '', '2018-08-10 06:24:44', '', '李俊良', '15330066919', '', '', '', '', '', '', '', '', '0', '0', '', '', '1', null, '', '0', '', '0', '', '', ''), ('293', '103', '天津加工厂', '天津加工厂', '100000003', '101', '', '合生财富广场', '101', '1010', '', '', '', null, '', '72', '0', '0', '平地', '2018-08-01 16:00:00', '', '0', '', '', '0', '', '', '', '2018-08-13 07:11:55', '', '李俊良', '15330066919', '', '', '', '', '', '', '', '', '0', '0', '', '', '1', null, '', '0', '', '0', '', '', ''), ('294', '104', '泽阳大厦机房2', 'AAA2', '100000004', '101', '', '合生财富广场', '101', '1010', '', '', '', null, '', '88', '3', '6', '平地', '2018-07-30 16:00:00', '', '0', '', '', '0', '', '', '', '2018-08-14 08:26:26', '', '李俊良', '15330066919', '', '', '', '', '', '', '0', '0', '3', '2', '', '', '1', null, '', '0', '', '0', '', '', ''), ('295', '105', '泽阳大厦机房2', 'AAA2', '100000005', '101', '', '合生财富广场', '101', '1010', '', '', '', null, '', '88', '3', '6', '平地', '2018-07-29 16:00:00', '', '0', '', '', '0', '', '', '', '2018-08-14 08:27:21', '', '李俊良', '15330066919', '', '', '', '', '', '', '0', '0', '3', '2', '', '', '1', null, '', '0', '', '0', '', '', ''), ('296', '106', '泽阳大厦机房6', 'AAA2', '100000006', '101', '', '合生财富广场', '101', '1010', '', '', '', null, '', '88', '3', '6', '平地', '2018-07-28 16:00:00', '', '0', '', '', '0', '', '', '', '2018-08-14 08:30:37', '', '李俊良', '15330066919', '', '', '', '', '', '', '0', '0', '3', '2', '', '', '1', null, '', '0', '', '0', '', '', ''), ('297', '107', '泽阳大厦机房7', 'AAA2', '100000007', '101', '', '合生财富广场', '101', '1010', '', '', '', null, '', '88', '3', '6', '平地', '2018-07-27 16:00:00', '', '0', '', '', '0', '', '', '', '2018-08-14 08:53:08', '', '李俊良', '15330066919', '', '', '', '', '', '', '0', '0', '3', '2', '', '', '1', null, '', '0', '', '0', '', '', ''), ('298', '108', '泽阳大厦机房7', 'AAA2', '100000008', '101', '', '合生财富广场', '101', '1010', '', '', '', null, '', '69', '3', '6', '平地', '2018-07-26 16:00:00', '', '0', '', '', '0', '', '', '', '2018-08-16 05:18:19', '', '李俊良', '15330066919', '', '', '', '', '', '', '0', '0', '3', '2', '', '', '1', null, '', '0', '', '0', '', '', ''), ('299', '109', '泽阳大厦机房7', 'AAA2', '100000009', '101', '', '合生财富广场', '101', '1010', '', '', '', null, '', '69', '3', '6', '平地', '2018-07-25 16:00:00', '', '0', '', '', '0', '', '', '', '2018-08-16 05:18:34', '', '李俊良', '15330066919', '', '', '', '', '', '', '0', '0', '3', '2', '', '', '1', null, '', '0', '', '0', '', '', ''), ('300', '110', '泽阳大厦机房7', 'AAA2', '100000010', '101', '', '合生财富广场', '101', '1010', '', '', '', null, '', '69', '3', '6', '平地', '2018-07-24 16:00:00', '', '0', '', '', '0', '', '', '', '2018-08-16 05:18:57', '', '李俊良', '15330066919', '', '', '', '', '', '', '0', '0', '3', '2', '', '', '1', null, '', '0', '', '0', '', '', ''), ('301', '111', '泽阳大厦机房7', 'AAA2', '100000011', '101', '', '合生财富广场', '101', '1010', '', '', '', null, '', '69', '3', '6', '平地', '2018-07-23 16:00:00', '', '0', '', '', '0', '', '', '', '2018-08-16 05:19:30', '', '李俊良', '15330066919', '', '', '', '', '', '', '0', '0', '3', '2', '', '', '1', null, '', '0', '', '0', '', '', ''), ('302', '112', '泽阳大厦机房7', 'AAA2', '100000012', '101', '', '合生财富广场', '101', '1010', '', '', '', null, '', '84', '3', '6', '平地', '2018-07-22 16:00:00', '', '0', '', '', '0', '', '', '', '2018-08-16 05:19:56', '', '李俊良', '15330066919', '', '', '', '', '', '', '0', '0', '3', '2', '', '', '1', null, '', '0', '', '0', '', '', '');
COMMIT;

-- ----------------------------
--  Table structure for `station_alert_desc`
-- ----------------------------
DROP TABLE IF EXISTS `station_alert_desc`;
CREATE TABLE `station_alert_desc` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `desc` varchar(255) DEFAULT NULL,
  `en` varchar(255) NOT NULL,
  `climit` varchar(255) DEFAULT NULL,
  `suggest` varchar(255) DEFAULT NULL,
  `send_msg` int(1) NOT NULL DEFAULT '1',
  `send_email` int(1) DEFAULT '1',
  `tips` varchar(200) DEFAULT NULL,
  `type` varchar(200) NOT NULL DEFAULT 'station',
  `ignore` int(1) DEFAULT '0' COMMENT '是否可以忽略',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=117 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
--  Records of `station_alert_desc`
-- ----------------------------
BEGIN;
INSERT INTO `station_alert_desc` VALUES ('36', '环境温度超上限_红', 'MaxTem_R', '60', '检查空调状态及时降温或关闭UPS', '0', '1', null, 'station', '0'), ('37', '环境温度将达上限_橙', 'MaxTem_O', '55', '检查空调状态及时降温或关闭UPS', '0', '0', null, 'station', '1'), ('38', '环境温度偏高_黄', 'MaxTem_Y', '50', '检查空调状态及时降温或关闭UPS', '0', '0', null, 'station', '1'), ('39', '环境温度超下限_红', 'MinTem_R', '3', '检查空调状态及时保温或关闭UPS', '0', '1', null, 'station', '0'), ('40', '环境温度将达下限_橙', 'MinTem_O', '5', '检查空调状态及时保温或关闭UPS', '0', '1', null, 'station', '1'), ('41', '环境温度偏低_黄', 'MinTem_Y', '9', '检查空调状态及时保温或关闭UPS', '0', '1', null, 'station', '1'), ('42', '环境温湿度传感器故障_黄', 'TemSenErr_Y', '7', '联系BMS厂家维护', '0', '1', null, 'station', '0'), ('43', '环境湿度超上限_红', 'MaxHum_R', '90', '检查加湿器状态或关闭UPS', '0', '1', null, 'station', '0'), ('44', '环境湿度将达上限_橙', 'MaxHum_O', '85', '检查加湿器状态或关闭UPS', '0', '1', null, 'station', '1'), ('45', '环境湿度偏高_黄', 'MaxHum_Y', '80', '检查加湿器状态或关闭UPS', '0', '0', null, 'station', '1'), ('46', '环境湿度超下限_红', 'MinHum_R', '3', '检查加湿器工作状态', '0', '1', null, 'station', '0'), ('47', '环境湿度将达下限_橙', 'MinHum_O', '5', '检查加湿器工作状态', '0', '1', null, 'station', '1'), ('48', '环境湿度偏低_黄', 'MinHum_Y', '8', '检查加湿器工作状态', '0', '1', null, 'station', '1'), ('49', '站放电电流超上限_红', 'DisChaLim_R', '40', '检查UPS状态或关闭UPS、联系UPS厂家', '0', '1', null, 'station', '0'), ('50', '站放电电流将达上限_橙', 'DisChaLim_O', '35', '检查UPS状态或关闭UPS、联系UPS厂家', '0', '1', null, 'station', '1'), ('51', '站放电电流偏高_黄', 'DisChaLim_Y', '30', '检查UPS状态或关闭UPS、联系UPS厂家', '0', '1', null, 'station', '1'), ('52', '站充电电流超上限_红', 'ChaLim_R', '-20', '检查UPS状态或关闭UPS、联系UPS厂家', '0', '1', null, 'station', '0'), ('53', '站充电电流将达上限_橙', 'ChaLim_O', '-18', '检查UPS状态或关闭UPS、联系UPS厂家', '0', '1', null, 'station', '0'), ('54', '站充电电流偏高_黄', 'ChaLim_Y', '-16', '检查UPS状态或关闭UPS、联系UPS厂家', '0', '1', null, 'station', '1'), ('55', '站电流传感器故障_黄', 'CurSenErr_Y', '7', '联系BMS厂家维护', '0', '1', null, 'station', '0'), ('56', '站电池总电压超上限_红', 'HiVolLim_R', '89', '检查UPS状态或关闭UPS、联系UPS厂家', '0', '1', null, 'station', '0'), ('57', '站电池总电压将达上限_橙', 'HiVolLim_O', '86', '检查UPS状态或关闭UPS、联系UPS厂家', '0', '1', null, 'station', '1'), ('58', '站电池总电压偏高_黄', 'HiVolLim_Y', '83', '检查UPS状态或关闭UPS、联系UPS厂家', '0', '1', null, 'station', '1'), ('59', '站电池总电压超下限_红', 'LoVolLim_R', '63', '检查UPS状态或关闭UPS、联系UPS厂家', '0', '1', null, 'station', '0'), ('60', '站电池总电压将达下限_橙', 'LoVolLim_O', '65', '检查UPS状态或关闭UPS、联系UPS厂家', '0', '1', null, 'station', '1'), ('61', '站电池总电压偏低_黄', 'LoVolLim_Y', '67', '检查UPS状态或关闭UPS、联系UPS厂家', '0', '1', null, 'station', '1'), ('62', '组间电流偏差_红', 'GroCurDevLim_R', '10', '检查电池线缆连接状态或通知BMS厂家检测电流传感器', '0', '1', null, 'station', '0'), ('63', '组间电流偏差_橙', 'GroCurDevLim_O', '7', '检查电池线缆连接状态或通知BMS厂家检测电流传感器', '0', '1', null, 'station', '1'), ('64', '组间电流偏差_黄', 'GroCurDevLim_Y', '4', '检查电池线缆连接状态或通知BMS厂家检测电流传感器', '0', '1', null, 'station', '1'), ('65', '组间电压偏差_红', 'GroVolDevLim_R', '3', '检查单个电池电压状态或通知BMS厂家检测电压传感器', '0', '1', null, 'station', '0'), ('66', '组间电压偏差_橙', 'GroVolDevLim_O', '2', '检查单个电池电压状态或通知BMS厂家检测电压传感器', '0', '1', null, 'station', '1'), ('67', '组间电压偏差_黄', 'GroVolDevLim_Y', '1', '检查单个电池电压状态或通知BMS厂家检测电压传感器', '0', '1', null, 'station', '1'), ('68', '组间温度偏差_红', 'GroTemDevLim_R', '7', '检查电池箱温度状态或通知BMS厂家检测温度传感器', '0', '1', null, 'station', '0'), ('69', '组间温度偏差_橙', 'GroTemDevLim_O', '5', '检查电池箱温度状态或通知BMS厂家检测温度传感器', '0', '1', null, 'station', '1'), ('70', '组间温度偏差_黄', 'GroTemDevLim_Y', '3', '检查电池箱温度状态或通知BMS厂家检测温度传感器', '0', '1', null, 'station', '1'), ('71', '组放电电流超上限_红', 'DisChaLim_R', '30', '检查UPS状态或关闭UPS、联系UPS厂家', '0', '1', null, 'group', '0'), ('72', '组放电电流将达上限_橙', 'DisChaLim_O', '28', '检查UPS状态或关闭UPS、联系UPS厂家', '0', '1', null, 'group', '1'), ('73', '组放电电流偏高_黄', 'DisChaLim_Y', '25', '检查UPS状态或关闭UPS、联系UPS厂家', '0', '1', null, 'group', '1'), ('74', '组充电电流超上限_红', 'ChaLim_R', '-20', '检查UPS状态或关闭UPS、联系UPS厂家', '0', '1', null, 'group', '0'), ('75', '组充电电流将达上限_橙', 'ChaLim_O', '-18', '检查UPS状态或关闭UPS、联系UPS厂家', '0', '1', null, 'group', '1'), ('76', '组充电电流偏高_黄', 'ChaLim_Y', '-16', '检查UPS状态或关闭UPS、联系UPS厂家', '0', '1', null, 'group', '1'), ('77', '组电流传感器故障_黄', 'CurSenErr_Y', '7', '联系BMS厂家检查传感器状态', '0', '1', null, 'group', '0'), ('78', '电池电压超上限_红', 'MaxU_R', '14.1', '检查电池状态或关闭UPS、更换电池，联系电池、UPS厂商', '0', '1', null, 'battery', '0'), ('79', '电池电压将达上限_橙', 'MaxU_O', '14', '检查电池状态或关闭UPS、更换电池，联系电池、UPS厂商', '0', '1', null, 'battery', '1'), ('80', '电池电压偏高_黄', 'MaxU_Y', '13.9', '检查电池状态或关闭UPS、更换电池，联系电池、UPS厂商', '0', '1', null, 'battery', '1'), ('81', '电池电压超下限_红', 'MinU_R', '10.2', '检查电池状态或关闭UPS、更换电池，联系电池、UPS厂商', '0', '1', null, 'battery', '0'), ('82', '电池电压将达下限_橙', 'MinU_O', '10.5', '检查电池状态或关闭UPS、更换电池，联系电池、UPS厂商', '0', '1', null, 'battery', '1'), ('83', '电池电压偏低_黄', 'MinU_Y', '10.8', '检查电池状态或关闭UPS、更换电池，联系电池、UPS厂商', '0', '1', null, 'battery', '1'), ('84', '电压传感器故障_黄', 'VolSenErr_Y', '7', '检查通信线路连接状态、联系BMS厂家维护或更换采集模块', '0', '1', null, 'battery', '0'), ('85', '电池温度超上限_红', 'MaxT_R', '55', '检查电池状态或关闭UPS、更换电池，联系电池、UPS厂商', '0', '1', null, 'battery', '0'), ('86', '电池温度将达上限_橙', 'MaxT_O', '50', '检查电池状态或关闭UPS、更换电池，联系电池、UPS厂商', '0', '1', null, 'battery', '1'), ('87', '电池温度偏高_黄', 'MaxT_Y', '45', '检查电池状态或关闭UPS、更换电池，联系电池、UPS厂商', '0', '1', null, 'battery', '1'), ('88', '电池温度超下限_红', 'MinT_R', '3', '做好电池保温或关闭UPS', '0', '1', null, 'battery', '0'), ('89', '电池温度将达下限_橙', 'MinT_O', '6', '做好电池保温或关闭UPS', '0', '1', null, 'battery', '1'), ('90', '电池温度偏低_黄', 'MinT_Y', '9', '做好电池保温或关闭UPS', '0', '1', null, 'battery', '1'), ('91', '温度传感器故障_黄', 'TemSenErr_Y', '7', '检查通信线路连接状态、联系BMS厂家维护或更换采集模块', '0', '0', null, 'battery', '0'), ('92', '电池内阻超上限_红', 'MaxR_R', '15', '联系电池或UPS厂家、更换电池、关闭UPS', '0', '1', null, 'battery', '0'), ('93', '电池内阻将达上限_橙', 'MaxR_O', '12.5', '联系电池或UPS厂家、更换电池、关闭UPS', '0', '1', null, 'battery', '1'), ('94', '电池内阻偏高_黄', 'MaxR_Y', '10', '联系电池或UPS厂家、更换电池、关闭UPS', '0', '1', null, 'battery', '1'), ('95', '内阻传感器故障_黄', 'ResSenErr_Y', '7', '检查通信线路连接状态、联系BMS厂家维护或更换采集模块', '0', '1', null, 'battery', '0'), ('96', '电池电压偏差_红', 'MaxDevU_R', '0.5', '关注电池变化，偏离过大或超过门限，联系电池、UPS厂商', '0', '1', null, 'battery', '0'), ('97', '电池电压偏差_橙', 'MaxDevU_O', '0.4', '关注电池变化，偏离过大或超过门限，联系电池、UPS厂商', '0', '1', null, 'battery', '1'), ('98', '电池电压偏差_黄', 'MaxDevU_Y', '0.3', '关注电池变化，偏离过大或超过门限，联系电池、UPS厂商', '0', '1', null, 'battery', '1'), ('99', '电池温度偏差_红', 'MaxDevT_R', '5', '关注电池变化，偏离过大或超过门限，联系电池、UPS厂商', '0', '1', null, 'battery', '0'), ('100', '电池温度偏差_橙', 'MaxDevT_O', '4', '关注电池变化，偏离过大或超过门限，联系电池、UPS厂商', '0', '1', null, 'battery', '1'), ('101', '电池温度偏差_黄', 'MaxDevT_Y', '3', '关注电池变化，偏离过大或超过门限，联系电池、UPS厂商', '0', '1', null, 'battery', '1'), ('102', '电池内阻偏差_红', 'MaxDevR_R', '5', '关注电池变化，偏离过大或超过门限，联系电池、UPS厂商', '0', '1', null, 'battery', '0'), ('103', '电池内阻偏差_橙', 'MaxDevR_O', '4', '关注电池变化，偏离过大或超过门限，联系电池、UPS厂商', '0', '1', null, 'battery', '1'), ('104', '电池内阻偏差_黄', 'MaxDevR_Y', '3', '关注电池变化，偏离过大或超过门限，联系电池、UPS厂商', '0', '1', null, 'battery', '1'), ('105', '电池模块通讯故障_黄', 'ComErr_Y', '0', '请检查BMS电池模块或联系BMS厂家', '0', '1', null, 'battery', '0'), ('106', '站电流模块通讯故障_黄', 'ComErr_Y', '0', '请检查BMS电流模块或联系BMS厂家', '0', '1', null, 'station', '0'), ('107', '组电流模块通讯故障_黄', 'ComErr_Y', '0', '请检查BMS组电流模块或联系BMS厂家', '0', '1', null, 'group', '0'), ('108', '组充电电流将达上限_橙', 'ChaLim_O', '5', '请检查UPS状态或关闭UPS、联系UPS厂家', '0', '1', null, 'group', '1'), ('109', '组充电电流偏高_黄', 'ChaLim_Y', '6', '请检查UPS状态或关闭UPS、联系UPS厂家', '0', '1', null, 'group', '1'), ('110', '组充电电流超上限_红', 'ChaLim_R', '7', '请检查UPS状态或关闭UPS、联系UPS厂家', '0', '1', null, 'group', '0'), ('111', '组温度超上限_红', 'MaxTem_R', '1', '及时降温或关闭UPS', '0', '1', null, 'group', '0'), ('112', '组温度将达上限_橙', 'MaxTem_O', '2', '及时降温或关闭UPS', '0', '1', null, 'group', '1'), ('113', '组温度偏高_黄', 'MaxTem_Y', '3', '及时降温或关闭UPS', '0', '1', null, 'group', '1'), ('114', '组温度超下限_红', 'MinTem_R', '4', '做好保温或关闭UPS', '0', '1', null, 'group', '0'), ('115', '组温度将达下限_橙', 'MinTem_O', '5', '做好保温或关闭UPS', '0', '1', null, 'group', '1'), ('116', '组温度偏低_黄', 'MinTem_Y', '6', '做好保温或关闭UPS', '0', '1', null, 'group', '1');
COMMIT;

-- ----------------------------
--  Table structure for `station_param`
-- ----------------------------
DROP TABLE IF EXISTS `station_param`;
CREATE TABLE `station_param` (
  `sn_key` varchar(100) NOT NULL,
  `CurSensor` int(11) NOT NULL DEFAULT '101' COMMENT '电流传感安装状态',
  `sid` varchar(200) DEFAULT NULL COMMENT '站号',
  `Groups` int(11) DEFAULT '2' COMMENT '站内组数',
  `GroBats` int(11) DEFAULT '6' COMMENT '每组电池数',
  `Time_MR` int(11) DEFAULT '604800' COMMENT '内阻测量间隔',
  `Time_MV` int(11) DEFAULT '10' COMMENT '',
  `MaxTem_R` float DEFAULT '60' COMMENT '高温报警_红',
  `MaxTem_O` float DEFAULT '55' COMMENT '高温报警_橙',
  `MaxTem_Y` float DEFAULT '50' COMMENT '高温报警_黄',
  `MinTem_R` float DEFAULT '2' COMMENT '低温报警_红',
  `MinTem_O` float DEFAULT '5' COMMENT '低温报警_橙',
  `MinTem_Y` float DEFAULT '8' COMMENT '低温报警_黄',
  `MaxHum_R` float DEFAULT '90' COMMENT '高湿报警_红',
  `MaxHum_O` float DEFAULT '85' COMMENT '高湿报警_橙',
  `MaxHum_Y` float DEFAULT '80' COMMENT '高湿报警_黄',
  `MinHum_R` float DEFAULT '1' COMMENT '低湿报警_红',
  `MinHum_O` float DEFAULT '4' COMMENT '低湿报警_橙',
  `MinHum_Y` float DEFAULT '7' COMMENT '低湿报警_黄',
  `CurRange` float DEFAULT '100' COMMENT '站电流量程',
  `KI` float DEFAULT '0.03125' COMMENT '站电流系数',
  `ZeroCurADC` float DEFAULT '2400' COMMENT '站电流零位',
  `DisChaLim_R` float DEFAULT '40' COMMENT '放电报警_红',
  `DisChaLim_O` float DEFAULT '35' COMMENT '放电报警_橙',
  `DisChaLim_Y` float DEFAULT '30' COMMENT '放电报警_黄',
  `ChaLim_R` float DEFAULT '-20' COMMENT '充电报警_红',
  `ChaLim_O` float DEFAULT '-18' COMMENT '充电报警_橙',
  `ChaLim_Y` float DEFAULT '-16' COMMENT '充电报警_黄',
  `HiVolLim_R` float DEFAULT '89' COMMENT '高压报警_红',
  `HiVolLim_O` float DEFAULT '86' COMMENT '高压报警_橙',
  `HiVolLim_Y` float DEFAULT '83' COMMENT '高压报警_黄',
  `LoVolLim_R` float DEFAULT '63' COMMENT '低压报警_红',
  `LoVolLim_O` float DEFAULT '65' COMMENT '低压报警_橙',
  `LoVolLim_Y` float DEFAULT '67' COMMENT '低压报警_黄',
  `ChaCriterion` float DEFAULT '0.8' COMMENT '站充放电判据',
  `SampleInt` float DEFAULT NULL COMMENT '数据间隔',
  PRIMARY KEY (`sn_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `group_param`
-- ----------------------------
DROP TABLE IF EXISTS `group_param`;
CREATE TABLE `group_param` (
  `sn_key` varchar(100) NOT NULL,
  `CurRange` float DEFAULT '100' COMMENT '组电流量程',
  `KI` float DEFAULT '0.03125' COMMENT '组电流系数',
  `ZeroCurADC` float DEFAULT '2400' COMMENT '组电流零位',
  `DisChaLim_R` float DEFAULT '30' COMMENT '组放电电流超上限_红',
  `DisChaLim_O` float DEFAULT '28' COMMENT '组放电电流将达上限_橙',
  `DisChaLim_Y` float DEFAULT '25' COMMENT '组放电电流偏高_黄',
  `ChaLim_R` float DEFAULT '-20' COMMENT '组充电电流超上限_红',
  `ChaLim_O` float DEFAULT '-18' COMMENT '组充电电流将达上限_橙',
  `ChaLim_Y` float DEFAULT '-15' COMMENT '组充电电流偏高_黄',
  `MaxTem_R` float DEFAULT '60' COMMENT '组温度超上限_红',
  `MaxTem_O` float DEFAULT '55' COMMENT '组温度将达上限_橙',
  `MaxTem_Y` float DEFAULT '50' COMMENT '组温度偏高_黄',
  `MinTem_R` float DEFAULT '3' COMMENT '组温度超下限_红',
  `MinTem_O` float DEFAULT '5' COMMENT '组温度将达下限_橙',
  `MinTem_Y` float DEFAULT '9' COMMENT '组温度偏低_黄',
  `ChaCriterion` float DEFAULT '0.5' COMMENT '组充放电判据',
  `MaxHumi_R` float DEFAULT '90' COMMENT '组湿度超上限_红',
  `MaxHumi_O` float DEFAULT '85' COMMENT '组湿度将达上限_橙',
  `MaxHumi_Y` float DEFAULT '80' COMMENT '组湿度偏高_黄',
  `MinHumi_Y` float DEFAULT '8' COMMENT '组湿度偏低_黄',
  `MinHumi_O` float DEFAULT '5' COMMENT '组湿度将达下限_橙',
  `MinHumi_R` float DEFAULT '3' COMMENT '组湿度超下限_红',
  PRIMARY KEY (`sn_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `battery_param`
-- ----------------------------
DROP TABLE IF EXISTS `battery_param`;
CREATE TABLE `battery_param` (
  `sn_key` varchar(100) NOT NULL,
  `KV` float DEFAULT '0.004333' COMMENT '电压系数',
  `KT` float DEFAULT '-0.129' COMMENT '温度系数',
  `KI` float DEFAULT '0.001' COMMENT '激励电流系数',
  `T0` float DEFAULT '23.5' COMMENT 'T0校准温度',
  `ADC_T0` float DEFAULT '2400' COMMENT 'T0温度码',
  `T1` float DEFAULT '60' COMMENT 'T1校准温度',
  `ADC_T1` float DEFAULT '2090' COMMENT 'T1温度码',
  `MaxU_R` float DEFAULT '14.1' COMMENT '电池电压超上限_红',
  `MaxU_O` float DEFAULT '14' COMMENT '电池电压将达上限_橙',
  `MaxU_Y` float DEFAULT '13.9' COMMENT '电池电压偏高_黄',
  `MinU_R` float DEFAULT '10.2' COMMENT '电池电压超下限_红',
  `MinU_O` float DEFAULT '10.5' COMMENT '电池电压将达下限_橙',
  `MinU_Y` float DEFAULT '10.8' COMMENT '电池电压偏低_黄',
  `MaxT_R` float DEFAULT '55' COMMENT '电池温度超上限_红',
  `MaxT_O` float DEFAULT '50' COMMENT '电池温度将达上限_橙',
  `MaxT_Y` float DEFAULT '45' COMMENT '电池温度偏高_黄',
  `MinT_R` float DEFAULT '3' COMMENT '电池温度超下限_红',
  `MinT_O` float DEFAULT '6' COMMENT '电池温度将达下限_橙',
  `MinT_Y` float DEFAULT '9' COMMENT '电池温度偏低_黄',
  `MaxR_R` float DEFAULT '15' COMMENT '电池内阻超上限_红',
  `MaxR_O` float DEFAULT '12.5' COMMENT '电池内阻将达上限_橙',
  `MaxR_Y` float DEFAULT '10' COMMENT '电池内阻偏高_黄',
  `MaxDevU_R` float DEFAULT '0.5' COMMENT '电池电压偏差_红',
  `MaxDevU_O` float DEFAULT '0.4' COMMENT '电池电压偏差_橙',
  `MaxDevU_Y` float DEFAULT '0.3' COMMENT '电池电压偏差_黄',
  `MaxDevT_R` float DEFAULT '5' COMMENT '电池温度偏差_红',
  `MaxDevT_O` float DEFAULT '4' COMMENT '电池温度偏差_橙',
  `MaxDevT_Y` float DEFAULT '3' COMMENT '电池温度偏差_黄',
  `MaxDevR_R` float DEFAULT '5' COMMENT '电池内阻偏差_红',
  `MaxDevR_O` float DEFAULT '4' COMMENT '电池内阻偏差_橙',
  `MaxDevR_Y` float DEFAULT '3' COMMENT '电池内阻偏差_黄',
  PRIMARY KEY (`sn_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `systemalarm`
-- ----------------------------
DROP TABLE IF EXISTS `systemalarm`;
CREATE TABLE `systemalarm` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `stationid` varchar(100) DEFAULT NULL COMMENT '站MAC',
  `sid` varchar(255) DEFAULT NULL COMMENT '站号',
  `desc` text COMMENT '描述',
  `tips` text COMMENT '解决方案描述',
  `record_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '记录时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=836 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `systemalarm`
-- ----------------------------
BEGIN;
INSERT INTO `systemalarm` VALUES ('826', '100000004', null, '站点连接断开', '检查站点或本地网络状况，电源及通信线路或联系BMS厂家', '2018-08-17 13:34:38'), ('827', '100000005', null, '站点连接断开', '检查站点或本地网络状况，电源及通信线路或联系BMS厂家', '2018-08-17 13:34:38'), ('828', '100000001', null, '站点连接断开', '检查站点或本地网络状况，电源及通信线路或联系BMS厂家', '2018-08-17 13:34:38'), ('829', '100000007', null, '站点连接断开', '检查站点或本地网络状况，电源及通信线路或联系BMS厂家', '2018-08-17 13:34:38'), ('830', '100000006', null, '站点连接断开', '检查站点或本地网络状况，电源及通信线路或联系BMS厂家', '2018-08-17 13:34:38'), ('831', '100000008', null, '站点连接断开', '检查站点或本地网络状况，电源及通信线路或联系BMS厂家', '2018-08-17 13:34:38'), ('832', '100000009', null, '站点连接断开', '检查站点或本地网络状况，电源及通信线路或联系BMS厂家', '2018-08-17 13:34:38'), ('833', '100000003', null, '站点连接断开', '检查站点或本地网络状况，电源及通信线路或联系BMS厂家', '2018-08-17 13:34:38'), ('834', '100000002', null, '站点连接断开', '检查站点或本地网络状况，电源及通信线路或联系BMS厂家', '2018-08-17 13:34:38'), ('835', '100000000', null, '站点连接断开', '检查站点或本地网络状况，电源及通信线路或联系BMS厂家', '2018-08-17 13:34:38');
COMMIT;

-- ----------------------------
--  Table structure for `tree`
-- ----------------------------
DROP TABLE IF EXISTS `tree`;
CREATE TABLE `tree` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `pid` int(10) NOT NULL COMMENT '上级id',
  `title` varchar(255) DEFAULT NULL COMMENT '标题',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=92 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `tree`
-- ----------------------------
BEGIN;
INSERT INTO `tree` VALUES ('1', '0', '中国'), ('25', '1', '北京'), ('49', '1', '山西'), ('59', '25', '石景山农商行'), ('68', '49', '怀仁'), ('69', '25', '朝阳'), ('71', '59', '阜石路'), ('72', '25', '石景山区'), ('73', '72', '泽洋大厦'), ('79', '25', '四方继保股份公司'), ('80', '79', '金融事业部'), ('81', '68', '中芦煤业'), ('84', '73', '开发部'), ('86', '1', '山东'), ('87', '59', '新区域'), ('88', '87', '新区域222'), ('89', '59', '新区域2'), ('90', '89', '新区域3'), ('91', '1', '湖南');
COMMIT;

-- ----------------------------
--  Table structure for `ups_info`
-- ----------------------------
DROP TABLE IF EXISTS `ups_info`;
CREATE TABLE `ups_info` (
  `sn_key` varchar(100) NOT NULL COMMENT 'sn_key',
  `ups_factory` varchar(255) NOT NULL COMMENT '生产厂家',
  `ups_type` varchar(50) NOT NULL COMMENT '型号',
  `ups_create_date` datetime NOT NULL COMMENT '生产日期',
  `ups_install_date` datetime NOT NULL COMMENT '安装日期',
  `ups_power` double NOT NULL COMMENT '功率/容量（V/A）',
  `redundancy_num` int(10) NOT NULL COMMENT '冗余数量(台)',
  `floting_charge` double NOT NULL COMMENT '浮充电压（V）',
  `ups_vdc` varchar(255) NOT NULL COMMENT '电压范围(V)',
  `ups_reserve_hour` int(10) NOT NULL COMMENT '额定候备时间（W/H）',
  `ups_charge_mode` varchar(50) NOT NULL COMMENT '充电方式',
  `ups_max_charge` double NOT NULL COMMENT '最大充电电流（A）',
  `ups_max_discharge` double NOT NULL COMMENT '最大放电电流（A）',
  `ups_period_days` int(10) NOT NULL COMMENT '规定维护周期（天）',
  `ups_discharge_time` int(10) NOT NULL COMMENT '维护放电时长（分钟）',
  `ups_discharge_capacity` double NOT NULL COMMENT '维护放电容量（%）',
  `ups_maintain_date` date NOT NULL COMMENT '维护到期日',
  `ups_vender` varchar(200) DEFAULT NULL COMMENT '厂家联系人',
  `ups_vender_phone` varchar(20) NOT NULL COMMENT '厂家联系电话',
  `ups_service` varchar(50) NOT NULL COMMENT '服务商名称',
  `ups_service_phone` varchar(20) NOT NULL COMMENT '服务商电话',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `ups_power_in` varchar(100) DEFAULT NULL COMMENT '输入功率（V/A）',
  `ups_power_out` varchar(100) DEFAULT NULL COMMENT '输出功率（V/A）',
  `ups_battery_vol` varchar(100) DEFAULT NULL COMMENT '外接电池电压（V）',
  `ups_battery_current` varchar(100) DEFAULT NULL COMMENT '外接电池电流（A）',
  `ac_protect` varchar(100) DEFAULT NULL COMMENT 'AC过流保护（V/A）',
  `dc_protect` varchar(100) DEFAULT NULL COMMENT 'DC过流保护（V/A）',
  `on_net` varchar(100) DEFAULT NULL COMMENT '联网检测',
  `alarm_content` varchar(100) DEFAULT NULL COMMENT '报警内容',
  `discharge_protect` varchar(100) DEFAULT NULL COMMENT '放电保护值（%）',
  `remark` text COMMENT '备注信息',
  PRIMARY KEY (`sn_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='UPS信息表';

-- ----------------------------
--  Records of `ups_info`
-- ----------------------------
BEGIN;
INSERT INTO `ups_info` VALUES ('100000000', '中国', '101MAT', '2018-08-04 16:00:00', '2018-08-04 16:00:00', '12', '12', '11', '234', '22', '234', '234', '22', '23', '234', '23', '2018-08-07', '222', '34234', '2342', '2342', '2018-08-10 03:32:31', '2018-08-13 08:22:34', '12', '12', '12', '121', '11', '11', '111', '11', '11', ''), ('100000001', '中国', '', '2018-08-04 16:00:00', '2018-08-04 16:00:00', '12', '12', '11', '234', '22', '234', '234', '22', '23', '234', '23', '2018-08-07', '222', '34234', '2342', '2342', '2018-08-10 04:33:11', '2018-08-10 04:33:11', '12', '12', '12', '121', '11', '11', '111', '11', '11', ''), ('100000002', '中国', '', '2018-08-03 16:00:00', '2018-08-03 16:00:00', '12', '12', '11', '234', '22', '234', '234', '22', '23', '234', '23', '2018-08-06', '222', '34234', '2342', '2342', '2018-08-10 06:24:44', '2018-08-10 06:24:44', '12', '12', '12', '121', '11', '11', '111', '11', '11', ''), ('100000003', '中国', '', '2018-08-02 16:00:00', '2018-08-02 16:00:00', '12', '12', '11', '234', '22', '234', '234', '22', '23', '234', '23', '2018-08-05', '222', '34234', '2342', '2342', '2018-08-10 06:25:17', '2018-08-10 06:25:17', '12', '12', '12', '121', '11', '11', '111', '11', '11', ''), ('100000004', '中国', '101MAT', '2018-08-03 16:00:00', '2018-08-03 16:00:00', '12', '12', '11', '234', '22', '234', '234', '22', '23', '234', '23', '2018-08-06', '222', '34234', '2342', '2342', '2018-08-14 08:26:26', '2018-08-14 08:26:26', '12', '12', '12', '121', '11', '11', '111', '11', '11', ''), ('100000005', '中国', '101MAT', '2018-08-02 16:00:00', '2018-08-02 16:00:00', '12', '12', '11', '234', '22', '234', '234', '22', '23', '234', '23', '2018-08-05', '222', '34234', '2342', '2342', '2018-08-14 08:27:21', '2018-08-14 08:27:21', '12', '12', '12', '121', '11', '11', '111', '11', '11', ''), ('100000006', '中国', '101MAT', '2018-08-01 16:00:00', '2018-08-01 16:00:00', '12', '12', '11', '234', '22', '234', '234', '22', '23', '234', '23', '2018-08-04', '222', '34234', '2342', '2342', '2018-08-14 08:30:37', '2018-08-14 08:30:37', '12', '12', '12', '121', '11', '11', '111', '11', '11', ''), ('100000007', '中国', '101MAT', '2018-07-31 16:00:00', '2018-07-31 16:00:00', '12', '12', '11', '234', '22', '234', '234', '22', '23', '234', '23', '2018-08-03', '222', '34234', '2342', '2342', '2018-08-14 08:53:08', '2018-08-14 08:53:08', '12', '12', '12', '121', '11', '11', '111', '11', '11', ''), ('100000008', '中国', '101MAT', '2018-07-30 16:00:00', '2018-07-30 16:00:00', '12', '12', '11', '234', '22', '234', '234', '22', '23', '234', '23', '2018-08-02', '222', '34234', '2342', '2342', '2018-08-16 05:18:19', '2018-08-16 05:18:19', '12', '12', '12', '121', '11', '11', '111', '11', '11', ''), ('100000009', '中国', '101MAT', '2018-07-29 16:00:00', '2018-07-29 16:00:00', '12', '12', '11', '234', '22', '234', '234', '22', '23', '234', '23', '2018-08-01', '222', '34234', '2342', '2342', '2018-08-16 05:18:34', '2018-08-16 05:18:34', '12', '12', '12', '121', '11', '11', '111', '11', '11', ''), ('100000010', '中国', '101MAT', '2018-07-28 16:00:00', '2018-07-28 16:00:00', '12', '12', '11', '234', '22', '234', '234', '22', '23', '234', '23', '2018-07-31', '222', '34234', '2342', '2342', '2018-08-16 05:18:57', '2018-08-16 05:18:57', '12', '12', '12', '121', '11', '11', '111', '11', '11', ''), ('100000011', '中国', '101MAT', '2018-07-27 16:00:00', '2018-07-27 16:00:00', '12', '12', '11', '234', '22', '234', '234', '22', '23', '234', '23', '2018-07-30', '222', '34234', '2342', '2342', '2018-08-16 05:19:30', '2018-08-16 05:19:30', '12', '12', '12', '121', '11', '11', '111', '11', '11', ''), ('100000012', '中国', '101MAT', '2018-07-26 16:00:00', '2018-07-26 16:00:00', '12', '12', '11', '234', '22', '234', '234', '22', '23', '234', '23', '2018-07-29', '222', '34234', '2342', '2342', '2018-08-16 05:19:56', '2018-08-16 05:19:56', '12', '12', '12', '121', '11', '11', '111', '11', '11', '');
COMMIT;


SET FOREIGN_KEY_CHECKS = 1;
