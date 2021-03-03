create database Splitwise_273;
use Splitwise_273;
SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for account
-- ----------------------------
DROP TABLE IF EXISTS `account`;
CREATE TABLE `account` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `psswd` varchar(300) NOT NULL,
  `phone` char(10) NOT NULL,
  `picture` char(100),
  `currency` char(1),
  `time` char(50),
  `language` char(10,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- ----------------------------
-- Table structure for owed
-- ----------------------------
DROP TABLE IF EXISTS `owed`;
CREATE TABLE `owed` (
  `U1_ID` int NOT NULL,
  `U2_ID` int NOT NULL,
  `money` int NOT NULL,
  `group` varchar(50) NULL,
  `owed` int NOT NULL,
  PRIMARY KEY (`U_ID`,`R_ID`),
  CONSTRAINT `owe_ibfk_1` FOREIGN KEY (`U_ID`) REFERENCES `account` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for group
-- ----------------------------
DROP TABLE IF EXISTS `team`;
CREATE TABLE `Splitwise_273`.`team` (
  `G_ID` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `member` VARCHAR(200) NULL,
  `picture` CHAR(100) NULL,
  PRIMARY KEY (`G_ID`));

-- ----------------------------
-- Table structure for expenses
-- ----------------------------
DROP TABLE IF EXISTS `expenses`;
CREATE TABLE `expenses` (
  `E_ID` int NOT NULL,
  `name` varchar(20) NOT NULL,
  `description` varchar(100) NOT NULL,
  `expense` int NOT NULL,
  `date` datetime NOT NULL,
  `host` varchar(15) NOT NULL,
  `others` list<text> NOT NULL,
  PRIMARY KEY (`E_ID`),
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for activity
-- ----------------------------
DROP TABLE IF EXISTS `activity`;
CREATE TABLE `activity` (
  `A_ID` int NOT NULL,
  `name` varchar(20) NOT NULL,
  `action` varchar(100) NOT NULL,
  `date` datetime NOT NULL,
  PRIMARY KEY (`A_ID`),
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;