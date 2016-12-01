-- MySQL dump 10.11
--
-- to install this database, from a terminal, type:
-- mysql -u USERNAME -p -h SERVERNAME cheapoMail < cheapoMail.sql
--
-- Host: localhost    Database: cheapoMail
-- ------------------------------------------------------
-- Server version   5.0.45-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

DROP DATABASE IF EXISTS cheapoMail;
CREATE DATABASE cheapoMail;
USE cheapoMail;

--
-- Table structure for table 'user'
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL auto_increment,
  `first_name` varchar(35) NOT NULL default '',
  `last_name` varchar(35) NOT NULL default '',
  `username` varchar(35) NOT NULL default '',
  `password` varchar(64) NOT NULL,
  UNIQUE(`username`),
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;


--
-- Table structure for table 'messages'
--

DROP TABLE IF EXISTS `message`;
CREATE TABLE `message` (
  `id` int(11) NOT NULL auto_increment,
  `recipent_ids` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `subject` varchar(128) NOT NULL default '',
  `body` varchar(255) NOT NULL default '',
  `date_sent` datetime NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

--
-- Table structure for table 'message_read'
--

DROP TABLE IF EXISTS `message_read`;
CREATE TABLE `message_read` (
	`id` int(11) NOT NULL auto_increment,
	`message_id` int(11) NOT NULL,
	`reader_id` int(11) NOT NULL,
	`date` datetime NOT NULL,
	PRIMARY KEY (`id`)
)ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

INSERT INTO user (first_name,last_name,username,password) values ('admin','admin','admin','49f41477fa1bfc3b4792d5233b6a659f4bc1772692e9d5fe7db0624a300652eb');

