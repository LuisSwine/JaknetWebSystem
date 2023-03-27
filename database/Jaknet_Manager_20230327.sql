-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: bd_scgj_proof
-- ------------------------------------------------------
-- Server version	8.0.31

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
-- Temporary view structure for view `areas_view001`
--

DROP TABLE IF EXISTS `areas_view001`;
/*!50001 DROP VIEW IF EXISTS `areas_view001`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `areas_view001` AS SELECT 
 1 AS `folio`,
 1 AS `nombre`,
 1 AS `documentacion`,
 1 AS `folio_planta`,
 1 AS `ubicacion`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `asignacion_usuario_view001`
--

DROP TABLE IF EXISTS `asignacion_usuario_view001`;
/*!50001 DROP VIEW IF EXISTS `asignacion_usuario_view001`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `asignacion_usuario_view001` AS SELECT 
 1 AS `folio_asignacion`,
 1 AS `folio_usuario`,
 1 AS `nombre_usuario`,
 1 AS `apellido_usuario`,
 1 AS `folio_tarea`,
 1 AS `descripcion`,
 1 AS `folio_etapa`,
 1 AS `etapa`,
 1 AS `folio_area_etapa`,
 1 AS `area`,
 1 AS `folio_proyecto`,
 1 AS `proyecto`,
 1 AS `folio_ubicacion`,
 1 AS `ubicacion`,
 1 AS `folio_cliente`,
 1 AS `cliente`,
 1 AS `fecha`,
 1 AS `folio_estatus`,
 1 AS `estatus`,
 1 AS `folio_tipo`,
 1 AS `tipo`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `cat001_usuarios`
--

DROP TABLE IF EXISTS `cat001_usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cat001_usuarios` (
  `folio` int NOT NULL AUTO_INCREMENT,
  `nombres` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci NOT NULL,
  `apellidos` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci NOT NULL,
  `usuario` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci NOT NULL,
  `pass` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci NOT NULL,
  `telefono` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci NOT NULL,
  `email` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci NOT NULL,
  `saldo` double DEFAULT '0',
  `documentacion` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci NOT NULL,
  `tipo_usuario` int NOT NULL,
  `ruta_imagen` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci DEFAULT 'Imagenes/default.png',
  PRIMARY KEY (`folio`),
  KEY `tipo_usuario` (`tipo_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cat001_usuarios`
--

LOCK TABLES `cat001_usuarios` WRITE;
/*!40000 ALTER TABLE `cat001_usuarios` DISABLE KEYS */;
INSERT INTO `cat001_usuarios` VALUES (1,'Luis Angel','Lopez Alvarez','LuisLopezAdmin','$2y$10$R14bjAo7qnpyJNs8zjFy7ejSqm7h0Prl7APEJdeFNk6PbyDnFDmLG','55-5100-6827','proyectos@tekcomit.com',0,'https://drive.google.com/drive/folders/1Ohjg4KJWfTHgWIzWa1Q8by2RcfWuT7_j?usp=sharing',0,'Imagenes/default.png'),(2,'Mauricio','Noyola Diaz','MauricioNoyola','$2a$08$h3xOEAeqMBDjkmVN9botGOVnqyGql7UbtEYODEq7Ffamo79uOJBBS','55-1286-7367','m.noyolad94@gmail.com',0,'https://drive.google.com/drive/folders/1ChZchJrXYlV-GvF6KOLdz4yMOsoUN3tM?usp=share_link',1,'Imagenes/default.png'),(3,'Omar Sinueet','Vega Moncivais','OmarVega','$2a$08$tjDzuQMBgR8GjmeVAMgqxuNi0KyR0ZSN0DhYBRz7Hc9SDL8W5ZTim','55-6914-0667','omarsinvemo@gmail.com',0,'https://drive.google.com/drive/folders/1Vmnuq2CsJg1fPVIzRfwIm-M2nlqtdGzK?usp=share_link',1,'Imagenes/default.png'),(4,'Luis Angel','Corona Cruz','LuisCorona','$2a$08$xWUqRzauyEy7.nKGzGTsLeIBbiOtiuRyU7FYTNOHJga2JDcDZ8.HO','56-3038-2565','l.corona@tekcomit.net',0,'https://drive.google.com/drive/folders/1hVQ6hl4VTGvA3Zj7RcfAOgKrc06DnT7o?usp=share_link',1,'Imagenes/default.png'),(5,'Daniel Ivan','Tadeo Hernandez','DanielTadeo','$2a$08$SRbKcS0x/iLKr.c13kF7fOSYcofVcQKorfN3mWjbo7EVLJHKhhJrm','55-1243-5214','ingresa.tu@correo.com',0,'https://drive.google.com/drive/folders/1eMznFGISGjV4A1SdvaImQ9fl4xvh273c?usp=share_link',2,'Imagenes/default.png'),(6,'Enrique Obed','Vega Moncivais','EnriqueVega','$2a$08$RrPX25WcQQJTkH2ySokVXO3SmB73mMfi9NKEHyST55kOeC48tyrwq','55-7006-9506','ingresa.tu@correo.com',0,'https://drive.google.com/drive/folders/1FIu5SfhE8XyIa94u2h7BUvTBdOUu1lvh?usp=share_link',2,'Imagenes/default.png'),(7,'Erick Fabian','Ruiz Romero','ErickRuiz','$2a$08$HZP9LhTn3v8Ake3zgGnn8uGnshjj11p7O8iIFhAECSHqhPOyZvPj2','55-2738-3055','ingresa.tu@correo.com',0,'https://drive.google.com/drive/folders/1xqepgZSpplgwxtckBk24IYMOpb7wTF03?usp=share_link',2,'Imagenes/default.png'),(8,'Gustavo','Garcia Moncada','GustavoGarcia','$2a$08$se67Bj7SB9GyU6B9nqUhp.xCoWibdvnpr/cvQhXzPxChqvkJ/OrBG','55-4421-1790','ingresa.tu@correo.com',0,'https://drive.google.com/drive/folders/18wphn_K9CPLCJ9ut-QyAaxa01AdGqlhO?usp=share_link',2,'Imagenes/default.png'),(9,'Kinberly','Romo Garcia','KinberlyRomo','$2a$08$00o.LMfmLDC3ooGp5PG9AelPOwj0j7nG50dCJ/4DmP9xOU0.Hufpy','56-3807-4789','procesos@tekcomit.net',0,'https://drive.google.com/drive/folders/1iyEMvbemyOFPLeZ0Y4EAImtbxy0lzzf1?usp=share_link',2,'Imagenes/default.png'),(10,'Israel','Pendiente','Israel','$2a$08$kVEEZH.DJj2S7AoAt2h3GuTOC8e99A4ZDDWNbLqDAhfw6Ud7OFBPu','55-7687-0957','ingresa.tu@correo.com',0,'https://drive.google.com/drive/folders/1CGjdGiReuh7jF-9J4-dBxsS1155X-qlF?usp=share_link',2,'Imagenes/default.png'),(11,'Abraham Jacobo','Perez Franco','AbrahamPerez','$2a$08$HFG1FrYYi6aWe2GKv4pPtO22sVgWdg1mjZ646R2YTHIJWZlLOi4Wa','55-1452-8740','aperez@jakent.com.mx',0,'https://drive.google.com/drive/folders/1kf96STMp6r-QesaYXExrSzoxAny2wtfe?usp=share_link',0,'Imagenes/default.png');
/*!40000 ALTER TABLE `cat001_usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cat002_tipo_usuario`
--

DROP TABLE IF EXISTS `cat002_tipo_usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cat002_tipo_usuario` (
  `id` int NOT NULL,
  `tipo` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cat002_tipo_usuario`
--

LOCK TABLES `cat002_tipo_usuario` WRITE;
/*!40000 ALTER TABLE `cat002_tipo_usuario` DISABLE KEYS */;
INSERT INTO `cat002_tipo_usuario` VALUES (0,'Superadministrador'),(1,'Administrador'),(2,'Empleado');
/*!40000 ALTER TABLE `cat002_tipo_usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cat003_clientes`
--

DROP TABLE IF EXISTS `cat003_clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cat003_clientes` (
  `folio` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci NOT NULL,
  `tipo_cliente` int NOT NULL,
  `tipo_servicio` int NOT NULL,
  PRIMARY KEY (`folio`),
  KEY `cat003_clientes_ibfk_1` (`tipo_cliente`),
  KEY `cat003_clientes_ibfk_2` (`tipo_servicio`),
  CONSTRAINT `cat003_clientes_ibfk_1` FOREIGN KEY (`tipo_cliente`) REFERENCES `cat012_tipo_cliente` (`folio`),
  CONSTRAINT `cat003_clientes_ibfk_2` FOREIGN KEY (`tipo_servicio`) REFERENCES `cat005_tipo_servicio` (`folio`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cat003_clientes`
--

LOCK TABLES `cat003_clientes` WRITE;
/*!40000 ALTER TABLE `cat003_clientes` DISABLE KEYS */;
/*!40000 ALTER TABLE `cat003_clientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cat005_tipo_servicio`
--

DROP TABLE IF EXISTS `cat005_tipo_servicio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cat005_tipo_servicio` (
  `folio` int NOT NULL AUTO_INCREMENT,
  `tipo` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci NOT NULL,
  PRIMARY KEY (`folio`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cat005_tipo_servicio`
--

LOCK TABLES `cat005_tipo_servicio` WRITE;
/*!40000 ALTER TABLE `cat005_tipo_servicio` DISABLE KEYS */;
INSERT INTO `cat005_tipo_servicio` VALUES (1,'VENTA DE PRODUCTOS'),(2,'REALIZACION DE SERVICIOS'),(3,'PRODUCTOS Y SERVICIOS');
/*!40000 ALTER TABLE `cat005_tipo_servicio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cat006_contactos`
--

DROP TABLE IF EXISTS `cat006_contactos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cat006_contactos` (
  `folio` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci NOT NULL,
  `email` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci NOT NULL,
  `telefono` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci NOT NULL,
  `descripcion` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci NOT NULL,
  `cliente` int NOT NULL,
  PRIMARY KEY (`folio`),
  KEY `cliente` (`cliente`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cat006_contactos`
--

LOCK TABLES `cat006_contactos` WRITE;
/*!40000 ALTER TABLE `cat006_contactos` DISABLE KEYS */;
/*!40000 ALTER TABLE `cat006_contactos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cat007_ubicaciones`
--

DROP TABLE IF EXISTS `cat007_ubicaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cat007_ubicaciones` (
  `folio` int NOT NULL AUTO_INCREMENT,
  `cliente` int NOT NULL,
  `nombre` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci NOT NULL,
  `direccion` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci NOT NULL,
  PRIMARY KEY (`folio`),
  KEY `cliente` (`cliente`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cat007_ubicaciones`
--

LOCK TABLES `cat007_ubicaciones` WRITE;
/*!40000 ALTER TABLE `cat007_ubicaciones` DISABLE KEYS */;
/*!40000 ALTER TABLE `cat007_ubicaciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cat008_areas`
--

DROP TABLE IF EXISTS `cat008_areas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cat008_areas` (
  `folio` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci NOT NULL,
  `documentacion` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci NOT NULL,
  `planta` int NOT NULL,
  PRIMARY KEY (`folio`),
  KEY `planta` (`planta`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cat008_areas`
--

LOCK TABLES `cat008_areas` WRITE;
/*!40000 ALTER TABLE `cat008_areas` DISABLE KEYS */;
/*!40000 ALTER TABLE `cat008_areas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cat009_proyectos`
--

DROP TABLE IF EXISTS `cat009_proyectos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cat009_proyectos` (
  `folio` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci NOT NULL,
  `ubicacion` int NOT NULL,
  `presupuesto` double DEFAULT '0',
  `galeria` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci NOT NULL,
  `documentacion` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci NOT NULL,
  `estatus` int NOT NULL,
  PRIMARY KEY (`folio`),
  KEY `ubicacion` (`ubicacion`),
  KEY `estatus` (`estatus`),
  CONSTRAINT `cat009_proyectos_ibfk_2` FOREIGN KEY (`estatus`) REFERENCES `cat025_estatus_proyecto` (`folio`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cat009_proyectos`
--

LOCK TABLES `cat009_proyectos` WRITE;
/*!40000 ALTER TABLE `cat009_proyectos` DISABLE KEYS */;
/*!40000 ALTER TABLE `cat009_proyectos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cat010_tipo_tareas`
--

DROP TABLE IF EXISTS `cat010_tipo_tareas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cat010_tipo_tareas` (
  `folio` int NOT NULL AUTO_INCREMENT,
  `tipo` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci NOT NULL,
  PRIMARY KEY (`folio`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cat010_tipo_tareas`
--

LOCK TABLES `cat010_tipo_tareas` WRITE;
/*!40000 ALTER TABLE `cat010_tipo_tareas` DISABLE KEYS */;
INSERT INTO `cat010_tipo_tareas` VALUES (1,'Con evidencia'),(2,'Sin evidencia');
/*!40000 ALTER TABLE `cat010_tipo_tareas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cat011_roles_proyecto`
--

DROP TABLE IF EXISTS `cat011_roles_proyecto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cat011_roles_proyecto` (
  `folio` int NOT NULL AUTO_INCREMENT,
  `rol` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci NOT NULL,
  `descripcion` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci NOT NULL,
  PRIMARY KEY (`folio`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cat011_roles_proyecto`
--

LOCK TABLES `cat011_roles_proyecto` WRITE;
/*!40000 ALTER TABLE `cat011_roles_proyecto` DISABLE KEYS */;
INSERT INTO `cat011_roles_proyecto` VALUES (1,'Gerente','Tiene todos los permisos, como asignar y revisar tareas, editar el proyecto y realizar la configuracion de etapas, visualizar contactos, crear cotizaciones, asignar viaticos y mover inventario'),(2,'Supervisor','Puede crear cotizaciones, asignar y crear tareas, y añadir etapas acceder al perfil de proyecto.'),(3,'Tecnico','Puede acceder unicamente a sus tareas asignadas para realizar los reportes y acceder unicamente de manera visual al perfil de proyecto'),(4,'Segurista','Puede acceder a toda la informacion de los empleados involucrados en el proyecto y puede asignar tareas. Acceder de manera visual al perfil del proyecto');
/*!40000 ALTER TABLE `cat011_roles_proyecto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cat012_tipo_cliente`
--

DROP TABLE IF EXISTS `cat012_tipo_cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cat012_tipo_cliente` (
  `folio` int NOT NULL AUTO_INCREMENT,
  `tipo` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci NOT NULL,
  PRIMARY KEY (`folio`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cat012_tipo_cliente`
--

LOCK TABLES `cat012_tipo_cliente` WRITE;
/*!40000 ALTER TABLE `cat012_tipo_cliente` DISABLE KEYS */;
INSERT INTO `cat012_tipo_cliente` VALUES (1,'Fisico'),(2,'Moral');
/*!40000 ALTER TABLE `cat012_tipo_cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cat013_cotizaciones`
--

DROP TABLE IF EXISTS `cat013_cotizaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cat013_cotizaciones` (
  `folio` int NOT NULL AUTO_INCREMENT,
  `proyecto` int NOT NULL,
  `rendimiento` double DEFAULT '0',
  `costo_tecnico` double DEFAULT '0',
  `costo_supervisor` double DEFAULT '0',
  `intereses` double DEFAULT '0',
  `contacto` int DEFAULT '1',
  PRIMARY KEY (`folio`),
  KEY `proyecto` (`proyecto`),
  KEY `contacto` (`contacto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cat013_cotizaciones`
--

LOCK TABLES `cat013_cotizaciones` WRITE;
/*!40000 ALTER TABLE `cat013_cotizaciones` DISABLE KEYS */;
/*!40000 ALTER TABLE `cat013_cotizaciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cat014_proveedores`
--

DROP TABLE IF EXISTS `cat014_proveedores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cat014_proveedores` (
  `folio` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci NOT NULL,
  `web` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci NOT NULL,
  PRIMARY KEY (`folio`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cat014_proveedores`
--

LOCK TABLES `cat014_proveedores` WRITE;
/*!40000 ALTER TABLE `cat014_proveedores` DISABLE KEYS */;
INSERT INTO `cat014_proveedores` VALUES (1,'SYSCOM','https://www.syscom.mx/');
/*!40000 ALTER TABLE `cat014_proveedores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cat015_marcas`
--

DROP TABLE IF EXISTS `cat015_marcas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cat015_marcas` (
  `folio` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci NOT NULL,
  PRIMARY KEY (`folio`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cat015_marcas`
--

LOCK TABLES `cat015_marcas` WRITE;
/*!40000 ALTER TABLE `cat015_marcas` DISABLE KEYS */;
INSERT INTO `cat015_marcas` VALUES (1,'ZKTeco');
/*!40000 ALTER TABLE `cat015_marcas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cat016_productos`
--

DROP TABLE IF EXISTS `cat016_productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cat016_productos` (
  `folio` int NOT NULL AUTO_INCREMENT,
  `sku` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci NOT NULL,
  `descripcion` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci NOT NULL,
  `categoria` int NOT NULL,
  `tipo` int NOT NULL,
  `marca` int NOT NULL,
  `precio` double NOT NULL,
  `enlace` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci NOT NULL,
  PRIMARY KEY (`folio`),
  KEY `categoria` (`categoria`),
  KEY `tipo` (`tipo`),
  KEY `marca` (`marca`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cat016_productos`
--

LOCK TABLES `cat016_productos` WRITE;
/*!40000 ALTER TABLE `cat016_productos` DISABLE KEYS */;
INSERT INTO `cat016_productos` VALUES (1,'SPEEDFACEV5LP','Biométrico Facial y de Palma SIN CONTACTO con pantalla Touch de 5 / 6000 rostros / Lector de Huella Digital / Video Portero / Lector de Códigos QR / Lector de proximidad',2,3,1,7121.45,'https://www.syscom.mx/producto/SPEEDFACEV5LP-ZKTECO-188422.html');
/*!40000 ALTER TABLE `cat016_productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cat017_categoria_producto`
--

DROP TABLE IF EXISTS `cat017_categoria_producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cat017_categoria_producto` (
  `folio` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(99) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci NOT NULL,
  PRIMARY KEY (`folio`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cat017_categoria_producto`
--

LOCK TABLES `cat017_categoria_producto` WRITE;
/*!40000 ALTER TABLE `cat017_categoria_producto` DISABLE KEYS */;
INSERT INTO `cat017_categoria_producto` VALUES (1,'Cableado Estructurado'),(2,'Videovigilancia'),(3,'Computo');
/*!40000 ALTER TABLE `cat017_categoria_producto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cat018_tipo_producto`
--

DROP TABLE IF EXISTS `cat018_tipo_producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cat018_tipo_producto` (
  `folio` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci NOT NULL,
  PRIMARY KEY (`folio`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cat018_tipo_producto`
--

LOCK TABLES `cat018_tipo_producto` WRITE;
/*!40000 ALTER TABLE `cat018_tipo_producto` DISABLE KEYS */;
INSERT INTO `cat018_tipo_producto` VALUES (1,'Herramienta'),(2,'Material'),(3,'Equipo'),(4,'Papeleria');
/*!40000 ALTER TABLE `cat018_tipo_producto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cat019_servicios`
--

DROP TABLE IF EXISTS `cat019_servicios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cat019_servicios` (
  `folio` int NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci NOT NULL,
  `categoria` int NOT NULL,
  `precio` double NOT NULL,
  PRIMARY KEY (`folio`),
  KEY `categoria` (`categoria`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cat019_servicios`
--

LOCK TABLES `cat019_servicios` WRITE;
/*!40000 ALTER TABLE `cat019_servicios` DISABLE KEYS */;
/*!40000 ALTER TABLE `cat019_servicios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cat020_inventario`
--

DROP TABLE IF EXISTS `cat020_inventario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cat020_inventario` (
  `folio` int NOT NULL AUTO_INCREMENT,
  `producto` int NOT NULL,
  `cantidad` double NOT NULL,
  `unidades` int NOT NULL,
  PRIMARY KEY (`folio`),
  KEY `producto` (`producto`),
  KEY `unidades` (`unidades`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cat020_inventario`
--

LOCK TABLES `cat020_inventario` WRITE;
/*!40000 ALTER TABLE `cat020_inventario` DISABLE KEYS */;
/*!40000 ALTER TABLE `cat020_inventario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cat021_claves_seguimiento`
--

DROP TABLE IF EXISTS `cat021_claves_seguimiento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cat021_claves_seguimiento` (
  `folio` int NOT NULL AUTO_INCREMENT,
  `proyecto` int NOT NULL,
  `clave` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci NOT NULL,
  `monto` double NOT NULL,
  `fecha` date NOT NULL,
  `usuario` int NOT NULL,
  `uso` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci NOT NULL,
  PRIMARY KEY (`folio`),
  KEY `usuario` (`usuario`),
  KEY `proyecto` (`proyecto`),
  CONSTRAINT `cat021_claves_seguimiento_ibfk_1` FOREIGN KEY (`proyecto`) REFERENCES `cat009_proyectos` (`folio`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cat021_claves_seguimiento`
--

LOCK TABLES `cat021_claves_seguimiento` WRITE;
/*!40000 ALTER TABLE `cat021_claves_seguimiento` DISABLE KEYS */;
/*!40000 ALTER TABLE `cat021_claves_seguimiento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cat022_operaciones`
--

DROP TABLE IF EXISTS `cat022_operaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cat022_operaciones` (
  `folio` int NOT NULL AUTO_INCREMENT,
  `tipo_operacion` int NOT NULL,
  `id_bene` int DEFAULT '0',
  `beneficiario` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci NOT NULL,
  `emisor` int NOT NULL,
  `enlace` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci NOT NULL,
  `concepto` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci NOT NULL,
  `clave` int NOT NULL,
  `fecha` date NOT NULL,
  `monto` double NOT NULL,
  PRIMARY KEY (`folio`),
  KEY `id_bene` (`id_bene`),
  KEY `emisor` (`emisor`),
  KEY `clave` (`clave`),
  KEY `tipo_operacion` (`tipo_operacion`),
  CONSTRAINT `cat001_usuarios_ibfk_4` FOREIGN KEY (`tipo_operacion`) REFERENCES `cat024_tipo_operacion` (`folio`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cat022_operaciones`
--

LOCK TABLES `cat022_operaciones` WRITE;
/*!40000 ALTER TABLE `cat022_operaciones` DISABLE KEYS */;
/*!40000 ALTER TABLE `cat022_operaciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cat023_unidades`
--

DROP TABLE IF EXISTS `cat023_unidades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cat023_unidades` (
  `folio` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci NOT NULL,
  `abreviatura` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci NOT NULL,
  `codigo_sat` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci NOT NULL,
  PRIMARY KEY (`folio`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cat023_unidades`
--

LOCK TABLES `cat023_unidades` WRITE;
/*!40000 ALTER TABLE `cat023_unidades` DISABLE KEYS */;
INSERT INTO `cat023_unidades` VALUES (1,'Pieza','pza.','H87');
/*!40000 ALTER TABLE `cat023_unidades` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cat024_tipo_operacion`
--

DROP TABLE IF EXISTS `cat024_tipo_operacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cat024_tipo_operacion` (
  `folio` int NOT NULL AUTO_INCREMENT,
  `tipo` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci NOT NULL,
  PRIMARY KEY (`folio`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cat024_tipo_operacion`
--

LOCK TABLES `cat024_tipo_operacion` WRITE;
/*!40000 ALTER TABLE `cat024_tipo_operacion` DISABLE KEYS */;
INSERT INTO `cat024_tipo_operacion` VALUES (1,'VIATICOS'),(2,'COMPROBACION');
/*!40000 ALTER TABLE `cat024_tipo_operacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cat025_estatus_proyecto`
--

DROP TABLE IF EXISTS `cat025_estatus_proyecto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cat025_estatus_proyecto` (
  `folio` int NOT NULL AUTO_INCREMENT,
  `estatus` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci NOT NULL,
  PRIMARY KEY (`folio`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cat025_estatus_proyecto`
--

LOCK TABLES `cat025_estatus_proyecto` WRITE;
/*!40000 ALTER TABLE `cat025_estatus_proyecto` DISABLE KEYS */;
INSERT INTO `cat025_estatus_proyecto` VALUES (1,'Planeacion'),(2,'En Curso'),(3,'En Pausa'),(4,'Cancelado'),(5,'Pendiente'),(6,'Terminado');
/*!40000 ALTER TABLE `cat025_estatus_proyecto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cat026_estatus_tarea`
--

DROP TABLE IF EXISTS `cat026_estatus_tarea`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cat026_estatus_tarea` (
  `folio` int NOT NULL AUTO_INCREMENT,
  `estatus` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci NOT NULL,
  PRIMARY KEY (`folio`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cat026_estatus_tarea`
--

LOCK TABLES `cat026_estatus_tarea` WRITE;
/*!40000 ALTER TABLE `cat026_estatus_tarea` DISABLE KEYS */;
INSERT INTO `cat026_estatus_tarea` VALUES (1,'Asignada'),(2,'Entregada'),(3,'Pendiente'),(4,'Atrasada'),(5,'Incompleta'),(6,'Rechazada'),(7,'Creada');
/*!40000 ALTER TABLE `cat026_estatus_tarea` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `claves_view001`
--

DROP TABLE IF EXISTS `claves_view001`;
/*!50001 DROP VIEW IF EXISTS `claves_view001`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `claves_view001` AS SELECT 
 1 AS `folio`,
 1 AS `folio_proyecto`,
 1 AS `proyecto`,
 1 AS `clave`,
 1 AS `monto`,
 1 AS `fecha`,
 1 AS `folio_usuario`,
 1 AS `nombre_usuario`,
 1 AS `apellido_usuario`,
 1 AS `uso`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `clientes_view001`
--

DROP TABLE IF EXISTS `clientes_view001`;
/*!50001 DROP VIEW IF EXISTS `clientes_view001`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `clientes_view001` AS SELECT 
 1 AS `folio`,
 1 AS `nombre`,
 1 AS `folio_tipo`,
 1 AS `tipo`,
 1 AS `folio_servicio`,
 1 AS `servicio`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `contactos_ubicacion_view001`
--

DROP TABLE IF EXISTS `contactos_ubicacion_view001`;
/*!50001 DROP VIEW IF EXISTS `contactos_ubicacion_view001`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `contactos_ubicacion_view001` AS SELECT 
 1 AS `folio`,
 1 AS `folio_ubicacion`,
 1 AS `ubicacion`,
 1 AS `folio_contacto`,
 1 AS `contacto`,
 1 AS `email`,
 1 AS `telefono`,
 1 AS `descripcion`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `contactos_view001`
--

DROP TABLE IF EXISTS `contactos_view001`;
/*!50001 DROP VIEW IF EXISTS `contactos_view001`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `contactos_view001` AS SELECT 
 1 AS `folio`,
 1 AS `nombre`,
 1 AS `email`,
 1 AS `telefono`,
 1 AS `descripcion`,
 1 AS `folio_cliente`,
 1 AS `cliente`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `cotizacion_pdf_view001`
--

DROP TABLE IF EXISTS `cotizacion_pdf_view001`;
/*!50001 DROP VIEW IF EXISTS `cotizacion_pdf_view001`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `cotizacion_pdf_view001` AS SELECT 
 1 AS `folio`,
 1 AS `emite`,
 1 AS `cotizacion`,
 1 AS `rendimiento`,
 1 AS `intereses`,
 1 AS `numero`,
 1 AS `fecha`,
 1 AS `destinatario`,
 1 AS `total`,
 1 AS `solicita`,
 1 AS `notas`,
 1 AS `puesto_destinatario`,
 1 AS `cliente`,
 1 AS `moneda`,
 1 AS `ubicacion`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `cotizaciones_view001`
--

DROP TABLE IF EXISTS `cotizaciones_view001`;
/*!50001 DROP VIEW IF EXISTS `cotizaciones_view001`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `cotizaciones_view001` AS SELECT 
 1 AS `folio`,
 1 AS `folio_proyecto`,
 1 AS `proyecto`,
 1 AS `folio_cliente`,
 1 AS `cliente`,
 1 AS `folio_ubicacion`,
 1 AS `ubicacion`,
 1 AS `rendimiento`,
 1 AS `costo_tecnico`,
 1 AS `costo_supervisor`,
 1 AS `intereses`,
 1 AS `folio_contacto`,
 1 AS `contacto`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `etapas_view001`
--

DROP TABLE IF EXISTS `etapas_view001`;
/*!50001 DROP VIEW IF EXISTS `etapas_view001`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `etapas_view001` AS SELECT 
 1 AS `folio`,
 1 AS `nombre`,
 1 AS `folio_area`,
 1 AS `area`,
 1 AS `documentacion_area`,
 1 AS `folio_proyecto`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `inventario_view001`
--

DROP TABLE IF EXISTS `inventario_view001`;
/*!50001 DROP VIEW IF EXISTS `inventario_view001`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `inventario_view001` AS SELECT 
 1 AS `folio`,
 1 AS `folio_producto`,
 1 AS `producto`,
 1 AS `sku`,
 1 AS `folio_categoria`,
 1 AS `categoria`,
 1 AS `folio_tipo`,
 1 AS `tipo`,
 1 AS `folio_marca`,
 1 AS `marca`,
 1 AS `cantidad`,
 1 AS `folio_unidad`,
 1 AS `unidad`,
 1 AS `abreviatura`,
 1 AS `codigo_sat`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `marca_proveedor_view001`
--

DROP TABLE IF EXISTS `marca_proveedor_view001`;
/*!50001 DROP VIEW IF EXISTS `marca_proveedor_view001`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `marca_proveedor_view001` AS SELECT 
 1 AS `folio`,
 1 AS `folio_proveedor`,
 1 AS `proveedor`,
 1 AS `web_proveedor`,
 1 AS `folio_marca`,
 1 AS `marca`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `material_proyecto_view001`
--

DROP TABLE IF EXISTS `material_proyecto_view001`;
/*!50001 DROP VIEW IF EXISTS `material_proyecto_view001`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `material_proyecto_view001` AS SELECT 
 1 AS `folio`,
 1 AS `folio_proyecto`,
 1 AS `nombre_proyecto`,
 1 AS `folio_ubicacion`,
 1 AS `ubicacion`,
 1 AS `folio_producto`,
 1 AS `sku`,
 1 AS `descripcion`,
 1 AS `folio_categoria`,
 1 AS `categoria`,
 1 AS `folio_tipo`,
 1 AS `tipo`,
 1 AS `folio_marca`,
 1 AS `marca`,
 1 AS `cantidad`,
 1 AS `folio_unidades`,
 1 AS `unidades`,
 1 AS `abreviatura`,
 1 AS `sat`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `material_usuario_view001`
--

DROP TABLE IF EXISTS `material_usuario_view001`;
/*!50001 DROP VIEW IF EXISTS `material_usuario_view001`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `material_usuario_view001` AS SELECT 
 1 AS `folio`,
 1 AS `folio_usuario`,
 1 AS `nombre_usuario`,
 1 AS `apellido_usuario`,
 1 AS `folio_producto`,
 1 AS `sku`,
 1 AS `descripcion`,
 1 AS `folio_categoria`,
 1 AS `categoria`,
 1 AS `folio_tipo`,
 1 AS `tipo`,
 1 AS `folio_marca`,
 1 AS `marca`,
 1 AS `cantidad`,
 1 AS `folio_unidades`,
 1 AS `unidades`,
 1 AS `abreviatura`,
 1 AS `sat`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `movimientos_invent_view001`
--

DROP TABLE IF EXISTS `movimientos_invent_view001`;
/*!50001 DROP VIEW IF EXISTS `movimientos_invent_view001`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `movimientos_invent_view001` AS SELECT 
 1 AS `folio`,
 1 AS `folio_usuario`,
 1 AS `nombre_usuario`,
 1 AS `apellido_usuario`,
 1 AS `folio_producto`,
 1 AS `sku`,
 1 AS `descripcion`,
 1 AS `cantidad`,
 1 AS `fecha`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `op002_etapas`
--

DROP TABLE IF EXISTS `op002_etapas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `op002_etapas` (
  `folio` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci NOT NULL,
  `area` int NOT NULL,
  `proyecto` int NOT NULL,
  PRIMARY KEY (`folio`),
  KEY `area` (`area`),
  KEY `proyecto` (`proyecto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `op002_etapas`
--

LOCK TABLES `op002_etapas` WRITE;
/*!40000 ALTER TABLE `op002_etapas` DISABLE KEYS */;
/*!40000 ALTER TABLE `op002_etapas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `op003_tareas`
--

DROP TABLE IF EXISTS `op003_tareas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `op003_tareas` (
  `folio` int NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci NOT NULL,
  `etapa` int NOT NULL,
  `fecha_entrega` date NOT NULL,
  `estatus` int NOT NULL,
  `tipo` int NOT NULL,
  PRIMARY KEY (`folio`),
  KEY `etapa` (`etapa`),
  KEY `tipo` (`tipo`),
  KEY `estatus` (`estatus`),
  CONSTRAINT `op003_tareas_ibfk_3` FOREIGN KEY (`estatus`) REFERENCES `cat026_estatus_tarea` (`folio`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `op003_tareas`
--

LOCK TABLES `op003_tareas` WRITE;
/*!40000 ALTER TABLE `op003_tareas` DISABLE KEYS */;
/*!40000 ALTER TABLE `op003_tareas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `op004_reporte`
--

DROP TABLE IF EXISTS `op004_reporte`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `op004_reporte` (
  `folio` int NOT NULL AUTO_INCREMENT,
  `enlace` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci NOT NULL,
  `tarea` int NOT NULL,
  `usuario` int NOT NULL,
  `fecha` date NOT NULL,
  `hora` time NOT NULL,
  PRIMARY KEY (`folio`),
  KEY `tarea` (`tarea`),
  KEY `usuario` (`usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `op004_reporte`
--

LOCK TABLES `op004_reporte` WRITE;
/*!40000 ALTER TABLE `op004_reporte` DISABLE KEYS */;
/*!40000 ALTER TABLE `op004_reporte` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `op005_roles`
--

DROP TABLE IF EXISTS `op005_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `op005_roles` (
  `folio` int NOT NULL AUTO_INCREMENT,
  `proyecto` int NOT NULL,
  `usuario` int NOT NULL,
  `rol` int NOT NULL,
  PRIMARY KEY (`folio`),
  KEY `usuario` (`usuario`),
  KEY `proyecto` (`proyecto`),
  KEY `rol` (`rol`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `op005_roles`
--

LOCK TABLES `op005_roles` WRITE;
/*!40000 ALTER TABLE `op005_roles` DISABLE KEYS */;
/*!40000 ALTER TABLE `op005_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `op006_asistencia`
--

DROP TABLE IF EXISTS `op006_asistencia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `op006_asistencia` (
  `folio` int NOT NULL AUTO_INCREMENT,
  `usuario` int NOT NULL,
  `proyecto` int NOT NULL,
  `fecha` date NOT NULL,
  `hora` time NOT NULL,
  PRIMARY KEY (`folio`),
  KEY `usuario` (`usuario`),
  KEY `proyecto` (`proyecto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `op006_asistencia`
--

LOCK TABLES `op006_asistencia` WRITE;
/*!40000 ALTER TABLE `op006_asistencia` DISABLE KEYS */;
/*!40000 ALTER TABLE `op006_asistencia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `op007_marca_proveedor`
--

DROP TABLE IF EXISTS `op007_marca_proveedor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `op007_marca_proveedor` (
  `folio` int NOT NULL AUTO_INCREMENT,
  `proveedor` int NOT NULL,
  `marca` int NOT NULL,
  PRIMARY KEY (`folio`),
  KEY `proveedor` (`proveedor`),
  KEY `marca` (`marca`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `op007_marca_proveedor`
--

LOCK TABLES `op007_marca_proveedor` WRITE;
/*!40000 ALTER TABLE `op007_marca_proveedor` DISABLE KEYS */;
INSERT INTO `op007_marca_proveedor` VALUES (1,1,1);
/*!40000 ALTER TABLE `op007_marca_proveedor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `op008_lista_productos`
--

DROP TABLE IF EXISTS `op008_lista_productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `op008_lista_productos` (
  `folio` int NOT NULL AUTO_INCREMENT,
  `producto` int NOT NULL,
  `cotizacion` int NOT NULL,
  `costo` double NOT NULL,
  `cantidad` int NOT NULL,
  `tecnicos` int NOT NULL,
  `supervisores` int NOT NULL,
  `dias` int NOT NULL,
  PRIMARY KEY (`folio`),
  KEY `producto` (`producto`),
  KEY `cotizacion` (`cotizacion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `op008_lista_productos`
--

LOCK TABLES `op008_lista_productos` WRITE;
/*!40000 ALTER TABLE `op008_lista_productos` DISABLE KEYS */;
/*!40000 ALTER TABLE `op008_lista_productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `op009_lista_servicios`
--

DROP TABLE IF EXISTS `op009_lista_servicios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `op009_lista_servicios` (
  `folio` int NOT NULL AUTO_INCREMENT,
  `servicio` int NOT NULL,
  `cotizacion` int NOT NULL,
  `costo` double DEFAULT '0',
  `tecnicos` int DEFAULT '0',
  `supervisores` int DEFAULT '0',
  `dias` int DEFAULT '0',
  PRIMARY KEY (`folio`),
  KEY `servicio` (`servicio`),
  KEY `cotizacion` (`cotizacion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `op009_lista_servicios`
--

LOCK TABLES `op009_lista_servicios` WRITE;
/*!40000 ALTER TABLE `op009_lista_servicios` DISABLE KEYS */;
/*!40000 ALTER TABLE `op009_lista_servicios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `op010_compras`
--

DROP TABLE IF EXISTS `op010_compras`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `op010_compras` (
  `folio` int NOT NULL,
  `producto` int NOT NULL,
  `cantidad` double NOT NULL,
  `unidades` int NOT NULL,
  PRIMARY KEY (`folio`),
  KEY `producto` (`producto`),
  KEY `unidades` (`unidades`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `op010_compras`
--

LOCK TABLES `op010_compras` WRITE;
/*!40000 ALTER TABLE `op010_compras` DISABLE KEYS */;
/*!40000 ALTER TABLE `op010_compras` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `op011_material_proyecto`
--

DROP TABLE IF EXISTS `op011_material_proyecto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `op011_material_proyecto` (
  `folio` int NOT NULL AUTO_INCREMENT,
  `producto` int NOT NULL,
  `proyecto` int NOT NULL,
  `cantidad` double NOT NULL,
  `unidades` int NOT NULL,
  PRIMARY KEY (`folio`),
  KEY `producto` (`producto`),
  KEY `proyecto` (`proyecto`),
  KEY `unidades` (`unidades`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `op011_material_proyecto`
--

LOCK TABLES `op011_material_proyecto` WRITE;
/*!40000 ALTER TABLE `op011_material_proyecto` DISABLE KEYS */;
/*!40000 ALTER TABLE `op011_material_proyecto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `op012_presupuesto_proyecto`
--

DROP TABLE IF EXISTS `op012_presupuesto_proyecto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `op012_presupuesto_proyecto` (
  `folio` int NOT NULL AUTO_INCREMENT,
  `proyecto` int NOT NULL,
  `monto` double NOT NULL,
  PRIMARY KEY (`folio`),
  KEY `proyecto` (`proyecto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `op012_presupuesto_proyecto`
--

LOCK TABLES `op012_presupuesto_proyecto` WRITE;
/*!40000 ALTER TABLE `op012_presupuesto_proyecto` DISABLE KEYS */;
/*!40000 ALTER TABLE `op012_presupuesto_proyecto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `op013_material_usuario`
--

DROP TABLE IF EXISTS `op013_material_usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `op013_material_usuario` (
  `folio` int NOT NULL AUTO_INCREMENT,
  `usuario` int NOT NULL,
  `producto` int NOT NULL,
  `cantidad` double NOT NULL,
  `unidades` int NOT NULL,
  PRIMARY KEY (`folio`),
  KEY `producto` (`producto`),
  KEY `usuario` (`usuario`),
  KEY `unidades` (`unidades`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `op013_material_usuario`
--

LOCK TABLES `op013_material_usuario` WRITE;
/*!40000 ALTER TABLE `op013_material_usuario` DISABLE KEYS */;
INSERT INTO `op013_material_usuario` VALUES (1,1,1,1,1);
/*!40000 ALTER TABLE `op013_material_usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `op014_tarea_usuario`
--

DROP TABLE IF EXISTS `op014_tarea_usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `op014_tarea_usuario` (
  `folio` int NOT NULL AUTO_INCREMENT,
  `usuario` int NOT NULL,
  `tarea` int NOT NULL,
  PRIMARY KEY (`folio`),
  KEY `usuario` (`usuario`),
  KEY `tarea` (`tarea`),
  CONSTRAINT `op014_tarea_usuario_ibfk_1` FOREIGN KEY (`usuario`) REFERENCES `cat001_usuarios` (`folio`),
  CONSTRAINT `op014_tarea_usuario_ibfk_2` FOREIGN KEY (`tarea`) REFERENCES `op003_tareas` (`folio`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `op014_tarea_usuario`
--

LOCK TABLES `op014_tarea_usuario` WRITE;
/*!40000 ALTER TABLE `op014_tarea_usuario` DISABLE KEYS */;
/*!40000 ALTER TABLE `op014_tarea_usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `op015_contacto_ubicacion`
--

DROP TABLE IF EXISTS `op015_contacto_ubicacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `op015_contacto_ubicacion` (
  `folio` int NOT NULL AUTO_INCREMENT,
  `ubicacion` int NOT NULL,
  `contacto` int NOT NULL,
  PRIMARY KEY (`folio`),
  KEY `ubicacion` (`ubicacion`),
  KEY `contacto` (`contacto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `op015_contacto_ubicacion`
--

LOCK TABLES `op015_contacto_ubicacion` WRITE;
/*!40000 ALTER TABLE `op015_contacto_ubicacion` DISABLE KEYS */;
/*!40000 ALTER TABLE `op015_contacto_ubicacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `op016_movimientos_inventario`
--

DROP TABLE IF EXISTS `op016_movimientos_inventario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `op016_movimientos_inventario` (
  `folio` int NOT NULL AUTO_INCREMENT,
  `usuario` int NOT NULL,
  `producto` int NOT NULL,
  `cantidad` int NOT NULL,
  `fecha` datetime NOT NULL,
  PRIMARY KEY (`folio`),
  KEY `producto` (`producto`),
  KEY `usuario` (`usuario`),
  CONSTRAINT `op016_movimientos_inventario_ibfk_1` FOREIGN KEY (`usuario`) REFERENCES `cat001_usuarios` (`folio`),
  CONSTRAINT `op016_movimientos_inventario_ibfk_2` FOREIGN KEY (`producto`) REFERENCES `cat016_productos` (`folio`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `op016_movimientos_inventario`
--

LOCK TABLES `op016_movimientos_inventario` WRITE;
/*!40000 ALTER TABLE `op016_movimientos_inventario` DISABLE KEYS */;
INSERT INTO `op016_movimientos_inventario` VALUES (1,1,1,15,'2023-01-04 17:13:43'),(2,1,1,-1,'2023-01-04 17:17:50'),(3,1,1,-1,'2023-01-04 17:52:19'),(4,1,1,2,'2023-01-04 17:52:48'),(5,1,1,-15,'2023-01-04 17:56:38'),(6,1,1,45,'2023-01-04 17:56:59'),(7,1,1,-45,'2023-01-04 17:58:45');
/*!40000 ALTER TABLE `op016_movimientos_inventario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `op017_cotizacion_pdf`
--

DROP TABLE IF EXISTS `op017_cotizacion_pdf`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `op017_cotizacion_pdf` (
  `folio` int NOT NULL AUTO_INCREMENT,
  `cotizacion` int NOT NULL,
  `numero` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci DEFAULT 'NUMERO',
  `fecha` date DEFAULT NULL,
  `destinatario` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci DEFAULT '[DESTINATARIO]',
  `total` double DEFAULT NULL,
  `solicita` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci DEFAULT '[SOLICITA]',
  `notas` text CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci,
  `emite` int DEFAULT '1',
  `puesto_destinatario` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci DEFAULT '[PUESTO DE DESTINATARIO]',
  `cliente` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci DEFAULT '[CLIENTE]',
  `moneda` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci DEFAULT '[MONEDA]',
  `ubicacion` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci DEFAULT '[UBICACION]',
  PRIMARY KEY (`folio`),
  KEY `cotizacion` (`cotizacion`),
  CONSTRAINT `op017_cotizacion_pdf_ibfk_1` FOREIGN KEY (`cotizacion`) REFERENCES `cat013_cotizaciones` (`folio`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `op017_cotizacion_pdf`
--

LOCK TABLES `op017_cotizacion_pdf` WRITE;
/*!40000 ALTER TABLE `op017_cotizacion_pdf` DISABLE KEYS */;
/*!40000 ALTER TABLE `op017_cotizacion_pdf` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `operaciones_viaticos001`
--

DROP TABLE IF EXISTS `operaciones_viaticos001`;
/*!50001 DROP VIEW IF EXISTS `operaciones_viaticos001`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `operaciones_viaticos001` AS SELECT 
 1 AS `folio`,
 1 AS `folio_beneficiario`,
 1 AS `beneficiario`,
 1 AS `folio_emisor`,
 1 AS `emisor`,
 1 AS `enlace`,
 1 AS `concepto`,
 1 AS `folio_clave`,
 1 AS `clave`,
 1 AS `fecha`,
 1 AS `monto`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `productos_cotizacion_view001`
--

DROP TABLE IF EXISTS `productos_cotizacion_view001`;
/*!50001 DROP VIEW IF EXISTS `productos_cotizacion_view001`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `productos_cotizacion_view001` AS SELECT 
 1 AS `folio`,
 1 AS `folio_producto`,
 1 AS `producto`,
 1 AS `sku`,
 1 AS `cotizacion`,
 1 AS `costo_unitario`,
 1 AS `cantidad`,
 1 AS `costo_base`,
 1 AS `tecnicos`,
 1 AS `supervisores`,
 1 AS `dias`,
 1 AS `subtotal_tecnicos`,
 1 AS `subtotal_supervisores`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `productos_proveedor_view001`
--

DROP TABLE IF EXISTS `productos_proveedor_view001`;
/*!50001 DROP VIEW IF EXISTS `productos_proveedor_view001`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `productos_proveedor_view001` AS SELECT 
 1 AS `folio`,
 1 AS `sku`,
 1 AS `descripcion`,
 1 AS `folio_categoria`,
 1 AS `categoria`,
 1 AS `folio_tipo`,
 1 AS `tipo`,
 1 AS `precio`,
 1 AS `enlace`,
 1 AS `folio_marca`,
 1 AS `marca`,
 1 AS `folio_proveedor`,
 1 AS `proveedor`,
 1 AS `web_proveedor`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `productos_view001`
--

DROP TABLE IF EXISTS `productos_view001`;
/*!50001 DROP VIEW IF EXISTS `productos_view001`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `productos_view001` AS SELECT 
 1 AS `folio`,
 1 AS `sku`,
 1 AS `descripcion`,
 1 AS `folio_categoria`,
 1 AS `folio_tipo`,
 1 AS `folio_marca`,
 1 AS `precio`,
 1 AS `enlace`,
 1 AS `marca`,
 1 AS `tipo`,
 1 AS `categoria`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `proyectos_asistencia_view001`
--

DROP TABLE IF EXISTS `proyectos_asistencia_view001`;
/*!50001 DROP VIEW IF EXISTS `proyectos_asistencia_view001`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `proyectos_asistencia_view001` AS SELECT 
 1 AS `folio`,
 1 AS `folio_proyecto`,
 1 AS `proyecto`,
 1 AS `folio_estatus`,
 1 AS `estatus`,
 1 AS `folio_usuario`,
 1 AS `nombres`,
 1 AS `apellidos`,
 1 AS `folio_rol`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `proyectos_view001`
--

DROP TABLE IF EXISTS `proyectos_view001`;
/*!50001 DROP VIEW IF EXISTS `proyectos_view001`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `proyectos_view001` AS SELECT 
 1 AS `folio`,
 1 AS `nombre`,
 1 AS `folio_ubicacion`,
 1 AS `folio_cliente`,
 1 AS `cliente`,
 1 AS `ubicacion`,
 1 AS `presupuesto`,
 1 AS `folio_estatus`,
 1 AS `estatus`,
 1 AS `galeria`,
 1 AS `documentacion`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `reporte_asistencia_view001`
--

DROP TABLE IF EXISTS `reporte_asistencia_view001`;
/*!50001 DROP VIEW IF EXISTS `reporte_asistencia_view001`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `reporte_asistencia_view001` AS SELECT 
 1 AS `folio`,
 1 AS `folio_usuario`,
 1 AS `nombre_usuario`,
 1 AS `apellido_usuario`,
 1 AS `folio_proyecto`,
 1 AS `proyecto`,
 1 AS `folio_ubicacion`,
 1 AS `ubicacion`,
 1 AS `folio_cliente`,
 1 AS `cliente`,
 1 AS `fecha`,
 1 AS `hora`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `roles_proyecto_view001`
--

DROP TABLE IF EXISTS `roles_proyecto_view001`;
/*!50001 DROP VIEW IF EXISTS `roles_proyecto_view001`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `roles_proyecto_view001` AS SELECT 
 1 AS `folio`,
 1 AS `folio_proyecto`,
 1 AS `proyecto`,
 1 AS `folio_ubicacion`,
 1 AS `ubicacion`,
 1 AS `folio_cliente`,
 1 AS `cliente`,
 1 AS `galeria`,
 1 AS `documentacion`,
 1 AS `folio_estatus`,
 1 AS `estatus`,
 1 AS `folio_usuario`,
 1 AS `usuario`,
 1 AS `folio_rol`,
 1 AS `rol`,
 1 AS `descripcion`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `roles_view001`
--

DROP TABLE IF EXISTS `roles_view001`;
/*!50001 DROP VIEW IF EXISTS `roles_view001`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `roles_view001` AS SELECT 
 1 AS `folio`,
 1 AS `proyecto`,
 1 AS `folio_usuario`,
 1 AS `nombres`,
 1 AS `apellidos`,
 1 AS `telefono`,
 1 AS `email`,
 1 AS `documentacion`,
 1 AS `folio_rol`,
 1 AS `rol`,
 1 AS `descripcion`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `servicios_cotizacion_view001`
--

DROP TABLE IF EXISTS `servicios_cotizacion_view001`;
/*!50001 DROP VIEW IF EXISTS `servicios_cotizacion_view001`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `servicios_cotizacion_view001` AS SELECT 
 1 AS `folio`,
 1 AS `folio_servicio`,
 1 AS `servicio`,
 1 AS `cotizacion`,
 1 AS `costo_servicio`,
 1 AS `tecnicos`,
 1 AS `supervisores`,
 1 AS `dias`,
 1 AS `subtotal_tecnicos`,
 1 AS `subtotal_supervisores`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `servicios_view001`
--

DROP TABLE IF EXISTS `servicios_view001`;
/*!50001 DROP VIEW IF EXISTS `servicios_view001`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `servicios_view001` AS SELECT 
 1 AS `folio`,
 1 AS `descripcion`,
 1 AS `folio_categoria`,
 1 AS `precio`,
 1 AS `categoria`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `tarea_asignada_view001`
--

DROP TABLE IF EXISTS `tarea_asignada_view001`;
/*!50001 DROP VIEW IF EXISTS `tarea_asignada_view001`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `tarea_asignada_view001` AS SELECT 
 1 AS `folio`,
 1 AS `folio_usuario`,
 1 AS `nombres`,
 1 AS `apellidos`,
 1 AS `folio_tarea`,
 1 AS `descripcion`,
 1 AS `etapa`,
 1 AS `folio_rol_usuario`,
 1 AS `rol_usuario`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `tareas_view001`
--

DROP TABLE IF EXISTS `tareas_view001`;
/*!50001 DROP VIEW IF EXISTS `tareas_view001`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `tareas_view001` AS SELECT 
 1 AS `folio`,
 1 AS `descripcion`,
 1 AS `folio_etapa`,
 1 AS `etapa`,
 1 AS `fecha`,
 1 AS `folio_estatus`,
 1 AS `estatus`,
 1 AS `folio_tipo`,
 1 AS `tipo`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `tareas_view002`
--

DROP TABLE IF EXISTS `tareas_view002`;
/*!50001 DROP VIEW IF EXISTS `tareas_view002`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `tareas_view002` AS SELECT 
 1 AS `folio`,
 1 AS `descripcion`,
 1 AS `folio_etapa`,
 1 AS `etapa`,
 1 AS `folio_area_etapa`,
 1 AS `area`,
 1 AS `folio_proyecto`,
 1 AS `proyecto`,
 1 AS `folio_ubicacion`,
 1 AS `ubicacion`,
 1 AS `folio_cliente`,
 1 AS `cliente`,
 1 AS `fecha`,
 1 AS `folio_estatus`,
 1 AS `estatus`,
 1 AS `folio_tipo`,
 1 AS `tipo`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `ubicaciones_view001`
--

DROP TABLE IF EXISTS `ubicaciones_view001`;
/*!50001 DROP VIEW IF EXISTS `ubicaciones_view001`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `ubicaciones_view001` AS SELECT 
 1 AS `folio`,
 1 AS `folio_cliente`,
 1 AS `nombre`,
 1 AS `direccion`,
 1 AS `cliente`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `validar_tarea_view001`
--

DROP TABLE IF EXISTS `validar_tarea_view001`;
/*!50001 DROP VIEW IF EXISTS `validar_tarea_view001`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `validar_tarea_view001` AS SELECT 
 1 AS `folio`,
 1 AS `usuario`,
 1 AS `tarea`,
 1 AS `etapa`,
 1 AS `proyecto`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `viaticos_comprobaciones_view001`
--

DROP TABLE IF EXISTS `viaticos_comprobaciones_view001`;
/*!50001 DROP VIEW IF EXISTS `viaticos_comprobaciones_view001`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `viaticos_comprobaciones_view001` AS SELECT 
 1 AS `folio`,
 1 AS `tipo_operacion`,
 1 AS `tipo`,
 1 AS `id_bene`,
 1 AS `beneficiario`,
 1 AS `folio_emisor`,
 1 AS `nombre_emisor`,
 1 AS `apellido_emisor`,
 1 AS `enlace`,
 1 AS `concepto`,
 1 AS `folio_clave`,
 1 AS `clave`,
 1 AS `proyecto`,
 1 AS `nombre_proyecto`,
 1 AS `uso`,
 1 AS `fecha`,
 1 AS `monto`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `viaticos_depositos_view001`
--

DROP TABLE IF EXISTS `viaticos_depositos_view001`;
/*!50001 DROP VIEW IF EXISTS `viaticos_depositos_view001`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `viaticos_depositos_view001` AS SELECT 
 1 AS `folio`,
 1 AS `tipo_operacion`,
 1 AS `tipo`,
 1 AS `id_bene`,
 1 AS `beneficiario`,
 1 AS `folio_emisor`,
 1 AS `nombre_emisor`,
 1 AS `apellido_emisor`,
 1 AS `enlace`,
 1 AS `concepto`,
 1 AS `folio_clave`,
 1 AS `clave`,
 1 AS `proyecto`,
 1 AS `nombre_proyecto`,
 1 AS `uso`,
 1 AS `fecha`,
 1 AS `monto`*/;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `areas_view001`
