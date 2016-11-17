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

DROP TABLE IF EXISTS 'users';
CREATE TABLE 'user' (
  'id' int(11) NOT NULL auto_increment,
  'first_name' char(35) NOT NULL default '',
  'last_name' char(35) NOT NULL default '',
  'username' char(35) NOT NULL default '',
  'password' char(20) NOT NULL default '',
  PRIMARY KEY  ('id')
) ENGINE=MyISAM AUTO_INCREMENT=4080 DEFAULT CHARSET=utf8;

--
-- Table structure for table 'messages'
--
DROP TABLE IF EXISTS 'messages';
CREATE TABLE 'countries' (
  'id' int(11) NOT NULL auto_increment,
  'recipent_ids' int(11) NOT NULL default '',
  'user_id' int(11) NOT NULL default '',
  'subject' char(35) NOT NULL default '',
  'body' char(100) NOT NULL default '',
  'date_sent' smallint(6) default NULL,
  'population' int(11) NOT NULL default '0',
  PRIMARY KEY  ('id')
) ENGINE=MyISAM AUTO_INCREMENT=4080 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS 'messages_read';
CREATE TABLE 'languages' (
  'id' int(11) NOT NULL auto_increment,
  'message_id' int(11) NOT NULL default '',
  'reader_id' int(11) NOT NULL default '',
  'date' smallint(6) default NULL,
  PRIMARY KEY  ('id')
) ENGINE=MyISAM AUTO_INCREMENT=4080 DEFAULT CHARSET=utf8;