-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: api6sem
-- ------------------------------------------------------
-- Server version	8.0.35

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
-- Table structure for table `tb_comodo_acesso`
--

DROP TABLE IF EXISTS `tb_comodo_acesso`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_comodo_acesso` (
  `id_acesso` int unsigned NOT NULL AUTO_INCREMENT,
  `classificacao_acesso` varchar(255) NOT NULL,
  `observacao_acesso` varchar(255) DEFAULT NULL,
  `horario_acesso` varchar(255) NOT NULL,
  `id_comodo_portas` int unsigned NOT NULL,
  `id_usuario` int unsigned NOT NULL,
  `acesso_autorizado` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id_acesso`),
  KEY `tb_comodo_acesso_id_comodo_portas_foreign` (`id_comodo_portas`),
  KEY `tb_comodo_acesso_id_usuario_foreign` (`id_usuario`),
  CONSTRAINT `tb_comodo_acesso_id_comodo_portas_foreign` FOREIGN KEY (`id_comodo_portas`) REFERENCES `tb_comodo_portas` (`id_comodo_portas`) ON DELETE CASCADE,
  CONSTRAINT `tb_comodo_acesso_id_usuario_foreign` FOREIGN KEY (`id_usuario`) REFERENCES `tb_usuario` (`id_usuario`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_comodo_acesso`
--

LOCK TABLES `tb_comodo_acesso` WRITE;
/*!40000 ALTER TABLE `tb_comodo_acesso` DISABLE KEYS */;
INSERT INTO `tb_comodo_acesso` VALUES (1,'Administrador','Acesso liberado apenas para admins','2024-09-16 10:00:00',7,3,0),(2,'Administrador','Acesso liberado apenas para admins','2024-09-16 10:00:00',7,3,1),(3,'Administrador','Acesso liberado apenas para admins','2024-09-16 10:00:00',6,4,1),(4,'Administrador','Acesso liberado apenas para admins','2024-09-16 10:00:00',7,5,1),(5,'Administrador','Acesso liberado apenas para admins','2024-09-16 11:00:00',7,5,1),(6,'Administrador','Acesso liberado apenas para admins','2024-09-16 14:00:00',8,3,1),(8,'Administrador','Acesso liberado apenas para admins','2024-09-16 20:00:00',7,4,1),(9,'Administrador','Acesso liberado apenas para admins','2024-09-16 22:00:00',7,4,1);
/*!40000 ALTER TABLE `tb_comodo_acesso` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-22 21:40:18
