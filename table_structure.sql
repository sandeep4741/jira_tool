CREATE DATABASE  IF NOT EXISTS `taskmanager` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `taskmanager`;
-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: taskmanager
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tasks`
--

DROP TABLE IF EXISTS `tasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tasks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text,
  `status` enum('created','ready','tagged','qc','completed') NOT NULL DEFAULT 'created',
  `user_id` int DEFAULT NULL,
  `User` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `tasks_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tasks`
--

LOCK TABLES `tasks` WRITE;
/*!40000 ALTER TABLE `tasks` DISABLE KEYS */;
INSERT INTO `tasks` VALUES (1,'create signup/login','1111','completed',2,'sandeep','2023-09-01 09:54:39','2023-09-07 09:48:53'),(2,'jira tool','22','completed',3,'yashwanth','2023-09-01 09:56:00','2023-09-12 05:20:02'),(3,'login','bb','tagged',5,'mahesh3','2023-09-01 10:01:37','2023-09-01 10:01:49'),(4,'login','3e3','completed',4,'raju','2023-09-01 10:20:08','2023-09-04 06:36:08'),(5,'task4','funday','qc',2,'sandeep','2023-09-06 10:27:09','2023-09-08 07:55:14'),(6,'bright','attendence','completed',3,'yashwanth','2023-09-07 09:49:42','2023-09-08 05:07:11'),(7,'something','ddoo','qc',4,'raju','2023-09-08 05:04:37','2023-09-12 04:36:35'),(8,'jira tool3','jjj','qc',2,'sandeep','2023-09-08 07:55:41','2023-09-08 11:27:37'),(9,'task1','aaa','completed',3,'yashwanth','2023-09-12 04:34:08','2023-09-12 10:25:45'),(10,'task2','description','qc',2,'sandeep','2023-09-12 04:34:30','2023-09-12 09:16:42'),(11,'task3','desc','qc',2,'sandeep','2023-09-12 04:34:38','2023-09-12 07:22:31'),(12,'ff','t','completed',3,'yashwanth','2023-09-12 07:34:02','2023-09-12 10:25:50'),(13,'bun','1.0','tagged',2,'sandeep','2023-09-12 09:18:12','2023-09-12 10:24:53'),(14,'hut','put','completed',3,'yashwanth','2023-09-12 09:18:49','2023-09-12 09:19:21'),(15,'bun','1','tagged',3,'yashwanth','2023-09-12 10:25:32','2023-09-12 10:25:48');
/*!40000 ALTER TABLE `tasks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('user','admin') DEFAULT 'user',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'mahesh s','mahesh@gmail.com','1234','admin'),(2,'sandeep','sandeepkmr1143@gmail.com','1234','user'),(3,'yashwanth','yash@gmail.com','1234','user'),(4,'raju','raju@gmail.com','1234','user'),(5,'mahesh3','mahesh3@gmail.com','1234','user'),(6,'sandeep',' sandeepkmr1143@gmail.com','1234','user'),(7,'mayu','mayu@gmail.com','1234','admin');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-09-12 16:05:14