--

/*!50001 DROP VIEW IF EXISTS `areas_view001`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `areas_view001` AS select `cat008_areas`.`folio` AS `folio`,`cat008_areas`.`nombre` AS `nombre`,`cat008_areas`.`documentacion` AS `documentacion`,`cat008_areas`.`planta` AS `folio_planta`,`cat007_ubicaciones`.`nombre` AS `ubicacion` from (`cat008_areas` join `cat007_ubicaciones` on((`cat008_areas`.`planta` = `cat007_ubicaciones`.`folio`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `asignacion_usuario_view001`
--

/*!50001 DROP VIEW IF EXISTS `asignacion_usuario_view001`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `asignacion_usuario_view001` AS select `op014_tarea_usuario`.`folio` AS `folio_asignacion`,`op014_tarea_usuario`.`usuario` AS `folio_usuario`,`cat001_usuarios`.`nombres` AS `nombre_usuario`,`cat001_usuarios`.`apellidos` AS `apellido_usuario`,`op014_tarea_usuario`.`tarea` AS `folio_tarea`,`op003_tareas`.`descripcion` AS `descripcion`,`op003_tareas`.`etapa` AS `folio_etapa`,`op002_etapas`.`nombre` AS `etapa`,`op002_etapas`.`area` AS `folio_area_etapa`,`cat008_areas`.`nombre` AS `area`,`op002_etapas`.`proyecto` AS `folio_proyecto`,`cat009_proyectos`.`nombre` AS `proyecto`,`cat009_proyectos`.`ubicacion` AS `folio_ubicacion`,`cat007_ubicaciones`.`nombre` AS `ubicacion`,`cat007_ubicaciones`.`cliente` AS `folio_cliente`,`cat003_clientes`.`nombre` AS `cliente`,`op003_tareas`.`fecha_entrega` AS `fecha`,`op003_tareas`.`estatus` AS `folio_estatus`,`cat026_estatus_tarea`.`estatus` AS `estatus`,`op003_tareas`.`tipo` AS `folio_tipo`,`cat010_tipo_tareas`.`tipo` AS `tipo` from (((((((((`op014_tarea_usuario` join `cat001_usuarios` on((`op014_tarea_usuario`.`usuario` = `cat001_usuarios`.`folio`))) join `op003_tareas` on((`op014_tarea_usuario`.`tarea` = `op003_tareas`.`folio`))) join `op002_etapas` on((`op003_tareas`.`etapa` = `op002_etapas`.`folio`))) join `cat008_areas` on((`op002_etapas`.`area` = `cat008_areas`.`folio`))) join `cat009_proyectos` on((`op002_etapas`.`proyecto` = `cat009_proyectos`.`folio`))) join `cat007_ubicaciones` on((`cat008_areas`.`planta` = `cat007_ubicaciones`.`folio`))) join `cat003_clientes` on((`cat007_ubicaciones`.`cliente` = `cat003_clientes`.`folio`))) join `cat026_estatus_tarea` on((`op003_tareas`.`estatus` = `cat026_estatus_tarea`.`folio`))) join `cat010_tipo_tareas` on((`op003_tareas`.`tipo` = `cat010_tipo_tareas`.`folio`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `claves_view001`
--

/*!50001 DROP VIEW IF EXISTS `claves_view001`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `claves_view001` AS select `cat021_claves_seguimiento`.`folio` AS `folio`,`cat021_claves_seguimiento`.`proyecto` AS `folio_proyecto`,`cat009_proyectos`.`nombre` AS `proyecto`,`cat021_claves_seguimiento`.`clave` AS `clave`,`cat021_claves_seguimiento`.`monto` AS `monto`,`cat021_claves_seguimiento`.`fecha` AS `fecha`,`cat021_claves_seguimiento`.`usuario` AS `folio_usuario`,`cat001_usuarios`.`nombres` AS `nombre_usuario`,`cat001_usuarios`.`apellidos` AS `apellido_usuario`,`cat021_claves_seguimiento`.`uso` AS `uso` from ((`cat021_claves_seguimiento` join `cat009_proyectos` on((`cat021_claves_seguimiento`.`proyecto` = `cat009_proyectos`.`folio`))) join `cat001_usuarios` on((`cat021_claves_seguimiento`.`usuario` = `cat001_usuarios`.`folio`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `clientes_view001`
--

/*!50001 DROP VIEW IF EXISTS `clientes_view001`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `clientes_view001` AS select `cat003_clientes`.`folio` AS `folio`,`cat003_clientes`.`nombre` AS `nombre`,`cat003_clientes`.`tipo_cliente` AS `folio_tipo`,`cat012_tipo_cliente`.`tipo` AS `tipo`,`cat003_clientes`.`tipo_servicio` AS `folio_servicio`,`cat005_tipo_servicio`.`tipo` AS `servicio` from ((`cat003_clientes` join `cat005_tipo_servicio` on((`cat003_clientes`.`tipo_servicio` = `cat005_tipo_servicio`.`folio`))) join `cat012_tipo_cliente` on((`cat003_clientes`.`tipo_cliente` = `cat012_tipo_cliente`.`folio`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `contactos_ubicacion_view001`
--

/*!50001 DROP VIEW IF EXISTS `contactos_ubicacion_view001`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `contactos_ubicacion_view001` AS select `op015_contacto_ubicacion`.`folio` AS `folio`,`op015_contacto_ubicacion`.`ubicacion` AS `folio_ubicacion`,`cat007_ubicaciones`.`nombre` AS `ubicacion`,`op015_contacto_ubicacion`.`contacto` AS `folio_contacto`,`cat006_contactos`.`nombre` AS `contacto`,`cat006_contactos`.`email` AS `email`,`cat006_contactos`.`telefono` AS `telefono`,`cat006_contactos`.`descripcion` AS `descripcion` from ((`op015_contacto_ubicacion` join `cat007_ubicaciones` on((`op015_contacto_ubicacion`.`ubicacion` = `cat007_ubicaciones`.`folio`))) join `cat006_contactos` on((`op015_contacto_ubicacion`.`contacto` = `cat006_contactos`.`folio`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `contactos_view001`
--

/*!50001 DROP VIEW IF EXISTS `contactos_view001`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `contactos_view001` AS select `cat006_contactos`.`folio` AS `folio`,`cat006_contactos`.`nombre` AS `nombre`,`cat006_contactos`.`email` AS `email`,`cat006_contactos`.`telefono` AS `telefono`,`cat006_contactos`.`descripcion` AS `descripcion`,`cat006_contactos`.`cliente` AS `folio_cliente`,`cat003_clientes`.`nombre` AS `cliente` from (`cat006_contactos` join `cat003_clientes` on((`cat006_contactos`.`cliente` = `cat003_clientes`.`folio`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `cotizacion_pdf_view001`
--

/*!50001 DROP VIEW IF EXISTS `cotizacion_pdf_view001`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `cotizacion_pdf_view001` AS select `op017_cotizacion_pdf`.`folio` AS `folio`,`op017_cotizacion_pdf`.`emite` AS `emite`,`op017_cotizacion_pdf`.`cotizacion` AS `cotizacion`,`cat013_cotizaciones`.`rendimiento` AS `rendimiento`,`cat013_cotizaciones`.`intereses` AS `intereses`,`op017_cotizacion_pdf`.`numero` AS `numero`,`op017_cotizacion_pdf`.`fecha` AS `fecha`,`op017_cotizacion_pdf`.`destinatario` AS `destinatario`,`op017_cotizacion_pdf`.`total` AS `total`,`op017_cotizacion_pdf`.`solicita` AS `solicita`,`op017_cotizacion_pdf`.`notas` AS `notas`,`op017_cotizacion_pdf`.`puesto_destinatario` AS `puesto_destinatario`,`op017_cotizacion_pdf`.`cliente` AS `cliente`,`op017_cotizacion_pdf`.`moneda` AS `moneda`,`op017_cotizacion_pdf`.`ubicacion` AS `ubicacion` from (`op017_cotizacion_pdf` join `cat013_cotizaciones` on((`op017_cotizacion_pdf`.`cotizacion` = `cat013_cotizaciones`.`folio`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `cotizaciones_view001`
--

/*!50001 DROP VIEW IF EXISTS `cotizaciones_view001`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `cotizaciones_view001` AS select `cat013_cotizaciones`.`folio` AS `folio`,`cat013_cotizaciones`.`proyecto` AS `folio_proyecto`,`cat009_proyectos`.`nombre` AS `proyecto`,`cat003_clientes`.`folio` AS `folio_cliente`,`cat003_clientes`.`nombre` AS `cliente`,`cat007_ubicaciones`.`folio` AS `folio_ubicacion`,`cat007_ubicaciones`.`nombre` AS `ubicacion`,`cat013_cotizaciones`.`rendimiento` AS `rendimiento`,`cat013_cotizaciones`.`costo_tecnico` AS `costo_tecnico`,`cat013_cotizaciones`.`costo_supervisor` AS `costo_supervisor`,`cat013_cotizaciones`.`intereses` AS `intereses`,`cat013_cotizaciones`.`contacto` AS `folio_contacto`,`cat006_contactos`.`nombre` AS `contacto` from ((((`cat013_cotizaciones` join `cat009_proyectos` on((`cat013_cotizaciones`.`proyecto` = `cat009_proyectos`.`folio`))) join `cat006_contactos` on((`cat013_cotizaciones`.`contacto` = `cat006_contactos`.`folio`))) join `cat007_ubicaciones` on((`cat009_proyectos`.`ubicacion` = `cat007_ubicaciones`.`folio`))) join `cat003_clientes` on((`cat007_ubicaciones`.`cliente` = `cat003_clientes`.`folio`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `etapas_view001`
--

/*!50001 DROP VIEW IF EXISTS `etapas_view001`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `etapas_view001` AS select `op002_etapas`.`folio` AS `folio`,`op002_etapas`.`nombre` AS `nombre`,`op002_etapas`.`area` AS `folio_area`,`cat008_areas`.`nombre` AS `area`,`cat008_areas`.`documentacion` AS `documentacion_area`,`op002_etapas`.`proyecto` AS `folio_proyecto` from (`op002_etapas` join `cat008_areas` on((`op002_etapas`.`area` = `cat008_areas`.`folio`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `inventario_view001`
--

/*!50001 DROP VIEW IF EXISTS `inventario_view001`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `inventario_view001` AS select `cat020_inventario`.`folio` AS `folio`,`cat020_inventario`.`producto` AS `folio_producto`,`cat016_productos`.`descripcion` AS `producto`,`cat016_productos`.`sku` AS `sku`,`cat016_productos`.`categoria` AS `folio_categoria`,`cat017_categoria_producto`.`nombre` AS `categoria`,`cat016_productos`.`tipo` AS `folio_tipo`,`cat018_tipo_producto`.`nombre` AS `tipo`,`cat016_productos`.`marca` AS `folio_marca`,`cat015_marcas`.`nombre` AS `marca`,`cat020_inventario`.`cantidad` AS `cantidad`,`cat020_inventario`.`unidades` AS `folio_unidad`,`cat023_unidades`.`nombre` AS `unidad`,`cat023_unidades`.`abreviatura` AS `abreviatura`,`cat023_unidades`.`codigo_sat` AS `codigo_sat` from (((((`cat020_inventario` join `cat016_productos` on((`cat020_inventario`.`producto` = `cat016_productos`.`folio`))) join `cat017_categoria_producto` on((`cat016_productos`.`categoria` = `cat017_categoria_producto`.`folio`))) join `cat018_tipo_producto` on((`cat016_productos`.`tipo` = `cat018_tipo_producto`.`folio`))) join `cat015_marcas` on((`cat016_productos`.`marca` = `cat015_marcas`.`folio`))) join `cat023_unidades` on((`cat020_inventario`.`unidades` = `cat023_unidades`.`folio`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `marca_proveedor_view001`
--

/*!50001 DROP VIEW IF EXISTS `marca_proveedor_view001`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `marca_proveedor_view001` AS select `op007_marca_proveedor`.`folio` AS `folio`,`op007_marca_proveedor`.`proveedor` AS `folio_proveedor`,`cat014_proveedores`.`nombre` AS `proveedor`,`cat014_proveedores`.`web` AS `web_proveedor`,`op007_marca_proveedor`.`marca` AS `folio_marca`,`cat015_marcas`.`nombre` AS `marca` from ((`op007_marca_proveedor` join `cat014_proveedores` on((`op007_marca_proveedor`.`proveedor` = `cat014_proveedores`.`folio`))) join `cat015_marcas` on((`op007_marca_proveedor`.`marca` = `cat015_marcas`.`folio`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `material_proyecto_view001`
--

/*!50001 DROP VIEW IF EXISTS `material_proyecto_view001`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `material_proyecto_view001` AS select `op011_material_proyecto`.`folio` AS `folio`,`op011_material_proyecto`.`proyecto` AS `folio_proyecto`,`cat009_proyectos`.`nombre` AS `nombre_proyecto`,`cat009_proyectos`.`ubicacion` AS `folio_ubicacion`,`cat007_ubicaciones`.`direccion` AS `ubicacion`,`op011_material_proyecto`.`producto` AS `folio_producto`,`cat016_productos`.`sku` AS `sku`,`cat016_productos`.`descripcion` AS `descripcion`,`cat016_productos`.`categoria` AS `folio_categoria`,`cat017_categoria_producto`.`nombre` AS `categoria`,`cat016_productos`.`tipo` AS `folio_tipo`,`cat018_tipo_producto`.`nombre` AS `tipo`,`cat016_productos`.`marca` AS `folio_marca`,`cat015_marcas`.`nombre` AS `marca`,`op011_material_proyecto`.`cantidad` AS `cantidad`,`op011_material_proyecto`.`unidades` AS `folio_unidades`,`cat023_unidades`.`nombre` AS `unidades`,`cat023_unidades`.`abreviatura` AS `abreviatura`,`cat023_unidades`.`codigo_sat` AS `sat` from (((((((`op011_material_proyecto` join `cat009_proyectos` on((`op011_material_proyecto`.`proyecto` = `cat009_proyectos`.`folio`))) join `cat016_productos` on((`op011_material_proyecto`.`producto` = `cat016_productos`.`folio`))) join `cat007_ubicaciones` on((`cat009_proyectos`.`ubicacion` = `cat007_ubicaciones`.`folio`))) join `cat017_categoria_producto` on((`cat016_productos`.`categoria` = `cat017_categoria_producto`.`folio`))) join `cat018_tipo_producto` on((`cat016_productos`.`tipo` = `cat018_tipo_producto`.`folio`))) join `cat015_marcas` on((`cat016_productos`.`marca` = `cat015_marcas`.`folio`))) join `cat023_unidades` on((`op011_material_proyecto`.`unidades` = `cat023_unidades`.`folio`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `material_usuario_view001`
--

/*!50001 DROP VIEW IF EXISTS `material_usuario_view001`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `material_usuario_view001` AS select `op013_material_usuario`.`folio` AS `folio`,`op013_material_usuario`.`usuario` AS `folio_usuario`,`cat001_usuarios`.`nombres` AS `nombre_usuario`,`cat001_usuarios`.`apellidos` AS `apellido_usuario`,`op013_material_usuario`.`producto` AS `folio_producto`,`cat016_productos`.`sku` AS `sku`,`cat016_productos`.`descripcion` AS `descripcion`,`cat016_productos`.`categoria` AS `folio_categoria`,`cat017_categoria_producto`.`nombre` AS `categoria`,`cat016_productos`.`tipo` AS `folio_tipo`,`cat018_tipo_producto`.`nombre` AS `tipo`,`cat016_productos`.`marca` AS `folio_marca`,`cat015_marcas`.`nombre` AS `marca`,`op013_material_usuario`.`cantidad` AS `cantidad`,`op013_material_usuario`.`unidades` AS `folio_unidades`,`cat023_unidades`.`nombre` AS `unidades`,`cat023_unidades`.`abreviatura` AS `abreviatura`,`cat023_unidades`.`codigo_sat` AS `sat` from ((((((`op013_material_usuario` join `cat001_usuarios` on((`op013_material_usuario`.`usuario` = `cat001_usuarios`.`folio`))) join `cat016_productos` on((`op013_material_usuario`.`producto` = `cat016_productos`.`folio`))) join `cat017_categoria_producto` on((`cat016_productos`.`categoria` = `cat017_categoria_producto`.`folio`))) join `cat018_tipo_producto` on((`cat016_productos`.`tipo` = `cat018_tipo_producto`.`folio`))) join `cat015_marcas` on((`cat016_productos`.`marca` = `cat015_marcas`.`folio`))) join `cat023_unidades` on((`op013_material_usuario`.`unidades` = `cat023_unidades`.`folio`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `movimientos_invent_view001`
--

/*!50001 DROP VIEW IF EXISTS `movimientos_invent_view001`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `movimientos_invent_view001` AS select `op016_movimientos_inventario`.`folio` AS `folio`,`op016_movimientos_inventario`.`usuario` AS `folio_usuario`,`cat001_usuarios`.`nombres` AS `nombre_usuario`,`cat001_usuarios`.`apellidos` AS `apellido_usuario`,`op016_movimientos_inventario`.`producto` AS `folio_producto`,`cat016_productos`.`sku` AS `sku`,`cat016_productos`.`descripcion` AS `descripcion`,`op016_movimientos_inventario`.`cantidad` AS `cantidad`,`op016_movimientos_inventario`.`fecha` AS `fecha` from ((`op016_movimientos_inventario` join `cat001_usuarios` on((`op016_movimientos_inventario`.`usuario` = `cat001_usuarios`.`folio`))) join `cat016_productos` on((`op016_movimientos_inventario`.`producto` = `cat016_productos`.`folio`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `operaciones_viaticos001`
--

/*!50001 DROP VIEW IF EXISTS `operaciones_viaticos001`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `operaciones_viaticos001` AS select `cat022_operaciones`.`folio` AS `folio`,`cat022_operaciones`.`id_bene` AS `folio_beneficiario`,`cat022_operaciones`.`beneficiario` AS `beneficiario`,`cat022_operaciones`.`emisor` AS `folio_emisor`,`cat001_usuarios`.`nombres` AS `emisor`,`cat022_operaciones`.`enlace` AS `enlace`,`cat022_operaciones`.`concepto` AS `concepto`,`cat022_operaciones`.`clave` AS `folio_clave`,`cat021_claves_seguimiento`.`clave` AS `clave`,`cat022_operaciones`.`fecha` AS `fecha`,`cat022_operaciones`.`monto` AS `monto` from ((`cat022_operaciones` join `cat001_usuarios` on((`cat022_operaciones`.`emisor` = `cat001_usuarios`.`folio`))) join `cat021_claves_seguimiento` on((`cat022_operaciones`.`clave` = `cat021_claves_seguimiento`.`folio`))) where (`cat022_operaciones`.`tipo_operacion` = 11) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `productos_cotizacion_view001`
--

/*!50001 DROP VIEW IF EXISTS `productos_cotizacion_view001`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `productos_cotizacion_view001` AS select `op008_lista_productos`.`folio` AS `folio`,`op008_lista_productos`.`producto` AS `folio_producto`,`cat016_productos`.`descripcion` AS `producto`,`cat016_productos`.`sku` AS `sku`,`op008_lista_productos`.`cotizacion` AS `cotizacion`,`op008_lista_productos`.`costo` AS `costo_unitario`,`op008_lista_productos`.`cantidad` AS `cantidad`,(`op008_lista_productos`.`costo` * `op008_lista_productos`.`cantidad`) AS `costo_base`,`op008_lista_productos`.`tecnicos` AS `tecnicos`,`op008_lista_productos`.`supervisores` AS `supervisores`,`op008_lista_productos`.`dias` AS `dias`,((`cat013_cotizaciones`.`costo_tecnico` * `op008_lista_productos`.`tecnicos`) * `op008_lista_productos`.`dias`) AS `subtotal_tecnicos`,((`cat013_cotizaciones`.`costo_supervisor` * `op008_lista_productos`.`supervisores`) * `op008_lista_productos`.`dias`) AS `subtotal_supervisores` from ((`op008_lista_productos` join `cat016_productos` on((`op008_lista_productos`.`producto` = `cat016_productos`.`folio`))) join `cat013_cotizaciones` on((`op008_lista_productos`.`cotizacion` = `cat013_cotizaciones`.`folio`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `productos_proveedor_view001`
--

/*!50001 DROP VIEW IF EXISTS `productos_proveedor_view001`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `productos_proveedor_view001` AS select `cat016_productos`.`folio` AS `folio`,`cat016_productos`.`sku` AS `sku`,`cat016_productos`.`descripcion` AS `descripcion`,`cat016_productos`.`categoria` AS `folio_categoria`,`cat017_categoria_producto`.`nombre` AS `categoria`,`cat016_productos`.`tipo` AS `folio_tipo`,`cat018_tipo_producto`.`nombre` AS `tipo`,`cat016_productos`.`precio` AS `precio`,`cat016_productos`.`enlace` AS `enlace`,`cat016_productos`.`marca` AS `folio_marca`,`cat015_marcas`.`nombre` AS `marca`,`cat014_proveedores`.`folio` AS `folio_proveedor`,`cat014_proveedores`.`nombre` AS `proveedor`,`cat014_proveedores`.`web` AS `web_proveedor` from (((((`cat016_productos` join `cat017_categoria_producto` on((`cat016_productos`.`categoria` = `cat017_categoria_producto`.`folio`))) join `cat018_tipo_producto` on((`cat016_productos`.`tipo` = `cat018_tipo_producto`.`folio`))) join `cat015_marcas` on((`cat016_productos`.`marca` = `cat015_marcas`.`folio`))) join `op007_marca_proveedor` on((`cat015_marcas`.`folio` = `op007_marca_proveedor`.`marca`))) join `cat014_proveedores` on((`op007_marca_proveedor`.`proveedor` = `cat014_proveedores`.`folio`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `productos_view001`
--

/*!50001 DROP VIEW IF EXISTS `productos_view001`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `productos_view001` AS select `cat016_productos`.`folio` AS `folio`,`cat016_productos`.`sku` AS `sku`,`cat016_productos`.`descripcion` AS `descripcion`,`cat016_productos`.`categoria` AS `folio_categoria`,`cat016_productos`.`tipo` AS `folio_tipo`,`cat016_productos`.`marca` AS `folio_marca`,`cat016_productos`.`precio` AS `precio`,`cat016_productos`.`enlace` AS `enlace`,`cat015_marcas`.`nombre` AS `marca`,`cat018_tipo_producto`.`nombre` AS `tipo`,`cat017_categoria_producto`.`nombre` AS `categoria` from (((`cat016_productos` join `cat015_marcas` on((`cat016_productos`.`marca` = `cat015_marcas`.`folio`))) join `cat017_categoria_producto` on((`cat016_productos`.`categoria` = `cat017_categoria_producto`.`folio`))) join `cat018_tipo_producto` on((`cat016_productos`.`tipo` = `cat018_tipo_producto`.`folio`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `proyectos_asistencia_view001`
--

/*!50001 DROP VIEW IF EXISTS `proyectos_asistencia_view001`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `proyectos_asistencia_view001` AS select `op005_roles`.`folio` AS `folio`,`op005_roles`.`proyecto` AS `folio_proyecto`,`cat009_proyectos`.`nombre` AS `proyecto`,`cat009_proyectos`.`estatus` AS `folio_estatus`,`cat025_estatus_proyecto`.`estatus` AS `estatus`,`op005_roles`.`usuario` AS `folio_usuario`,`cat001_usuarios`.`nombres` AS `nombres`,`cat001_usuarios`.`apellidos` AS `apellidos`,`op005_roles`.`rol` AS `folio_rol` from (((`op005_roles` join `cat009_proyectos` on((`op005_roles`.`proyecto` = `cat009_proyectos`.`folio`))) join `cat025_estatus_proyecto` on((`cat009_proyectos`.`estatus` = `cat025_estatus_proyecto`.`folio`))) join `cat001_usuarios` on((`op005_roles`.`usuario` = `cat001_usuarios`.`folio`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `proyectos_view001`
--

/*!50001 DROP VIEW IF EXISTS `proyectos_view001`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `proyectos_view001` AS select `cat009_proyectos`.`folio` AS `folio`,`cat009_proyectos`.`nombre` AS `nombre`,`cat009_proyectos`.`ubicacion` AS `folio_ubicacion`,`cat007_ubicaciones`.`cliente` AS `folio_cliente`,`cat003_clientes`.`nombre` AS `cliente`,`cat007_ubicaciones`.`nombre` AS `ubicacion`,`cat009_proyectos`.`presupuesto` AS `presupuesto`,`cat009_proyectos`.`estatus` AS `folio_estatus`,`cat025_estatus_proyecto`.`estatus` AS `estatus`,`cat009_proyectos`.`galeria` AS `galeria`,`cat009_proyectos`.`documentacion` AS `documentacion` from (((`cat009_proyectos` join `cat007_ubicaciones` on((`cat009_proyectos`.`ubicacion` = `cat007_ubicaciones`.`folio`))) join `cat003_clientes` on((`cat007_ubicaciones`.`cliente` = `cat003_clientes`.`folio`))) join `cat025_estatus_proyecto` on((`cat009_proyectos`.`estatus` = `cat025_estatus_proyecto`.`folio`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `reporte_asistencia_view001`
--

/*!50001 DROP VIEW IF EXISTS `reporte_asistencia_view001`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `reporte_asistencia_view001` AS select `op006_asistencia`.`folio` AS `folio`,`op006_asistencia`.`usuario` AS `folio_usuario`,`cat001_usuarios`.`nombres` AS `nombre_usuario`,`cat001_usuarios`.`apellidos` AS `apellido_usuario`,`op006_asistencia`.`proyecto` AS `folio_proyecto`,`cat009_proyectos`.`nombre` AS `proyecto`,`cat009_proyectos`.`ubicacion` AS `folio_ubicacion`,`cat007_ubicaciones`.`nombre` AS `ubicacion`,`cat007_ubicaciones`.`cliente` AS `folio_cliente`,`cat003_clientes`.`nombre` AS `cliente`,`op006_asistencia`.`fecha` AS `fecha`,`op006_asistencia`.`hora` AS `hora` from ((((`op006_asistencia` join `cat001_usuarios` on((`op006_asistencia`.`usuario` = `cat001_usuarios`.`folio`))) join `cat009_proyectos` on((`op006_asistencia`.`proyecto` = `cat009_proyectos`.`folio`))) join `cat007_ubicaciones` on((`cat009_proyectos`.`ubicacion` = `cat007_ubicaciones`.`folio`))) join `cat003_clientes` on((`cat007_ubicaciones`.`cliente` = `cat003_clientes`.`folio`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `roles_proyecto_view001`
--

/*!50001 DROP VIEW IF EXISTS `roles_proyecto_view001`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `roles_proyecto_view001` AS select `op005_roles`.`folio` AS `folio`,`op005_roles`.`proyecto` AS `folio_proyecto`,`cat009_proyectos`.`nombre` AS `proyecto`,`cat009_proyectos`.`ubicacion` AS `folio_ubicacion`,`cat007_ubicaciones`.`nombre` AS `ubicacion`,`cat007_ubicaciones`.`cliente` AS `folio_cliente`,`cat003_clientes`.`nombre` AS `cliente`,`cat009_proyectos`.`galeria` AS `galeria`,`cat009_proyectos`.`documentacion` AS `documentacion`,`cat009_proyectos`.`estatus` AS `folio_estatus`,`cat025_estatus_proyecto`.`estatus` AS `estatus`,`op005_roles`.`usuario` AS `folio_usuario`,`cat001_usuarios`.`nombres` AS `usuario`,`op005_roles`.`rol` AS `folio_rol`,`cat011_roles_proyecto`.`rol` AS `rol`,`cat011_roles_proyecto`.`descripcion` AS `descripcion` from ((((((`op005_roles` join `cat009_proyectos` on((`op005_roles`.`proyecto` = `cat009_proyectos`.`folio`))) join `cat007_ubicaciones` on((`cat009_proyectos`.`ubicacion` = `cat007_ubicaciones`.`folio`))) join `cat003_clientes` on((`cat007_ubicaciones`.`cliente` = `cat003_clientes`.`folio`))) join `cat025_estatus_proyecto` on((`cat009_proyectos`.`estatus` = `cat025_estatus_proyecto`.`folio`))) join `cat001_usuarios` on((`op005_roles`.`usuario` = `cat001_usuarios`.`folio`))) join `cat011_roles_proyecto` on((`op005_roles`.`rol` = `cat011_roles_proyecto`.`folio`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `roles_view001`
--

/*!50001 DROP VIEW IF EXISTS `roles_view001`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `roles_view001` AS select `op005_roles`.`folio` AS `folio`,`op005_roles`.`proyecto` AS `proyecto`,`op005_roles`.`usuario` AS `folio_usuario`,`cat001_usuarios`.`nombres` AS `nombres`,`cat001_usuarios`.`apellidos` AS `apellidos`,`cat001_usuarios`.`telefono` AS `telefono`,`cat001_usuarios`.`email` AS `email`,`cat001_usuarios`.`documentacion` AS `documentacion`,`op005_roles`.`rol` AS `folio_rol`,`cat011_roles_proyecto`.`rol` AS `rol`,`cat011_roles_proyecto`.`descripcion` AS `descripcion` from ((`op005_roles` join `cat001_usuarios` on((`op005_roles`.`usuario` = `cat001_usuarios`.`folio`))) join `cat011_roles_proyecto` on((`op005_roles`.`rol` = `cat011_roles_proyecto`.`folio`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `servicios_cotizacion_view001`
--

/*!50001 DROP VIEW IF EXISTS `servicios_cotizacion_view001`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `servicios_cotizacion_view001` AS select `op009_lista_servicios`.`folio` AS `folio`,`op009_lista_servicios`.`servicio` AS `folio_servicio`,`cat019_servicios`.`descripcion` AS `servicio`,`op009_lista_servicios`.`cotizacion` AS `cotizacion`,`op009_lista_servicios`.`costo` AS `costo_servicio`,`op009_lista_servicios`.`tecnicos` AS `tecnicos`,`op009_lista_servicios`.`supervisores` AS `supervisores`,`op009_lista_servicios`.`dias` AS `dias`,((`cat013_cotizaciones`.`costo_tecnico` * `op009_lista_servicios`.`tecnicos`) * `op009_lista_servicios`.`dias`) AS `subtotal_tecnicos`,((`cat013_cotizaciones`.`costo_supervisor` * `op009_lista_servicios`.`supervisores`) * `op009_lista_servicios`.`dias`) AS `subtotal_supervisores` from ((`op009_lista_servicios` join `cat019_servicios` on((`op009_lista_servicios`.`servicio` = `cat019_servicios`.`folio`))) join `cat013_cotizaciones` on((`op009_lista_servicios`.`cotizacion` = `cat013_cotizaciones`.`folio`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `servicios_view001`
--

/*!50001 DROP VIEW IF EXISTS `servicios_view001`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `servicios_view001` AS select `cat019_servicios`.`folio` AS `folio`,`cat019_servicios`.`descripcion` AS `descripcion`,`cat019_servicios`.`categoria` AS `folio_categoria`,`cat019_servicios`.`precio` AS `precio`,`cat017_categoria_producto`.`nombre` AS `categoria` from (`cat019_servicios` join `cat017_categoria_producto` on((`cat019_servicios`.`categoria` = `cat017_categoria_producto`.`folio`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `tarea_asignada_view001`
--

/*!50001 DROP VIEW IF EXISTS `tarea_asignada_view001`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `tarea_asignada_view001` AS select `op014_tarea_usuario`.`folio` AS `folio`,`op014_tarea_usuario`.`usuario` AS `folio_usuario`,`cat001_usuarios`.`nombres` AS `nombres`,`cat001_usuarios`.`apellidos` AS `apellidos`,`op014_tarea_usuario`.`tarea` AS `folio_tarea`,`op003_tareas`.`descripcion` AS `descripcion`,`op003_tareas`.`etapa` AS `etapa`,`op005_roles`.`rol` AS `folio_rol_usuario`,`cat011_roles_proyecto`.`rol` AS `rol_usuario` from ((((`op014_tarea_usuario` join `cat001_usuarios` on((`op014_tarea_usuario`.`usuario` = `cat001_usuarios`.`folio`))) join `op003_tareas` on((`op014_tarea_usuario`.`tarea` = `op003_tareas`.`folio`))) join `op005_roles` on((`op014_tarea_usuario`.`usuario` = `op005_roles`.`usuario`))) join `cat011_roles_proyecto` on((`op005_roles`.`rol` = `cat011_roles_proyecto`.`folio`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `tareas_view001`
--

/*!50001 DROP VIEW IF EXISTS `tareas_view001`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `tareas_view001` AS select `op003_tareas`.`folio` AS `folio`,`op003_tareas`.`descripcion` AS `descripcion`,`op003_tareas`.`etapa` AS `folio_etapa`,`op002_etapas`.`nombre` AS `etapa`,`op003_tareas`.`fecha_entrega` AS `fecha`,`op003_tareas`.`estatus` AS `folio_estatus`,`cat026_estatus_tarea`.`estatus` AS `estatus`,`op003_tareas`.`tipo` AS `folio_tipo`,`cat010_tipo_tareas`.`tipo` AS `tipo` from (((`op003_tareas` join `op002_etapas` on((`op003_tareas`.`etapa` = `op002_etapas`.`folio`))) join `cat026_estatus_tarea` on((`op003_tareas`.`estatus` = `cat026_estatus_tarea`.`folio`))) join `cat010_tipo_tareas` on((`op003_tareas`.`tipo` = `cat010_tipo_tareas`.`folio`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `tareas_view002`
--

/*!50001 DROP VIEW IF EXISTS `tareas_view002`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `tareas_view002` AS select `op003_tareas`.`folio` AS `folio`,`op003_tareas`.`descripcion` AS `descripcion`,`op003_tareas`.`etapa` AS `folio_etapa`,`op002_etapas`.`nombre` AS `etapa`,`op002_etapas`.`area` AS `folio_area_etapa`,`cat008_areas`.`nombre` AS `area`,`op002_etapas`.`proyecto` AS `folio_proyecto`,`cat009_proyectos`.`nombre` AS `proyecto`,`cat009_proyectos`.`ubicacion` AS `folio_ubicacion`,`cat007_ubicaciones`.`nombre` AS `ubicacion`,`cat007_ubicaciones`.`cliente` AS `folio_cliente`,`cat003_clientes`.`nombre` AS `cliente`,`op003_tareas`.`fecha_entrega` AS `fecha`,`op003_tareas`.`estatus` AS `folio_estatus`,`cat026_estatus_tarea`.`estatus` AS `estatus`,`op003_tareas`.`tipo` AS `folio_tipo`,`cat010_tipo_tareas`.`tipo` AS `tipo` from (((((((`op003_tareas` join `op002_etapas` on((`op003_tareas`.`etapa` = `op002_etapas`.`folio`))) join `cat008_areas` on((`op002_etapas`.`area` = `cat008_areas`.`folio`))) join `cat009_proyectos` on((`op002_etapas`.`proyecto` = `cat009_proyectos`.`folio`))) join `cat007_ubicaciones` on((`cat008_areas`.`planta` = `cat007_ubicaciones`.`folio`))) join `cat003_clientes` on((`cat007_ubicaciones`.`cliente` = `cat003_clientes`.`folio`))) join `cat026_estatus_tarea` on((`op003_tareas`.`estatus` = `cat026_estatus_tarea`.`folio`))) join `cat010_tipo_tareas` on((`op003_tareas`.`tipo` = `cat010_tipo_tareas`.`folio`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `ubicaciones_view001`
--

/*!50001 DROP VIEW IF EXISTS `ubicaciones_view001`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `ubicaciones_view001` AS select `cat007_ubicaciones`.`folio` AS `folio`,`cat007_ubicaciones`.`cliente` AS `folio_cliente`,`cat007_ubicaciones`.`nombre` AS `nombre`,`cat007_ubicaciones`.`direccion` AS `direccion`,`cat003_clientes`.`nombre` AS `cliente` from (`cat007_ubicaciones` join `cat003_clientes` on((`cat007_ubicaciones`.`cliente` = `cat003_clientes`.`folio`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `validar_tarea_view001`
--

/*!50001 DROP VIEW IF EXISTS `validar_tarea_view001`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `validar_tarea_view001` AS select `op014_tarea_usuario`.`folio` AS `folio`,`op014_tarea_usuario`.`usuario` AS `usuario`,`op014_tarea_usuario`.`tarea` AS `tarea`,`op003_tareas`.`etapa` AS `etapa`,`cat009_proyectos`.`folio` AS `proyecto` from (((`op014_tarea_usuario` join `op003_tareas` on((`op014_tarea_usuario`.`tarea` = `op003_tareas`.`folio`))) join `op002_etapas` on((`op003_tareas`.`etapa` = `op002_etapas`.`folio`))) join `cat009_proyectos` on((`op002_etapas`.`proyecto` = `cat009_proyectos`.`folio`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `viaticos_comprobaciones_view001`
--

/*!50001 DROP VIEW IF EXISTS `viaticos_comprobaciones_view001`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `viaticos_comprobaciones_view001` AS select `cat022_operaciones`.`folio` AS `folio`,`cat022_operaciones`.`tipo_operacion` AS `tipo_operacion`,`cat024_tipo_operacion`.`tipo` AS `tipo`,`cat022_operaciones`.`id_bene` AS `id_bene`,`cat022_operaciones`.`beneficiario` AS `beneficiario`,`cat022_operaciones`.`emisor` AS `folio_emisor`,`cat001_usuarios`.`nombres` AS `nombre_emisor`,`cat001_usuarios`.`apellidos` AS `apellido_emisor`,`cat022_operaciones`.`enlace` AS `enlace`,`cat022_operaciones`.`concepto` AS `concepto`,`cat022_operaciones`.`clave` AS `folio_clave`,`cat021_claves_seguimiento`.`clave` AS `clave`,`cat021_claves_seguimiento`.`proyecto` AS `proyecto`,`cat009_proyectos`.`nombre` AS `nombre_proyecto`,`cat021_claves_seguimiento`.`uso` AS `uso`,`cat022_operaciones`.`fecha` AS `fecha`,`cat022_operaciones`.`monto` AS `monto` from ((((`cat022_operaciones` join `cat024_tipo_operacion` on((`cat022_operaciones`.`tipo_operacion` = `cat024_tipo_operacion`.`folio`))) join `cat001_usuarios` on((`cat022_operaciones`.`emisor` = `cat001_usuarios`.`folio`))) join `cat021_claves_seguimiento` on((`cat022_operaciones`.`clave` = `cat021_claves_seguimiento`.`folio`))) join `cat009_proyectos` on((`cat021_claves_seguimiento`.`proyecto` = `cat009_proyectos`.`folio`))) where (`cat022_operaciones`.`tipo_operacion` = 22) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `viaticos_depositos_view001`
--

/*!50001 DROP VIEW IF EXISTS `viaticos_depositos_view001`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `viaticos_depositos_view001` AS select `cat022_operaciones`.`folio` AS `folio`,`cat022_operaciones`.`tipo_operacion` AS `tipo_operacion`,`cat024_tipo_operacion`.`tipo` AS `tipo`,`cat022_operaciones`.`id_bene` AS `id_bene`,`cat022_operaciones`.`beneficiario` AS `beneficiario`,`cat022_operaciones`.`emisor` AS `folio_emisor`,`cat001_usuarios`.`nombres` AS `nombre_emisor`,`cat001_usuarios`.`apellidos` AS `apellido_emisor`,`cat022_operaciones`.`enlace` AS `enlace`,`cat022_operaciones`.`concepto` AS `concepto`,`cat022_operaciones`.`clave` AS `folio_clave`,`cat021_claves_seguimiento`.`clave` AS `clave`,`cat021_claves_seguimiento`.`proyecto` AS `proyecto`,`cat009_proyectos`.`nombre` AS `nombre_proyecto`,`cat021_claves_seguimiento`.`uso` AS `uso`,`cat022_operaciones`.`fecha` AS `fecha`,`cat022_operaciones`.`monto` AS `monto` from ((((`cat022_operaciones` join `cat024_tipo_operacion` on((`cat022_operaciones`.`tipo_operacion` = `cat024_tipo_operacion`.`folio`))) join `cat001_usuarios` on((`cat022_operaciones`.`emisor` = `cat001_usuarios`.`folio`))) join `cat021_claves_seguimiento` on((`cat022_operaciones`.`clave` = `cat021_claves_seguimiento`.`folio`))) join `cat009_proyectos` on((`cat021_claves_seguimiento`.`proyecto` = `cat009_proyectos`.`folio`))) where (`cat022_operaciones`.`tipo_operacion` = 11) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-03-27 11:18:17
