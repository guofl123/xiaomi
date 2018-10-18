/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50709
Source Host           : localhost:3306
Source Database       : shop-1808

Target Server Type    : MYSQL
Target Server Version : 50709
File Encoding         : 65001

Date: 2018-10-18 19:05:13
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for shop_user
-- ----------------------------
DROP TABLE IF EXISTS `shop_user`;
CREATE TABLE `shop_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  `mark` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=133 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of shop_user
-- ----------------------------
INSERT INTO `shop_user` VALUES ('80', 'gfl', '12345', null);
INSERT INTO `shop_user` VALUES ('81', 'ggg', 'gggg', null);
INSERT INTO `shop_user` VALUES ('82', '12344', '', null);
INSERT INTO `shop_user` VALUES ('83', 'gfl1122', '', null);
INSERT INTO `shop_user` VALUES ('84', 'gfl22', '22222', null);
INSERT INTO `shop_user` VALUES ('85', '1222222', '222222', null);
INSERT INTO `shop_user` VALUES ('86', '', '', null);
INSERT INTO `shop_user` VALUES ('87', 'dddd', 'dddd', null);
INSERT INTO `shop_user` VALUES ('88', '1', '1', null);
INSERT INTO `shop_user` VALUES ('89', 'xxxxx', 'xxx', null);
INSERT INTO `shop_user` VALUES ('90', 'ddddf', 'ffg', null);
INSERT INTO `shop_user` VALUES ('91', 'dff', 'ffff', null);
INSERT INTO `shop_user` VALUES ('92', 'eert', '123', null);
INSERT INTO `shop_user` VALUES ('93', '2', '22', null);
INSERT INTO `shop_user` VALUES ('94', '1rr', '1rrr', null);
INSERT INTO `shop_user` VALUES ('95', '144', '144', null);
INSERT INTO `shop_user` VALUES ('96', '4444', '4444', null);
INSERT INTO `shop_user` VALUES ('97', '6666', '6666', null);
INSERT INTO `shop_user` VALUES ('98', '1233', '133', null);
INSERT INTO `shop_user` VALUES ('99', '1888', '65555', null);
INSERT INTO `shop_user` VALUES ('100', '1er', '1rr', null);
INSERT INTO `shop_user` VALUES ('101', '555', '6666', null);
INSERT INTO `shop_user` VALUES ('102', '5554554', '666655', null);
INSERT INTO `shop_user` VALUES ('103', '1545', '1555', null);
INSERT INTO `shop_user` VALUES ('104', '154544', '15555554', null);
INSERT INTO `shop_user` VALUES ('105', '1ttt', '1ttt', null);
INSERT INTO `shop_user` VALUES ('106', '1fff', '1ree', null);
INSERT INTO `shop_user` VALUES ('107', '1fffeer', '1reerr', null);
INSERT INTO `shop_user` VALUES ('108', '1fffeere', '1reerrrerer', null);
INSERT INTO `shop_user` VALUES ('109', '1u', '1u', null);
INSERT INTO `shop_user` VALUES ('110', 'eeee', 'eee', null);
INSERT INTO `shop_user` VALUES ('111', '133', '1333', null);
INSERT INTO `shop_user` VALUES ('112', '2222', 'seee', null);
INSERT INTO `shop_user` VALUES ('113', '1111', '22222', null);
INSERT INTO `shop_user` VALUES ('114', '1ee', '1ee', null);
INSERT INTO `shop_user` VALUES ('115', '1fffuuu', '1fff', null);
INSERT INTO `shop_user` VALUES ('116', 'eee', 'eee', null);
INSERT INTO `shop_user` VALUES ('117', '1ff', '1ff', null);
INSERT INTO `shop_user` VALUES ('118', '1233344', '1444', null);
INSERT INTO `shop_user` VALUES ('119', '155555', '15555', null);
INSERT INTO `shop_user` VALUES ('120', 'eeeerrttgg', '1fggg', null);
INSERT INTO `shop_user` VALUES ('121', 'eeeerrttggff', '1fgggfff', null);
INSERT INTO `shop_user` VALUES ('122', '1dddd', '1eeee', null);
INSERT INTO `shop_user` VALUES ('123', '144444', '144444', null);
INSERT INTO `shop_user` VALUES ('124', '1yttrrtrt', 'ttttrtrtr', null);
INSERT INTO `shop_user` VALUES ('125', '144444454', '155555', null);
INSERT INTO `shop_user` VALUES ('126', 'zzz', '1zzzzzz', null);
INSERT INTO `shop_user` VALUES ('127', '333', '4444', null);
INSERT INTO `shop_user` VALUES ('128', '15555', '156555', null);
INSERT INTO `shop_user` VALUES ('129', '14456666', '1446', null);
INSERT INTO `shop_user` VALUES ('130', '1tr677', '1yuyuy', null);
INSERT INTO `shop_user` VALUES ('131', '1trrttr', '1tttt', null);
INSERT INTO `shop_user` VALUES ('132', '888', '888', null);
